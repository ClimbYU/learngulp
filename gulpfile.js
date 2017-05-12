/**
 * Created by Administrator on 2017/5/11 0011.
 */
//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev');
var assetRev = require('gulp-asset-rev');
var revCollector = require('gulp-rev-collector');

/* TODO 可以生成html，但未生成对应的js与css
 gulp.task('rev',['revCss'],function() {
    gulp.src("./template/index.html")
        .pipe(assetRev())
        .pipe(gulp.dest('./dist'));
});

gulp.task('revCss',function () {
    return gulp.src('./css/main.css')
        .pipe(assetRev())
        .pipe(gulp.dest('./dist/styles/'))
});
gulp.task('default',['rev']);

*/






//定义css、js源文件路径
var cssSrc = 'css/*.css',
    jsSrcScript = 'script/*.js',
    jsSrcJS = 'js/*/*.js';

//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function(){
    return gulp.src(cssSrc)  //该任务针对的文件
        .pipe(assetRev());//该任务调用的模块
        //.pipe(gulp.dest('src/css')); //编译后的路径
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src([jsSrcJS,jsSrcScript])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});


//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'template/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('views'));
});

gulp.task('revCssJs', function () {
    // by default, gulp would pick `assets/css` as the base,
    // so we need to set it explicitly:
    return gulp.src(['css/*.css', 'js/*/*.js', 'script/*.js'], {base: 'assets'})
        //.pipe(gulp.dest('build/assets'))   //放开时会生成原始的js与css文件
        .pipe(rev())
        .pipe(gulp.dest('build/assets'))
        .pipe(rev.manifest({
            base: 'build/assets',
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest('build/assets'));
});
//开发构建  放开时可以将html文件生成带有版本号的文件
gulp.task('default', function (done) {
    condition = false;
    runSequence(    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
        ['assetRev'],
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        ['revCssJs'],
        done);
});





//gulp.task('default', function () {
//    return gulp.src('css/*.css')
//        .pipe(rev())
//        .pipe(gulp.dest('dist'));
//});
//gulp.task('css', function () {
//    return gulp.src('css/*.css')
//        .pipe(rev())
//        .pipe(gulp.dest('dist/css'))
//        .pipe( rev.manifest() )
//        .pipe( gulp.dest( 'rev/css' ) );
//});
//
//gulp.task('scripts', function () {
//    return gulp.src('js/*.js')
//        .pipe(rev())
//        .pipe(gulp.dest('dist/js'))
//        .pipe( rev.manifest() )
//        .pipe( gulp.dest( 'rev/js' ) );
//});
//
//var revCollector = require('gulp-rev-collector');
//var minifyHTML   = require('gulp-minify-html');
//gulp.task('rev', function () {
//    return gulp.src(['rev/**/*.json', 'templates/**/*.html'])
//        .pipe( revCollector({
//            replaceReved: true,
//            dirReplacements: {
//                'css': '/dist/css',
//                '/js/': '/dist/js/',
//                'cdn/': function(manifest_value) {
//                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
//                }
//            }
//        }) )
//        .pipe( minifyHTML({
//            empty:true,
//            spare:true
//        }) )
//        .pipe( gulp.dest('dist') );
//});
//定义css、js文件路径，是本地css,js文件的路径，可自行配置
//var cssUrl = './css/*.css',
//    jsUrl = './js/*.js';
//
////CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
//gulp.task('revCss', function(){
//    return gulp.src(cssUrl)
//        .pipe(rev())
//        .pipe(rev.manifest())
//        .pipe(gulp.dest('rev/css'));
//});
//
////js生成文件hash编码并生成 rev-manifest.json文件名对照映射
//gulp.task('revJs', function(){
//    return gulp.src(jsUrl)
//        .pipe(rev())
//        .pipe(rev.manifest())
//        .pipe(gulp.dest('rev/js'));
//});
//
////Html更换css、js文件版本
//gulp.task('revHtml', function () {
//    return gulp.src(['rev/**/*.json', './views/*.html'])  /*WEB-INF/views是本地html文件的路径，可自行配置*/
//        .pipe(revCollector())
//        .pipe(gulp.dest('./views'));  /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
//});
//
////开发构建
//gulp.task('dev', function (done) {
//    condition = false;
//    runSequence(
//        ['revCss'],
//        ['revJs'],
//        ['revHtml'],
//        done);});
//gulp.task('default', ['dev']);