//引入开发工具
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	ngHtml2js = require('gulp-ng-html2js'),
	htmlhint = require('gulp-htmlhint'),
	browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');
    browserSync = require('browser-sync').create();


//编译CSS
gulp.task('sass',function(){
	gulp.src(['app/css/*.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/css'));
	browserSync.reload();
});



//检测JS语法
gulp.task('jshint',function(){
	gulp.src('app/js/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});


//合并模块
gulp.task('build-html', function () {
    gulp.src(['app/js/**/*.html', 'app/js/com/**/*.html'])
        .pipe(htmlmin())
        .pipe(ngHtml2js({
            moduleName: 'template'
        }))
        .pipe(concat('template.js'))
        .pipe(gulp.dest('app/js'));
        browserSync.reload();
});



//检测HTML语法
gulp.task('htmlhint',function(){
	gulp.src('app/*.html')
	.pipe(htmlhint())
	.pipe(gulp.dest('dist/'));
	browserSync.reload();
});

//编译js
gulp.task('javascript',function(){
	// gulp.src('app/js/**/*.js')
	// .pipe(concat('all.js'))
	// .pipe(gulp.dest('dist/js'))
	// .pipe(rename({suffix : '.min'}))
	// .pipe(uglify())
	// .pipe(gulp.dest('dist/js'))
	browserify({
        entries:['app/js/lib.js','app/js/index/index.js']
    })
    .bundle()
    .pipe(source('min.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/js'));
    browserSync.reload();
})



//编译插件JS
gulp.task('calendar-js',function(){
	gulp.src('app/js/lib/**/*.js')
	.pipe(concat('calendar.js'))
	.pipe(gulp.dest(''))
	.pipe(rename({suffix : '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest(''))
})

//合并插件模块
gulp.task('calendar-bulid',function(){
	gulp.src(['app/js/lib/**/*.html'])
	.pipe(htmlmin())
        .pipe(ngHtml2js({
            moduleName: 'calendar-template'
        }))
        .pipe(concat('calendar-template.js'))
        .pipe(gulp.dest(''));
})

//编译插件CSS
gulp.task('calendar-sass',function(){
	gulp.src(['app/css/lib/com.scss'])
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(rename({suffix:'.calendar'}))
	.pipe(gulp.dest(''));
})



//开启刷新
gulp.task('dev',function(){
	browserSync.init({
        port: 3000,
        server: './dist'
    });
})

//串起来批处理
gulp.task('watch',function(){
	gulp.start('sass', 'jshint', 'htmlhint', 'javascript','build-html','dev','calendar-js','calendar-bulid','calendar-sass');
	gulp.watch(['app/js/**/*.html', 'app/js/common/**/*.html'],['build-html','calendar-bulid']);
	gulp.watch('app/css/**/*.scss', ['sass','calendar-sass']);
	gulp.watch('app/js/**/*.js', ['jshint', 'javascript','calendar-js']);
	gulp.watch('app/*.html', ['htmlhint']);
})
