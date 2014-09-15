// Karma configuration
// Generated on Fri Aug 22 2014 17:26:05 GMT-0700 (MST)
    /* globals module */
module.exports = function(config) {
    'use strict';
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files:[
        {pattern: 'app/css/img/play_stop.png', served:true, included: false},
        'app/css/*.css',
        'app/js/resize.js',
        'app/js/promise.min.js',
        'app/js/game-of-life.js',
        'app/js/gameView.js',
        'test/testUtilities.js',
        'test/resize.test.js',
        'test/game-of-life.test.js',
        'test/gameView.test.js'
    ],


    // list of files to exclude
    exclude: [
        'karma.conf.js'
    ],
      client: {
          mocha: {
              ui: 'bdd',
              globals: ['resize'],
              timeout: 2000
          }
      },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
