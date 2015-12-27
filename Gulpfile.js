var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var concat = require( 'gulp-concat' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var minifycss = require( 'gulp-minify-css' );

var paths = {
   js  : './src/js/**/*.js',
   css : './src/css/**/*.css'
};

var dist_folder = './dist/';

gulp.task( 'jshint', function () {
   return gulp.src([
            './Gulpfile.js',
            paths.js
         ])
         .pipe( jshint() )
         .pipe( jshint.reporter( stylish ) );
});

gulp.task( 'process-scripts', [ 'jshint' ], function () {
   return gulp.src( paths.js )
         .pipe( concat( 'main.js' ) )
         .pipe( gulp.dest( dist_folder ) )
         .pipe( rename( { suffix: '.min' } ) )
         .pipe( uglify() )
         .pipe( gulp.dest( dist_folder ) );
});

gulp.task( 'process-styles', function () {
   return gulp.src( paths.css )
         .pipe( concat( 'main.css' ) )
         .pipe( gulp.dest( dist_folder ) )
         .pipe( minifycss() )
         .pipe( rename( { suffix: '.min' } ) )
         .pipe( gulp.dest( dist_folder ) );
});

gulp.task( 'default', [ 'process-scripts', 'process-styles' ], function () {
      
});

gulp.watch( paths.js, [ 'process-scripts' ] );
gulp.watch( paths.css, [ 'process-styles' ] );