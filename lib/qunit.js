var htmlparser = require('htmlparser');

function pretty_print(text, color_code, offset) {
    var spaces = ''
    for (var i = 0; i < offset; i++)
	spaces += '  ';

    console.log(spaces+'\033['+color_code+'m'+text+'\033[0m');
}

function pp_assertion(assert, offset) {
    pretty_print(
	assert.children[0].children[0].data, 
	assert.data.indexOf('pass') != -1 ? 32 : 31, 
	offset
    );
}

function pp_test(test, offset, in_module) {
    var index = in_module ? 2 : 0;
    pretty_print(test.children[0].children[index].children[0].data, 33, offset);
    
    var asserts = test.children[2].children;
    for (var i = 0; i < asserts.length; i++ ) {
	pp_assertion(asserts[i], offset+2);
    }
}

function pp_module(module, offset) {
    pretty_print(module.children[0].children[0].children[0].data, 33, offset);
    pp_test(module, offset+2, true);
}

exports.pp = function (html) {
    var handler = new htmlparser.DefaultHandler(function (err, res) {
	if (err) {
	    console.log('\033[31mCould not find file.\033[0m');
	}
    });
    
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(html);

    for (var i in handler.dom) {
	if (handler.dom[i].children[0].children[0].attribs.class == "module-name") {
	    pp_module(handler.dom[i], 0);
	} else if (handler.dom[i].children[0].children[0].attribs.class == "test-name") {
	    pp_test(handler.dom[i], 0);
	}
    }
}

exports.ready = function () {
    return (document.getElementById('#qunit-testresult') != null);
}

exports.elementId = 'qunit-tests';