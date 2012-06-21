var htmlparser = require('htmlparser');

function pretty_print(text, color_code, offset) {
    var spaces = ''
    for (var i = 0; i < offset; i++)
	spaces += '  ';

    console.log(spaces+'\033['+color_code+'m'+text+'\033[0m');
}

exports.pp = function (html) {
    var handler = new htmlparser.DefaultHandler(function (err, res) {
	if (err) {
	    console.log('\033[31mCould not find file.\033[0m');
	}
    });
    
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(html);
    
    var results = handler.dom[0].children[0].data.match(/(.) failed, (.) passed, (.) pending, (.) /);

    pretty_print("Finished running tests. \nRan "+results[4]+" total", 33, 0);
    pretty_print(results[2]+' test ran successfully', 32, 2);
    pretty_print(results[1]+' test failed', 31, 2);
    pretty_print(results[3]+' test pending', 36, 2);
}

exports.element = {
    selector: 'class name',
    value: 'progress-bar-log'
};

exports.read = function () {
    return (document.getElementsByClassName('progress-bar')[0] != null);
}