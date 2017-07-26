var gulp = require("gulp");
var gutil = require("gulp-util");
var gclean = require("gulp-clean");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");

var production = gutil.env.production;

var paths = {
    outputDir: "builds/" + (production ? "production" : "development"),
    typeScriptEntries: ["src/main/index.ts"],
    typeScriptDefinitions: ["src/definitions/**/*.d.ts"],
    javaScriptBundle: "index.js",
    cleanOutputDir: this.outputDir + "/*",
    moveResourceDir: "resources/**/*.*",
    resourceBaseDir: "./resources/"
};

var watchedBrowserify = watchify(browserify({
    basedir: ".",
    debug: !production,
    entries: paths.typeScriptEntries,
    cache: {},
    packageCache: {}
}).plugin(tsify));

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source(paths.javaScriptBundle))
        .pipe(gulp.dest(paths.outputDir));
}

gulp.task("clean", function() {
    return gulp.src(paths.cleanOutputDir, { read: false })
        .pipe(gclean());
});

gulp.task("move", function() {
    gulp.src(paths.moveResourceDir, { base: paths.resourceBaseDir })
        .pipe(gulp.dest(paths.outputDir));
});

gulp.task("compile", bundle);

gulp.task("default", ["clean", "move", "compile"]);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);