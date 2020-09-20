// 1. 文件转存 : html , scss , js 
// html : 1. 转存  2. 压缩;
// scss : 1. 编译成 css  2. 压缩 3. 转存;
// js   : 1. (ES6) 编译成 ES5 : babel  2. 压缩  3. 转存;

// 2. 监听 : watch 让 gulp 监视文件是否改变，如果文件改变执行指令;

const gulp = require("gulp");
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
// gulp-sass 免翻墙版;
const sass = require('gulp-sass-china');
// sass解析工具 不使用 node-sass 使用 sass;
sass.compiler = require('sass');
// 服务器工具
const fileinclude = require('gulp-file-include');


// html 操作执行;
gulp.task("html", async() => {
    // 1. 找到html的源文件;
    // 2. 数据放到pipe() 之中;
    // 3. 转存到 dist 文件之中;
    gulp.src(["./src/html/**/*.html", "!./src/html/template/**/*.html"])
        // html 压缩; 使用的时候有可能传入配置参数;
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(htmlmin({ removeComments: true }))
        .pipe(gulp.dest("./dist/"))
        //  转存结束之后自动刷新浏览器;
})

gulp.task("js", async() => {
        gulp.src(["./src/js/**/*.js", "!./src/js/libs/**/*.js"])
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest("./dist/js"))
    })
    // 对大文件进行一次转存;
gulp.task("libs", async() => {
    gulp.src(["./src/js/libs/**/*.js"])
        .pipe(gulp.dest("./dist/js/libs"))
})

gulp.task("scss", async() => {
    gulp.src(["./src/scss/**/*.scss"])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("./dist/css"))
})


// 1. 测试服务器; => 主动刷新功能;  文件更改，浏览器自动刷新;
// 2. 代理功能; 代理可以不使用 nginx 使用nodejs 
gulp.task("build", gulp.series("libs", "html", "js", "scss"));

// 小任务 : css 压缩;