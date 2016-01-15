var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var resource = {
	'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
	'socket.io': 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js',
	'semantic.js': 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.2/semantic.min.js',
	'semantic.css': 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.2/semantic.min.css'
};

gulp.task('default', ['copy', 'build']);

gulp.task('copy', ['copy-html']);

gulp.task('copy-html', function () {
	return gulp.src('./web/source/index.html')
		.pipe(replace('»jquery«', resource.jquery))
		.pipe(replace('»socket.io«', resource['socket.io']))
		.pipe(replace('»semantic.js«', resource['semantic.js']))
		.pipe(replace('»semantic.css«', resource['semantic.css']))
		.pipe(gulp.dest('./web/build/'));
});

gulp.task('build', function () {
	return gulp.src('./web/source/main.jsx')
		.pipe(browserify({
			transform: [reactify]
		}))
		.pipe(rename(path => {
			path.basename = 'app';
			path.extname = '.js';
		}))
		.pipe(gulp.dest('./web/build/'));
});
