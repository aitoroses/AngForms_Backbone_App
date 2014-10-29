var gulp = require('gulp');
var ngmin = require('gulp-ngmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var wrapper = require('gulp-wrapper');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var preprocess = require('gulp-preprocess');
var minifyCSS = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var karma = require('karma').server;
var run = require('gulp-run');


var path = {
  src: 'app/modules/**/*.js',
  src_folder: 'app/',
  tmp: '.tmp/',
  out: 'dist/',
  index_build: 'app/index.build.html',
  bower_components: '../bower_components',
  app_views: 'app/views/',
  app_scripts: 'app/modules/',
  app_libraries: 'app/lib/',
  app_css: 'app/css/',
  app_images: 'app/images/'
};

var libraries = [
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
  './underscore.db/dist/underscore.db.min.js',
  './deb.js/build/deb.min.js',
  './velocity/velocity.min.js',
  './velocity/velocity.ui.min.js',
  './angular-velocity/angular-velocity.min.js',
  '../polyfills/polyfill.js',
  '../polyfills/typedarray.js',
  '../polyfills/es5.js',
  '../polyfills/json2.js'
];

var styles = [
  //'./bootstrap/dist/css/bootstrap.css',
  './angular-motion/dist/angular-motion.css',
  './ng-grid/ng-grid.css',
  './ngprogress/ngProgress.css',
];

var timestamp = (new Date()).getTime();

gulp.task('clean', function () {
  return gulp.src([path.out]).pipe(clean())
});

gulp.task('dev_modules', function () {
  return gulp.src(path.src)
    .pipe(wrapper({
      header: '(function() {\n',
      footer: '\n})();\n'
    }))
    .pipe(concat('modules.js'))
    .pipe(gulp.dest(path.tmp));
});

gulp.task('eslint', function () {
  return gulp.src(path.src)
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('prod_modules', ['eslint'], function () {
  return gulp.src(path.src)
    .pipe(ngmin()).on('error', console.log)
    .pipe(wrapper({
      header: '(function() {\n',
      footer: '\n})();\n'
    }))
    .pipe(concat('modules.' + timestamp + '.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(path.out));
});

gulp.task('dev_index', function () {
  return gulp.src(path.index_build)
    .pipe(preprocess({context: {NODE_ENV: 'development', timestamp: timestamp}}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(path.tmp))
});

gulp.task('prod_index', function () {
  return gulp.src(path.index_build)
    .pipe(preprocess({context: {NODE_ENV: 'production', timestamp: timestamp}}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(path.out))
});

gulp.task('dev_libraries', function () {
  return gulp.src(libraries, {cwd: './bower_components/'})
    .pipe(gulp.dest(path.tmp + 'lib'));
});

gulp.task('prod_libraries', function () {
  return gulp.src(libraries, {cwd: './bower_components/'})
    .pipe(concat("libraries." + timestamp + ".js"))
    //.pipe(uglify())
    .pipe(gulp.dest(path.out));
});

gulp.task('dev_styles_sass', function () {
  return gulp.src(path.app_css + 'sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.tmp + 'css'));
});

gulp.task('dev_style_bower_libraries', function () {
  return gulp.src(styles, {cwd: './bower_components/'})
    .pipe(gulp.dest(path.tmp + 'css/lib'));
});

gulp.task('dev_style_static_libraries', function () {
  return gulp.src([path.app_css + 'lib/**/*.css'])
    .pipe(gulp.dest(path.tmp + 'css/lib'));
});

gulp.task('dev_styles', ['dev_styles_sass', 'dev_style_bower_libraries', 'dev_style_static_libraries'], function () {
  return gulp.src([path.app_css + 'lib/**/*.css'])
    .pipe(gulp.dest(path.tmp + 'css/lib'));
});

gulp.task('prod_styles', ['dev_styles'], function () {
  return gulp.src([
    'bootstrap.css',
    'font-awesome.min.css',
    'angular-motion.css',
    'ng-grid.css',
    'ngProgress.css',
    '../app.css'
  ], {cwd: path.tmp + 'css/lib/'})
    .pipe(concat("styles." + timestamp + ".css"))
    .pipe(minifyCSS({
      keepSpecialComments: 0,
      noRebase: true
    }))
    .pipe(gulp.dest(path.out));
});

gulp.task('dev_fonts', function () {
  return gulp.src(path.app_css + 'fonts/**/*')
    .pipe(gulp.dest(path.tmp + 'css/lib/fonts'));
});

gulp.task('prod_fonts', function () {
  return gulp.src(path.app_css + 'fonts/**/*')
    .pipe(gulp.dest(path.out + '/fonts'));
});

gulp.task('dev_images', function () {
  return gulp.src(path.app_images + '**/*')
    .pipe(gulp.dest(path.tmp + 'images'));
});

gulp.task('prod_images', function () {
  return gulp.src(path.app_images + '**/*')
    .pipe(gulp.dest(path.out + 'images/'));
});

gulp.task('dev_templates', function () {
  return gulp.src(path.app_views + "/**/*.html")
    .pipe(gulp.dest(path.tmp + 'views'));
});

gulp.task('prod_templates', function () {
  return gulp.src(path.app_views + "/**/*.html")
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: "main",
      prefix: "views/"
    }))
    .pipe(concat("tmpl." + timestamp + ".js"))
    .pipe(uglify())
    .pipe(gulp.dest(path.out));
});

// GZIP Compressing tasks

/*gulp.task('compress_styles', function() {
 return gulp.src([
 'app/css/styles.min.css'
 ])
 .pipe(gzip())
 .pipe(gulp.dest('./app/css'))
 });

 gulp.task('compress_scripts', function() {
 return gulp.src([
 'app/dist/*.js'
 ])
 .pipe(gzip())
 .pipe(gulp.dest('./app/dist'))
 });*/

gulp.task('dev_build', ['dev_modules', 'dev_index', 'dev_styles', 'dev_fonts', 'dev_libraries', 'dev_templates', 'dev_images']);

gulp.task('prod_build_task', ['prod_modules', 'prod_index', 'prod_styles', 'prod_fonts', 'prod_libraries', 'prod_templates', 'prod_images']);

gulp.task('prod_build', function () {
  return runSequence('clean', 'prod_build_task');
});

gulp.task('build', ['prod_build']);

// -- Finished build tasks -- //


// -- Start development server tasks -- //

gulp.task('livereload', function () {
  return gulp.src([path.src_folder + '/modules/**/*.js', path.src_folder + '/views/**/*.html', 'index.build.html'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  return gulp.watch(path.src_folder + '**/*', ['dev_build'])
});

gulp.task('webserver', function () {
  return connect.server({
    livereload: true,
    root: ['./.tmp/']
  });
});

gulp.task('default', ['dev_build', 'webserver', 'livereload', 'watch']);

// -- finish development server tasks -- //


// -- Start deployment tasks -- //

gulp.task('clean_public_html', function () {
  return gulp.src('../public_html').pipe(clean({force: true}))
});

gulp.task('copy_to_public_html', function () {
  return gulp.src('dist/**/*').pipe(gulp.dest('../public_html/'))
});

gulp.task('copy_webinf', function () {
  return gulp.src('./WEB-INF/**/**').pipe(gulp.dest('../public_html/WEB-INF'))
});

gulp.task('deploy', function () {
  return runSequence('clean_public_html', 'copy_to_public_html', 'copy_webinf')
});

// -- Finish deployment tasks -- //


// -- Start testing tasks -- //

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

// -- Finish testing tasks -- //




