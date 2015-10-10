var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
//plugin
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({
	browsers: ['last 2 versions', 'not ie < 8']
});

gulp.task('less', function(){
	return gulp.src('./src/kuma.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('minify', ['less'], function(){
	return gulp.src('./dist/kuma.css')
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['less', 'minify']);
