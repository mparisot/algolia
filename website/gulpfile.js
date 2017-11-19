var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var devConfig = require("./webpack.config.js");
var webpackConfig = require("./webpack.config.prod.js");

// create a single instance of the compiler to allow caching
var devCompiler = webpack(devConfig);
var prodCompiler = webpack(webpackConfig);

gulp.task("default", ["webpack-dev-server"]);

gulp.task("build-dev-watch", ["webpack:build-dev"], function() {
    gulp.watch(["styles/**/*","*.js"], ["webpack:build-dev"]);
});

gulp.task("build-dev", ["webpack:build-dev"]);

gulp.task("build-prod", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {

    // run webpack
    prodCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-prod", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
                                                            colors: true
                                                        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    new WebpackDevServer(devCompiler, {
        publicPath: "/dist",
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});