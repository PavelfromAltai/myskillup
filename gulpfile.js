var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    del = require('del');

gulp.task('less',function (done) {
    return gulp.src('dev/css/*.less',{base:'dev'})
         //   .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(less())
            //.pipe(concat('/styli/style.css'))
           // .pipe(sourcemaps.write())
            .pipe(gulp.dest('prod'));
    done();
});

gulp.task('pug',function (done) {
    return gulp.src('dev/*.pug',{base:'dev'})
    //   .pipe(sourcemaps.init())
       // .pipe(autoprefixer())
        .pipe(pug({
            pretty: true
        }))
        //.pipe(concat('/styli/style.css'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('prod'))
    done();
});

gulp.task('other',function(done){
  return gulp.src(['dev/img/*.*','dev/js/*.js'],{base:'dev'})
      .pipe(gulp.dest('prod'))
  done();
})
gulp.task('clean', function(done) {
     del.sync('prod');
     done();
});
//
//gulp.task('default', gulp.series('clean','less','pug'));


gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('less', 'pug','other'))
);


gulp.task('watch',function () {
    gulp.watch('dev/css/*.less',gulp.series('less'));
    gulp.watch('dev/*.pug',gulp.series('pug'));
    gulp.watch(['dev/img/*.*','dev/js/*.js'],gulp.series('other'));
});

gulp.task('dev',gulp.series('build','watch'));
//gulp.build = series(clean, less);
