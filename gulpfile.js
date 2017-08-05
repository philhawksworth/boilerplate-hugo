var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var hash = require("gulp-hash");
var del = require("del");
var exec = require("child_process").exec;

// Compile SCSS files to CSS
gulp.task("scss", function () {

  //Delete our old css files
  del(["themes/simple-starter/static/css/**/*"])

  //compile hashed css files
  gulp.src("src/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 10 versions"]
    }))
    .pipe(hash())
    .pipe(gulp.dest("themes/simple-starter/static/css"))
    .pipe(hash.manifest("hash.json"))
    .pipe(gulp.dest("data/css"))
});

// Watch asset folder for changes
gulp.task("watch", ["scss"], function () {
  gulp.watch("src/scss/**/*", ["scss"])
});

// Run a complete build
gulp.task("build", ["scss"], function () {
  del(["public"]);
  return exec('hugo -v', function (err, stdout, stderr) {
    console.log(stdout); // See Hugo output
  });
});

// Set watch as default task
gulp.task("default", ["watch"]);
