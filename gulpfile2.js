var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var pump = require('pump');

var cssSrc = 'css/*.css',
    jsSrcScript = 'script/*.js',
    jsSrcJS = 'js/*/*.js',
    htmlSrc = 'template/*.html';
 
// gulp.task('minify', function() {
//   return gulp.src(htmlSrc)
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('build'));
// });

gulp.task('minifyJs', function(){
    return gulp.src([jsSrcScript,jsSrcJS])
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});
// gulp.task('compress', function (cb) {
//   pump([
//         gulp.src('lib/*.js'),
//         uglify(),
//         gulp.dest('dist')
//     ],
//     cb
//   );
// });

gulp.task('default',['minifyJs']);
 