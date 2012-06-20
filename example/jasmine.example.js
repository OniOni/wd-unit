var launcher = require('../lib/main');

launcher.run({
    runner: 'jasmine',
    page: 'SpecRunner.html',
    root: process.argv[1].slice(0, process.argv[1].lastIndexOf('/')),
});