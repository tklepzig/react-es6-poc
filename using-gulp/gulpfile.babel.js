import gulp from "gulp";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import babel from "gulp-babel";
import nodemon from "gulp-nodemon";
import del from "del";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import browserify from "browserify";
import babelify from "babelify";
import uglify from "gulp-uglify";
import gulpif from "gulp-if";
import plumber from "gulp-plumber";
import gutil from "gulp-util";
import yargs from "yargs";

const argv = yargs.argv;
const isProductiveBuild = argv.prod ? true : false;

if (isProductiveBuild) {
    gutil.log("Productive Build");
    process.env.NODE_ENV = "production";
}

//global error handling or gulp.src
const _gulpsrc = gulp.src;
gulp.src = (...args) => _gulpsrc(...args).pipe(plumber({
    errorHandler: function (error) {
        gutil.log(`Error: ${error.message}`);
        this.emit("end");
    }
}));

const clean = () => del(["dist"]);


function package_json() {
    return gulp.src(["package.json"])
        .pipe(gulp.dest("dist"));
}

function server_static() {
    return gulp.src(["src/server/**/*", "!src/server/**/*.js"].concat((isProductiveBuild ? ["!src/server/config.json"] : [])))
        .pipe(gulp.dest("dist/server"));
}

function server_transpile() {
    return gulp.src("src/server/*.js")
        .pipe(gulpif(!isProductiveBuild, sourcemaps.init()))
        .pipe(babel({ minified: isProductiveBuild }))
        .pipe(gulpif(!isProductiveBuild, sourcemaps.write()))
        .pipe(gulp.dest("dist/server"));
}

const server = gulp.parallel(server_static, server_transpile);


function scss() {
    return gulp.src("src/public/app.scss")
        .pipe(gulpif(!isProductiveBuild, sourcemaps.init()))
        .pipe(gulpif(isProductiveBuild, sass({ outputStyle: "compressed" }).on("error", sass.logError)))
        .pipe(gulpif(!isProductiveBuild, sass().on("error", sass.logError)))
        .pipe(gulpif(!isProductiveBuild, sourcemaps.write()))
        .pipe(rename("app.css"))
        .pipe(gulp.dest("dist/public"));
}

function client_static() {
    return gulp.src(["src/public/**/*", "!src/public/**/*.jsx", "!src/public/**/*.scss"])
        .pipe(gulp.dest("dist/public"));
}

function client_transpile() {
    return browserify({ entries: "src/public/app.jsx", extensions: [".jsx"], debug: !isProductiveBuild })
        .transform(babelify)
        .bundle()
        .on("error", function (error) {
            gutil.log(`Error: ${error.toString()}`);
            this.emit("end");
        })
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(gulpif(isProductiveBuild, uglify()))
        .pipe(rename("app.js"))
        .pipe(gulp.dest("dist/public"));
}

const client = gulp.parallel(client_static, client_transpile, scss);

function start_server() {
    return nodemon({
        script: "dist/server/index.js"
    });
}

function watch() {
    gulp.watch("src/public/**/*.scss", scss);
    gulp.watch(["src/server/**/*", "!src/server/**/*.js"], server_static);
    gulp.watch("src/server/**/*.js", server_transpile);
    gulp.watch(["src/public/**/*", "!src/public/**/*.jsx", "!src/public/**/*.scss"], client_static);
    gulp.watch("src/public/**/*.jsx", client_transpile);
}

export const build = gulp.series(clean, gulp.parallel(server, client, package_json));
export const start = gulp.series(build, start_server);
export const dev = gulp.parallel(start, watch);
