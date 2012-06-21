var 
wd = require('wd'),
http = require('http'),
fs = require('fs');

var folder = '/html';

exports.run = function(args) {    
    try{
	runner = require('./'+args.runner);
    } catch (e) {
	throw e;
    }

    args = {
	desired: args.desired || {browserName: 'firefox'},
	host: args.host || undefined,
	port: args.port || 8080,
	addr: 'localhost',
	page: args.page || '',
	root: args.root || '.',
	wd_args: args.wd_args || {}
    };

    var remote = wd.remote(args.wd_args);

    var server = http.createServer(function (req, res) {
	var f = args.root+req.url;
	var filetype = 'html';
	
	if (f.indexOf('css') != -1) {
	    filetype = 'css';
	} 
	
	try {
	    var body = fs.readFileSync(f);
	    res.writeHead(200, {'Content-Type': 'text/'+filetype});
	    res.end(body);
	} catch (e) {
	    if (e.code && e.code == 'ENOENT') {
		console.log('\033[31mCould not find '+e.path+'\033[0m');
	    }
	}
    }).listen(args.port, args.host);
    
    remote.init(args.desired, function (err, res) {
	remote.get('http://'+args.addr+':'+args.port+'/'+args.page, function (err, res) {
	    remote.waitForConditionInBrowser(runner.ready, function (err, bool) {
		remote.element(runner.element.selector, runner.element.value, function (err, el) {
		    el.getAttribute('innerHTML' ,function (err, html) {
			console.log('\033[32mTests finished :\033[0m')
						
			runner.pp(html)

			remote.quit();
			server.close();
		    });
		});
	    });
	});
    });
}

