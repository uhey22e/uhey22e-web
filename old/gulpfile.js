const { src, dest, watch, series, parallel } = require('gulp');
const rimraf = require('rimraf');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

const clean = (cb) => {
    rimraf('./dist/*', () => {
        cb();
    });
}

const buildSass = (cb) => {
    src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(dest('./dist/css'));
    cb();
};

const buildPug = (cb) => {
    src('./src/pug/*.pug')
        .pipe(pug())
        .pipe(dest('./dist'));
    cb();
};

const copyAssets = (cb) => {
    src('./src/img/*')
        .pipe(dest('./dist/img'))
    cb();
}

const watchAssets = (cb) => {
    watch('./src/img/*', copyAssets);
}

const watchSass = (cb) => {
    watch('./src/sass/**/*.scss', buildSass);
};

const watchPug = (cb) => {
    watch('./src/pug/**/*.pug', buildPug);
}

exports.build = series(
    clean,
    parallel(buildPug, buildSass, copyAssets),
);
exports.default = parallel(watchPug, watchSass, watchAssets);
