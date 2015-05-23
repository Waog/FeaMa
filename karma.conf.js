// Karma configuration
// Generated on Sat May 23 2015 02:58:21 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function(config) {
	config.set({

	    // base path that will be used to resolve all patterns (eg. files,
	    // exclude)
	    basePath : '',

	    // frameworks to use
	    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	    frameworks : [
	        'mocha', 'chai'
	    ],

	    // list of files / patterns to load in the browser
	    files : [
		    // bower:js
		    'bower_components/jquery/dist/jquery.js',
		    'bower_components/jquery-ui/jquery-ui.js',
		    'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
		    'bower_components/underscore/underscore.js',
		    'bower_components/github-api/github.js',
		    'bower_components/hello/dist/hello.all.js',
		    'bower_components/hello/src/modules/github.js',
		    // endbower

		    'app/scripts/**/*.js',
		    'test/spec/**/*.js'
	    ],

	    // list of files to exclude
	    exclude : [
		    '**/Gruntfile.js'
	    ],

	    // preprocess matching files before serving them to the browser
	    // available preprocessors:
	    // https://npmjs.org/browse/keyword/karma-preprocessor
	    // preprocessors : {
	    // '**/*.ts' : [
	    // 'typescript'
	    // ]
	    // },

	    // typescriptPreprocessor: {
	    // // options passed to the typescript compiler
	    // options: {
	    // sourceMap: true, // (optional) Generates corresponding .map file.
	    // target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3'
	    // // (default), or 'ES5'
	    // // module: 'amd', // (optional) Specify module code generation:
	    // // 'commonjs' or 'amd'
	    // noImplicitAny: true, // (optional) Warn on expressions and
	    // // declarations with an implied 'any' type.
	    // // noResolve: true, // (optional) Skip resolution and preprocessing.
	    // // removeComments: true // (optional) Do not emit comments to output.
	    // },
	    // // extra typing definitions to pass to the compiler (globs allowed)
	    // typings: [
	    // 'app/ts/tsd.d.ts'
	    // ],
	    // // transforming the filenames
	    // transformPath: function(path) {
	    // return path.replace(/\.ts$/, '.js');
	    // }
	    // },

	    // test results reporter to use
	    // possible values: 'dots', 'progress'
	    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
	    reporters : [
		    'progress'
	    ],

	    // web server port
	    port : 9876,

	    // enable / disable colors in the output (reporters and logs)
	    colors : true,

	    // level of logging
	    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
	    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	    logLevel : config.LOG_INFO,

	    // enable / disable watching file and executing tests whenever any file
	    // changes
	    autoWatch : true,

	    // start these browsers
	    // available browser launchers:
	    // https://npmjs.org/browse/keyword/karma-launcher
	    browsers : [
		    'Chrome'
	    ],

	    // Continuous Integration mode
	    // if true, Karma captures browsers, runs the tests and exits
	    singleRun : false
	});
};
