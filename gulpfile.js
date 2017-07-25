/**
 * Created by Administrator on 2017/5/11 0011.
 */
//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev');
var assetRev = require('gulp-asset-rev');
var revCollector = require('gulp-rev-collector');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
/* TODO ��������html����δ���ɶ�Ӧ��js��css
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
    jsSrcJS = ['js/main/*.js','js/test/*.js','js/script/*.js'];

//Ϊcss�������ͼƬ/��������hash����
// gulp.task('assetRev', function(){
//     return gulp.src(cssSrc)  //��������Ե��ļ�
//         .pipe(assetRev());//��������õ�ģ��
//         //.pipe(gulp.dest('src/css')); //������·��
// });

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(cssnano())
        .pipe(rev())
        .pipe(gulp.dest('build/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    // return gulp.src(['js/*/*.js', 'script/*.js'])
    //     .pipe(uglify())
    //     .pipe(rev())
    //     .pipe(gulp.dest('build/'))
    //     .pipe(rev.manifest())
    //     .pipe(gulp.dest('build/rev/js'));
    return gulp.src(jsSrcJS, {base: 'js'})
        //.pipe(gulp.dest('build/assets'))   //�ſ�ʱ������ԭʼ��js��css�ļ�
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/rev/js'));
});    

//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['build/rev/**/*.json', 'template/*.html'])
        
        .pipe(revCollector())
        .pipe(gulp.dest('build'));
}); 

// gulp.task('revSrcJs', function () {
//     // by default, gulp would pick `assets/css` as the base,
//     // so we need to set it explicitly:
//     return gulp.src([ 'js/*/*.js', 'script/*.js'], {base: 'assets'})
//         //.pipe(gulp.dest('build/assets'))   //�ſ�ʱ������ԭʼ��js��css�ļ�
//         .pipe(uglify())
//         .pipe(rev())
//         .pipe(gulp.dest('build/assets'))
//         .pipe(rev.manifest({
//             base: 'build/assets',
//             merge: true // merge with the existing manifest (if one exists)
//         }))
//         .pipe(gulp.dest('build/assets'));
// });
// gulp.task('revSrcCss', function () {
//     // by default, gulp would pick `assets/css` as the base,
//     // so we need to set it explicitly:
//     return gulp.src(['css/*.css'])
//         //.pipe(gulp.dest('build/assets'))   //�ſ�ʱ������ԭʼ��js��css�ļ�
//         .pipe(cssnano())
//         .pipe(rev())
//         .pipe(gulp.dest('build/css'))
//         .pipe(rev.manifest({
//             base: 'build/css',
//             merge: true // merge with the existing manifest (if one exists)
//         }))        
//         .pipe(gulp.dest('build/css'));
// });    
   
gulp.task('default', function (done) {
    condition = false;
    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
    runSequence(   
        ['revCss'],
        ['revJs'],
        ['revHtml'], 
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
//����css��js�ļ�·�����Ǳ���css,js�ļ���·��������������
//var cssUrl = './css/*.css',
//    jsUrl = './js/*.js';
//
////CSS�����ļ�hash���벢���� rev-manifest.json�ļ�������ӳ��
//gulp.task('revCss', function(){
//    return gulp.src(cssUrl)
//        .pipe(rev())
//        .pipe(rev.manifest())
//        .pipe(gulp.dest('rev/css'));
//});
//
////js�����ļ�hash���벢���� rev-manifest.json�ļ�������ӳ��
//gulp.task('revJs', function(){
//    return gulp.src(jsUrl)
//        .pipe(rev())
//        .pipe(rev.manifest())
//        .pipe(gulp.dest('rev/js'));
//});
//
////Html����css��js�ļ��汾
//gulp.task('revHtml', function () {
//    return gulp.src(['rev/**/*.json', './views/*.html'])  /*WEB-INF/views�Ǳ���html�ļ���·��������������*/
//        .pipe(revCollector())
//        .pipe(gulp.dest('./views'));  /*Html����css��js�ļ��汾,WEB-INF/viewsҲ�Ǻͱ���html�ļ���·��һ��*/
//});
//
////��������
//gulp.task('dev', function (done) {
//    condition = false;
//    runSequence(
//        ['revCss'],
//        ['revJs'],
//        ['revHtml'],
//        done);});
//gulp.task('default', ['dev']);