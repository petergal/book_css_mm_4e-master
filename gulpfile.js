const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const browserSync = require('browser-sync').create();

/*
gulp.task("styles", function () {
  gulp.src("sass/!**!/!*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css/"));
});

//Watch task
gulp.task('default',function() {
  gulp.watch('sass/!**!/!*.scss',['styles']);
});*/

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("app/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
})

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function () {
  browserSync.init({
    server: "./app"
  })
  gulp.watch("app/scss/*.scss", gulp.series('sass'));
  gulp.watch("app/*.html").on('change', browserSync.reload);
}))

gulp.task('default', gulp.series('serve'));