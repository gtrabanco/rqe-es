"use strict";

var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var server = require('gulp-develop-server');
var mocha = require('gulp-mocha');
var fs = require('fs');

var serverTS = ["**/*.ts", "!node_modules/**", '!bin/**'];

var tsOptions = {
    module: "commonjs",
    "noImplicitAny": true
};

try {
    tsOptions = JSON.parse(fs.readFileSync('tsconfig.json').toString()).compilerOptions;
} catch (e) {
    console.log('loaded default ts options', e)
}

/*
 var serverTS = ["** /*.ts", "!node_modules/**", '!bin/**'];
 var tsProject = ts.createProject('tsconfig.json');

 gulp.task('ts', ['clean'], function() {
    var tsResult = tsProject.src(serverTS) // instead of gulp.src(...)
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('release'));
});
 */

gulp.task('ts', ['clean'], function() {
    return gulp
        .src(serverTS, {base: './'})
        .pipe(ts(tsOptions))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
    return gulp
        .src([
            'app.js',
            '**/*.js',
            '**/*.js.map',
            '!node_modules/**',
            '!gulpfile.js',
            '!bin/**'
        ], {read: false})
        .pipe(clean())
});

gulp.task('server:start', ['ts'], function() {
    server.listen({path: 'bin/www'}, function(error) {
        console.log(error);
    });
});

gulp.task('server:restart', ['ts'], function() {
    server.restart();
});

gulp.task('default', ['server:start'], function() {
    gulp.watch(serverTS, ['server:restart']);
});

gulp.task('test', ['ts'], function() {
    return gulp
        .src('test/*.js', {read: false})
        // wait for dev server to start properly
        .pipe(wait(600))
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
