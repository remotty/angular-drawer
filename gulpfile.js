/* jshint node:true */

var pkg = require('./package.json');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 3 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('csso', ['styles'], function() {
  return gulp.src('.tmp/**/*.css')
    .pipe($.csso())
    .pipe($.rename({ suffix:'.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('javascript', function() {
  gulp.src('src/*.js')
    .pipe($.uglify())
    .pipe($.header("/*! <%= name %> <%= version %> */\n", { name: pkg.name, version: pkg.version } ))
    .pipe($.rename({ suffix:'.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'test/app/**/*.html',
    '.tmp/styles/**/*.css',
    'src/**/*.js'
  ]).on('change', $.livereload.changed);

  gulp.watch('src/styles/**/*.scss', ['styles']);
});

gulp.task('serve', ['styles', 'watch'], function() {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('./test/app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use('/src', serveStatic('src'))
    .use('/src', serveStatic('.tmp'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('protractor', function() {
  var httpPort = 9001;
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(serveStatic('./test/e2e/app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use('/dist', serveStatic('dist'))
    .use(serveIndex('app'));

  var server = require('http').createServer(app)
    .listen(httpPort)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:' + httpPort);
    });

  gulp.src(['./test/e2e/*.js'])
      .pipe($.protractor.protractor({
          configFile: './protractor.conf.js',
          args: ['--baseUrl', 'http://127.0.0.1:' + httpPort]
      })) 
      .on('error', function(e) { throw e })
      .on('end', function() {
        server.close();
      });
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', ['javascript', 'csso'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('test', ['build'], function () {
  gulp.start('protractor');
});

gulp.task('copysrc', ['build'], function () {
  gulp.src('src/*.js')
    .pipe($.header("/*! <%= name %> <%= version %> */\n", { name: pkg.name, version: pkg.version } ))
    .pipe(gulp.dest('dist'));

  gulp.src('.tmp/**/*.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'jshint'], function () {
  gulp.start('copysrc');
});
