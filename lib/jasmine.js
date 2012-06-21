var htmlparser = require('htmlparser');

function pretty_print(text, color_code, offset) {
    var spaces = ''
    for (var i = 0; i < offset; i++)
	spaces += '  ';

    console.log(spaces+'\033['+color_code+'m'+text+'\033[0m');
}

function pp_suite(suite, offset) {
    pretty_print(suite.children[0].children[0].data, 33, offset);

    for (var i in suite.children) {
	if (suite.children[i].attribs.class.indexOf('suite') != -1) {
	    pp_suite(suite.children[i], offset+1);
	} else if (suite.children[i].attribs.class.indexOf('spec') != -1) {
	    pp_spec(suite.children[i], offset+1);
	}
    }
}

function pp_spec(spec, offset) {
    var text = spec.children[0].children[0].data;

    if (spec.attribs.class.indexOf('passed') != -1) {
	pretty_print(text, 32, offset);
    } else {
	pretty_print(text, 31, offset);
    }
}

function get_summary(dom) {
    for (var i in dom) {
	if (dom[i].attribs.class == 'results') {
	    for(var j in dom[i].children) {
		if (dom[i].children[j].attribs.class == 'summary')
		    return dom[i].children[j];
	    }
	}
    }
}


exports.pp = function (html) {
    var handler = new htmlparser.DefaultHandler(function (err, res) {
	if (err) {
	    console.log('\033[31mCould not find file.\033[0m');
	}
    });
    
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(html);

    var summary = get_summary(handler.dom);

    for (var i in summary.children) {
	pp_suite(summary.children[i], 0);
    }
}

exports.ready = function () {
    return (document.getElementById('#HTMLReporter') != null);
}

exports.element = {
    selector: 'id',
    value: 'HTMLReporter'
}