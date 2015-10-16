var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
//plugin
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginInlineUrls = require('less-plugin-inline-urls');
var autoprefix = new LessPluginAutoPrefix({
	browsers: ['last 2 versions', 'not ie < 8']
});

gulp.task('less', ['clean'], function(){
	return gulp.src(['./src/kuma.less', './src/kuma-compatible.less', './src/theme/*.less'])
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix, LessPluginInlineUrls]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('minify', ['less'], function(){
	return gulp.src('./dist/*.css')
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('clean', function(){
	return gulp.src('./dist/*')
		.pipe(clean({
			read: false
		}));
});

gulp.task('default', ['less', 'minify']);
