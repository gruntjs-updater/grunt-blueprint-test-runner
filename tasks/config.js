var path = require('path');

function stripJsExtension(pathToFile) {
    if (path.extname(pathToFile) === '.js') {
        pathToFile = pathToFile.slice(0, -3);
    }
    return pathToFile;
}

var webdriverPath = require.resolve('webdriver-manager').replace('/lib/index.js', '');
var phantomjsBinary = stripJsExtension(require.resolve('phantomjs'));
var chromeDriver = webdriverPath + '/selenium/chromedriver';
var seleniumJar = webdriverPath + '/selenium/selenium-server-standalone-2.44.0.jar';

var package = require('../package.json');

exports.description = package.description;
exports.version = package.version;

exports.paths = {
    protractorLauncher: require('protractor/lib/launcher'),
    selenium: seleniumJar
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
        };
    }
};
