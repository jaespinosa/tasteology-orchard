const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass-embedded')); // Use sass-embedded as the compiler
const minifyCss = require('gulp-clean-css');
const contcatCss = require('gulp-concat');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// Task to compile Sass files
function compileSass() {
    return gulp.src('./assets/scss/**/*.scss', { sourcemaps: true }) // Source Sass files
    .pipe(sass().on('error', sass.logError)) // Compile Sass and log errors
    .pipe(minifyCss()) 
    .pipe(contcatCss('bundle.css'))
    .pipe(gulp.dest('./dist/css', { sourcemaps: '.' })); // Destination for compiled and minified CSS
}

// Task to compile JS files
function compileJS() {
    return gulp.src('./assets/js/**/*.js', { sourcemaps: true }) // Source JS files
    .pipe(terser())
    .pipe(gulp.dest('./dist/js', { sourcemaps: '.' })); // Destination for compiled JS
}

// Task to sync changes in files
function browSerSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

//Task to watch changes in files
function watchTask() {
    gulp.watch('*.html', browserSyncReload);
    gulp.watch(['./assets/scss/**/*.scss', './assets/js/**/*.js'], gulp.series(compileSass, compileJS, browserSyncReload));
}

// Export tasks
exports.default = gulp.series(compileSass, compileJS, browSerSyncServe, watchTask); // Default task runs compile and then watches
exports.build = gulp.series(compileSass, compileJS); //Build task for when hosting the page in Cloudflare