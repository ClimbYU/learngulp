/**
 * Created by Administrator on 2017/5/11 0011.
 */
//����gulp��gulp���
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev');
var assetRev = require('gulp-asset-rev');
var revCollector = require('gulp-rev-collector');

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






//����css��jsԴ�ļ�·��
var cssSrc = 'css/*.css',
    jsSrcScript = 'script/*.js',
    jsSrcJS = 'js/*/*.js';

//Ϊcss�������ͼƬ/��������hash����
gulp.task('assetRev', function(){
    return gulp.src(cssSrc)  //��������Ե��ļ�
        .pipe(assetRev());//��������õ�ģ��
        //.pipe(gulp.dest('src/css')); //������·��
});

//CSS�����ļ�hash���벢���� rev-manifest.json�ļ�������ӳ��
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js�����ļ�hash���벢���� rev-manifest.json�ļ�������ӳ��
gulp.task('revJs', function(){
    return gulp.src([jsSrcJS,jsSrcScript])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});


//Html�滻css��js�ļ��汾
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'template/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('views'));
});

gulp.task('revCssJs', function () {
    // by default, gulp would pick `assets/css` as the base,
    // so we need to set it explicitly:
    return gulp.src(['css/*.css', 'js/*/*.js', 'script/*.js'], {base: 'assets'})
        //.pipe(gulp.dest('build/assets'))   //�ſ�ʱ������ԭʼ��js��css�ļ�
        .pipe(rev())
        .pipe(gulp.dest('build/assets'))
        .pipe(rev.manifest({
            base: 'build/assets',
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest('build/assets'));
});
//��������  �ſ�ʱ���Խ�html�ļ����ɴ��а汾�ŵ��ļ�
gulp.task('default', function (done) {
    condition = false;
    runSequence(    //��Ҫ˵�����ǣ���gulp.runҲ����ʵ���������������ִ�У�ֻ��gulp.run������޶ȵĲ���ִ����Щ���񣬶�����Ӱ汾��ʱ��Ҫ����ִ�У�˳��ִ�У���Щ���񣬹�ʹ����runSequence.
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