var launcher = require('../../lib/main');

launcher.run({
    runner: 'foounit',
    page: 'spec/runner.html',
    desired: [{browserName: 'firefox'}, {browserName: 'chrome'}],
    root: process.argv[1].slice(0, process.argv[1].lastIndexOf('/')),
});