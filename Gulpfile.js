var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var concat = require( 'gulp-concat' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );

gulp.task( 'jshint', function () {
   return gulp.src([
            './Gulpfile.js',
            './src/js/**/*.js'
         ])
         .pipe( jshint() )
         .pipe( jshint.reporter( stylish ) );
});

gulp.task( 'process-scripts', [ 'jshint' ], function () {
   return gulp.src( './src/js/**/*.js' )
         .pipe( concat( 'main.js' ) )
         .pipe( gulp.dest( './dist/' ) )
         .pipe( rename( { suffix: '.min' } ) )
         .pipe( uglify() )
         .pipe( gulp.dest( './dist/' ) );
});

gulp.task( 'default', [ 'process-scripts' ], function () {
      
});