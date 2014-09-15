var path = require('path');

var phantomjsBinary = path.resolve(__dirname, '../node_modules/phantomjs/bin/phantomjs');
var chromeDriver = path.resolve(__dirname,'../node_modules/webdriver-manager/selenium/chromedriver');

var package = require('../package.json');

exports.description = package.description;
exports.version = package.version;

exports.paths = {
    protractorLauncher: require(path.resolve(__dirname, '../node_modules/protractor/lib/launcher')),
    selenium: path.resolve(__dirname,'../node_modules/webdriver-manager/selenium/selenium-server-standalone-2.42.2.jar')
};

exports.properties = {
    getStandalone: function (browserName) {
        return {
            capabilities: {
                browserName: browserName || 'phantomjs',
                'phantomjs.binary.path': phantomjsBinary
            },
            seleniumServerJar: exports.paths.selenium
        };
    },

    getProtractor: function() {
        return {
            suites: {},
            chromeOnly: false,
            chromeDriver: chromeDriver,
            jasmineNodeOpts: {
                isVerbose: true,
                showColors: true,
                includeStackTrace: true,
                defaultTimeoutInterval: 30000
            }
        }
    }
};

