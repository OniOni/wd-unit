var launcher = require('../../lib/main');

launcher.run({
    runner: 'qunit',
    page: 'testpage.html',
    root: process.argv[1].slice(0, process.argv[1].lastIndexOf('/')),
});


