/*
 * grunt-blueprint-test-runner
 * https://github.com/yakov/grunt-blueprint-test-runner
 *
 * Copyright (c) 2014 Yakov Khalinsky
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var webDriverManager = require('webdriver-manager');
var drakov = require('drakov');

var protractorLauncher = require(path.resolve(__dirname, '../node_modules/protractor/lib/launcher'));
var chromeDriver = path.resolve(__dirname,'../node_modules/webdriver-manager/selenium/chromedriver');
var selenium = path.resolve(__dirname,'../node_modules/webdriver-manager/selenium/selenium-server-standalone-2.42.2.jar');

var standaloneProperties = {
    capabilities: {
        browserName: 'phantomjs'
    },
    seleniumServerJar: selenium
};

var protractorConfig = {
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

module.exports = function(grunt) {

    var drakovArgs = {};
    var isChromeOnly = false;

    var runProtractor = function() {
        if (isChromeOnly) {
            protractorConfig.chromeOnly = true;
        } else {
            protractorConfig.seleniumServerJar = selenium;
            protractorConfig.capabilities = standaloneProperties.capabilities;
        }
        protractorLauncher.init(null, protractorConfig);
    };

    var runDrakov = function(cb) {
        return function(err) {
            if (err) {
                cb(err);
            }
            drakov.run(drakovArgs, runProtractor);
        }
    };

    var applyOptionsToProtractorConfig = function(options) {
        Object.keys(options).forEach(function(key) {
            protractorConfig[key] = options[key];
        });

    };

    grunt.registerMultiTask('blueprint-test-runner', 'API Blueprint Protractor Test Runner', function() {
        drakovArgs = this.data.drakov;
        isChromeOnly = this.data.chromeOnly;
        applyOptionsToProtractorConfig(this.data.protractor);

        var done = this.async();

        var wd = new webDriverManager();
        wd.install(['chrome', 'standalone'], runDrakov(done));

    });

};
