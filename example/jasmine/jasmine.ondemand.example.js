var launcher = require('../../lib/main');

var 
username = 'username',
accessKey = 'accessKey';

var wd_config = {
    host: "ondemand.saucelabs.com", 
    port: 80, 
    username: username, 
    accessKey: accessKey
}

launcher.run({
    runner: 'jasmine',
    addr: 'pivotal.github.com',
    port: 80,
    page: 'jasmine',
    wd_args: wd_config
});