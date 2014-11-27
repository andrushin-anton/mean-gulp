var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');

//server connect
gulp.task('connect', function() {
	connect.server({
		root: 'client',
		livereload: true
	});
});

//css
gulp.task('css', function () {
	//gulp.src('./client/css/*.css')
	gulp.src('./client/css/style.scss')
			.pipe(sass())
			//.pipe(concatCss("styles/bundle.css"))
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(minifyCSS({keepBreaks:true}))
			.pipe(rename("styles/bundle.min.css"))
			.pipe(gulp.dest('./static'))
			.pipe(notify('Done!'));
			//.pipe(connect.reload());
});

gulp.task('uncss', function() {
	return gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
			.pipe(uncss({
				html: ['./client/views/index.html']
			}))
			.pipe(gulp.dest('./static/styles/uncssbundle.min.css'));
});

//html
gulp.task('html', function(){
	gulp.src('./client/views/*.html')
			.pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
	gulp.watch('./client/css/*.css', ['css']);
	//gulp.watch('./client/views/*.html', ['html']);
});

//default
gulp.task('default', ['css', 'watch']);