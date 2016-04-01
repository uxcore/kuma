var gulp = require('gulp');
var rename = require('gulp-rename');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var cleancss = require('gulp-cleancss');
var concat = require('gulp-concat');
//plugin
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginInlineUrls = require('less-plugin-inline-urls');
var connect = require('gulp-connect');
var spawn = require('cross-spawn');
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

gulp.task('build', ['build-base', 'build-kuma', 'build-theme', 'build-kuma-new']);

function _lessBuildProcess(source) {
    return gulp.src(source)
        // .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix, LessPluginInlineUrls]
        }))
        .pipe(gulp.dest('./dist'));
// .pipe(sourcemaps.write('./'))
}

gulp.task('dev-less', function(cb) {
    gulp.src(['./demo/index.less'])
        .pipe(less({
            plugins: [autoprefix, LessPluginInlineUrls]
        }))
        .pipe(gulp.dest('./demo'))
        .pipe(connect.reload());
});

gulp.task('dev-html', function(cb) {
    gulp.src(['./demo/index.html'])
        .pipe(connect.reload());
})

gulp.task('server', ['watch'], function() {
    gulp.src(['./demo/index.less'])
        .pipe(less({
            plugins: [autoprefix, LessPluginInlineUrls]
        }))
        .pipe(gulp.dest('./demo'));

    connect.server({
        root: './',
        https: true,
        port: 8001,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(['./src/**/*.less', './demo/**/*.less'], ['dev-less'])
})

gulp.task('build-source', ['clean'], function() {
    return _lessBuildProcess(
        ['./src/theme/**/*.less']
    );
});

gulp.task('build-transport', ['build-source'], function() {
    var themes = ['blue', 'orange'];
    themes.forEach(function(theme) {
        gulp.src(['./dist/' + theme + '/kuma.css'])
            .pipe(concat(theme + '.css'))
            .pipe(gulp.dest('./dist'))
            .pipe(cleancss(cleancssOption))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./dist'));
    });
    themes.forEach(function(theme) {
        gulp.src(['./dist/' + theme + '/compatible.css'])
            .pipe(rename({
                prefix: theme + '-'
            }))
            .pipe(gulp.dest('./dist'))
            .pipe(cleancss(cleancssOption))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./dist'));
    });
    themes.forEach(function(theme) {
        gulp.src(['./dist/' + theme + '/'])
            .pipe(clean({
                read: false
            }));
    });
});

gulp.task('clean', function() {
    return gulp.src('./dist/*')
        .pipe(clean({
            read: false
        }));
});

gulp.task('supdate', function() {
    spawn.sync('git', ['submodule', 'foreach', '-q', 'branch="$(git config -f $toplevel/.gitmodules submodule.$name.branch)"; git pull origin $branch'], {
        stdio: 'inherit'
    });
})

gulp.task('scheckout', function() {
    spawn.sync('git', ['submodule', 'foreach', '-q', 'branch="$(git config -f $toplevel/.gitmodules submodule.$name.branch)"; git checkout $branch'], {
        stdio: 'inherit'
    });
})


gulp.task('default', ['build-transport']);
