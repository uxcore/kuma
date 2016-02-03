var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
// var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var cleancss = require('gulp-cleancss');
// var inject = require('gulp-inject-string');
//plugin
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginInlineUrls = require('less-plugin-inline-urls');
var autoprefix = new LessPluginAutoPrefix({
	browsers: ['last 2 versions', 'not ie < 8']
});
var cleancssOption = {
    advanced: false,
    aggressiveMerging: false,
    sourceMap: true,
    compatibility: 'ie8',
    debug: true
};

gulp.task('build', ['build-base', 'build-kuma', 'build-theme']);

function _lessBuildProcess(source){
    return gulp.src(source)
		// .pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix, LessPluginInlineUrls]
		}))
        .pipe(gulp.dest('./dist'))
        .pipe(cleancss(cleancssOption))
        .pipe(rename({
			suffix: '.min'
		}))
		// .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
}

gulp.task('build-kuma', ['clean'], function(){
	return _lessBuildProcess(['./src/kuma.less', './src/kuma-compatible.less']);
});
gulp.task('build-theme', ['clean'], function(){
	return _lessBuildProcess(['./src/theme/*.less']);
});

gulp.task('build-base', ['clean'], function(){
	return _lessBuildProcess(['./src/kuma-base.less']);
});

gulp.task('clean', function(){
	return gulp.src('./dist/*')
		.pipe(clean({
			read: false
		}));
});

gulp.task('default', ['build']);
