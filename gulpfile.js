var syntax        = 'scss', // Syntax: sass or scss;
		gulpversion   = '4'; // Gulp version: 3 or 4
		statLog       = {
			colors: true,
			reasons: true
		}


var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		webpack       = require('webpack');
		webpackStream = require('webpack-stream');
		webpackConfig = require('./webpack.config');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function () {
	return gulp.src(webpackConfig.entry)
	.pipe(webpackStream(webpackConfig))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
})

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

if (gulpversion == 3) {
	gulp.task('watch', ['styles', 'scripts', 'browser-sync'], function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch('app/js/src/**/*.js', ['scripts']);
		gulp.watch('app/*.html', ['code'])
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch('app/js/src/**/*.js', gulp.parallel('scripts'));
		gulp.watch('app/*.html', gulp.parallel('code'))
	});
	gulp.task('default', gulp.parallel('watch', 'styles', 'scripts', 'browser-sync'));
}
