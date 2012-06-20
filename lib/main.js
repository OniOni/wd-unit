var 
wd = require('wd'),
htmlparser = require('htmlparser'),
http = require('http'),
fs = require('fs');

var folder = '/html';

exports.run = function(args) {    
    try{
	pp = require('./'+args.runner).pp;
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
    
    function timeout_callback (remote) {
	remote.elementById('HTMLReporter', function (err, el){
	    if (el != null) {
		el.getAttribute('innerHTML' ,function (err, text) {
		    console.log('\033[32mTests finished :\033[0m')

		    var handler = new htmlparser.DefaultHandler(function (err, res) {
			if (err) {
			    console.log('\033[31mCould not find '+e.path+'\033[0m');
			}
		    });

		    var parser = new htmlparser.Parser(handler);
		    parser.parseComplete(text);

		    pp(handler.dom)
		    remote.quit();
		    server.close();
		});
	    } else {
		setTimeout(timeout_callback, 1500, remote);
	    }
	});
    }


    remote.init(args.desired, function (err, res) {
	remote.get('http://'+args.addr+':'+args.port+'/'+args.page, function (err, res) {
	    var timeout = setTimeout(timeout_callback, 1500, remote);
	});
    });
}

