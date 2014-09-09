/*
 * grunt-blueprint-test-runner
 * https://github.com/Aconex/grunt-blueprint-test-runner
 *
 * Copyright (c) 2014 Yakov Khalinsky
 * Licensed under the MIT license.
 */

'use strict';

var webDriverManager = require('webdriver-manager');
var drakov = require('drakov');

var config = require('./config');


module.exports = function(grunt) {

    var drakovArgs = {};
    var isChromeOnly = false;

    var standaloneProperties = config.properties.getStandalone();
    var protractorProperties = config.properties.getProtractor();

    var runProtractor = function() {
        if (isChromeOnly) {
            protractorProperties.chromeOnly = true;
        } else {
            protractorProperties.seleniumServerJar = config.paths.selenium;
            protractorProperties.capabilities = standaloneProperties.capabilities;
        }
        config.paths.protractorLauncher.init(null, protractorProperties);
    };

    var runDrakov = function(cb) {
        return function(err) {
            if (err) {
                cb(err);
            }
            drakov.run(drakovArgs, runProtractor);
        }
    };

    var updateAndRunWebdriver = function(cb) {
        var wd = new webDriverManager();
        var drivers = isChromeOnly ? ['chrome'] : ['standalone'];
        wd.install(drivers, runDrakov(cb));
    };

    var applyOptionsToProtractorConfig = function(options) {
        Object.keys(options).forEach(function(key) {
            protractorProperties[key] = options[key];
        });
    };

    grunt.registerMultiTask('blueprint-test-runner', 'API Blueprint Protractor Test Runner', function() {
        drakovArgs = this.data.drakov;
        isChromeOnly = this.data.chromeOnly;
        applyOptionsToProtractorConfig(this.data.protractor);
        updateAndRunWebdriver(this.async())
    });

};
