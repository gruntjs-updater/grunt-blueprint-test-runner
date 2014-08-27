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

var protractorConfig = {
    suites: {},
    chromeOnly: true,
    chromeDriver: path.resolve(__dirname,'../node_modules/webdriver-manager/selenium/chromedriver'),
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
};

module.exports = function(grunt) {

    var options = {};
    var drakovArgs = {};

    var runProtractor = function() {
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

    grunt.registerMultiTask('blueprint-test-runner', 'API Blueprint Protractor Test Runner', function() {
        options = this.options();
        drakovArgs = this.data.drakov;
        protractorConfig.suites = this.data.protractor.suites;

        var done = this.async();

        var wd = new webDriverManager();
        wd.install(['chrome'], runDrakov(done));

    });

};
