wd-unit
==============

Drive in-browser tests with [WD.js](https://github.com/admc/wd).

## Make sure you are running the latest node version

http://nodejs.org/#download

## Install

```shell
npm install wd-unit
```

## Authors

  - Mathieu Sabourin ([OniOni](http://github.com/OniOni))
  
## License

  * License - Apache 2: http://www.apache.org/licenses/LICENSE-2.0

## Running a test!

Start by importing the required library.

```javascript
var launcher = require('wd-unit');
```

Then you can go ahead and launch your test by running the launcher
```javascript
launcher.run({
    runner: 'qunit',
    page: 'testpage.html',
    root: process.argv[1].slice(0, process.argv[1].lastIndexOf('/')),
});
```

Possible options are :
- __runner__: Unit testing framework. You can currently use [Jasmine](http://pivotal.github.com/jasmine/) and [Qunit](http://docs.jquery.com/QUnit).
- __desired__: Desired capabilities for the browser running the test. 
  - _Default_: {browserName: 'firefox'}
- __addr__: Base url with wich WD.js will work.
  - _Default_: 'localhost'
- __page__: Test are run from this page.
  - _Default_: Document root.
- __root__: Document root for the webserver.
  - _Default_: '.'
- __wd_args__: Arguments to be passes to WD.js. Check out [WD.js](https://github.com/admc/wd) docs for more info.
  - _Default_: {}

## Take a look at our example code

- [Saucelabs OnDemand](https://github.com/OniOni/wd-unit/wiki/Sauce-Ondemand)

## Want more frameworks ?

Check out the [wiki](https://github.com/OniOni/wd-unit/wiki/Writting-pugins-for-testing-frameworks) about writting plugins.