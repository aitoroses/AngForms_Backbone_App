// Karma configuration
module.exports = function(config) {

    // Bower libraries
    var bower_libraries = [
      './jquery/dist/jquery.min.js',
      './angular/angular.js',
      './angular-route/angular-route.min.js',
      './angular-animate/angular-animate.min.js',
      './angular-motion/dist/angular-motion.min.js',
      './angular-strap/dist/angular-strap.js',
      './angular-strap/dist/angular-strap.tpl.min.js',
      './ngprogress/build/ngProgress.min.js',
      './moment/min/moment.min.js',
      './moment-timezone/builds/moment-timezone-with-data.min.js',
      './pako/dist/pako.min.js',
      './lodash/dist/lodash.min.js',
      './ng-grid/build/ng-grid.min.js',
      './ngstorage/ngStorage.min.js',
      './tv4/tv4.js',
      './underscore.db/dist/underscore.db.min.js',
      './deb.js/build/deb.min.js',
      './velocity/velocity.min.js',
      './velocity/velocity.ui.min.js',
      './angular-velocity/angular-velocity.min.js',
      './angular-gantt/assets/angular-gantt.js',
      '../polyfills/polyfill.js',
      '../polyfills/typedarray.js',
      '../polyfills/es5.js',
      '../polyfills/json2.js'
    ].map(function(lib) {
       return "bower_components/" + lib;
    });

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: bower_libraries.concat([
            'bower_components/angular-mocks/angular-mocks.js',
            'app/modules/**/*.js',
            'views/**/*.html',
            'app/**/*.html',
            'test/spec/**/*.js',
            'test/spec/**/*.coffee',
            'test/mock/**/*.js',
            'test/mock/**/*.coffee',
            'test/fixtures/**/*.js',
            'test/fixtures/**/*.coffee'
        ]),

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8081,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // Plugins
        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-coffee-preprocessor',
            'karma-ng-html2js-preprocessor',
            'karma-mocha-reporter'
        ],

        // Preprocessor
        preprocessors: {
            'app/modules/**/*.js': 'coverage',
            '**/*.html': ['ng-html2js'],
            'test/**/*.coffee': ['coffee']
        },

        // Reporters setup
        reporters: ['coverage', 'mocha'], // progress it's default
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        // Template preprocesor config
        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'app/',
            // prepend this to the
            prependPrefix: '',

            // or define a custom transform function
            /*cacheIdFromPath: function(cacheId) {
                return cacheId;
            },*/

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'main'
        },


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};