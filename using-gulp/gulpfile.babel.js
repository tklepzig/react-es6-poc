import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import babel from "gulp-babel";
import browserify from "gulp-browserify";
import nodemon from "gulp-nodemon";
import runSequence from "gulp-run-sequence";
import minify from "gulp-minify";
import del from "del";

gulp.task("clean", () => {
    return del.sync("dist", { force: true });
});


gulp.task("static:server", () => {
    return gulp.src(["server/**/*", "!server/**/*.js"])
        .pipe(gulp.dest("dist/server"));
});
gulp.task("watch:static:server", () => {
    return gulp.watch(["server/**/*", "!server/**/*.js"], ["static:server"]);
});

gulp.task("babel:server", () => {
    return gulp.src("server/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/server"));
});
gulp.task("watch:babel:server", () => {
    return gulp.watch("server/*.js", ["babel:server"]);
});

gulp.task("server", ["babel:server", "static:server"]);
gulp.task("watch:server", ["watch:static:server", "watch:babel:server"]);



gulp.task("scss", () => {
    return gulp.src("public/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("dist/public"));
});
gulp.task("watch:scss", () => {
    gulp.watch("public/main.scss", ["scss"]);
});

gulp.task("static:client", () => {
    return gulp.src(["public/**/*", "!public/**/*.jsx", "!public/**/*.scss"])
        .pipe(gulp.dest("dist/public"));
});
gulp.task("watch:static:client", () => {
    return gulp.watch(["public/**/*", "!public/**/*.jsx", "!public/**/*.scss"], ["static:client"]);
});

gulp.task("babel:client", () => {
    return gulp.src("public/*.jsx")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/public/tmp"));
});
gulp.task("browserify", ["babel:client"], () => {
    return gulp.src("dist/public/tmp/app.js")
        .pipe(browserify())
        .pipe(minify())
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest("dist/public"));
});
gulp.task("watch:browserify", () => {
    return gulp.watch("public/*.jsx", ["browserify"]);
});

gulp.task("client", ["browserify", "static:client", "scss"], () => {
    return del.sync("dist/public/tmp", { force: true });
});
gulp.task("watch:client", ["watch:static:client", "watch:browserify", "watch:scss"]);



gulp.task("build", (done) => {
    return runSequence("clean", "client", "server", done);
});

gulp.task("start", ["build"], () => {
    return nodemon({
        script: "dist/server/index.js"
    });
});

gulp.task("watch", ["watch:client", "watch:server"]);

gulp.task("dev", (done) => {
    return runSequence("start", "watch", done);
});