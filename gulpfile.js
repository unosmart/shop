var gulp = require("gulp"),
	browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
	minifyCSS = require('gulp-minify-css'),
	gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	rigger = require('gulp-rigger'),
	// rename = require('gulp-rename'),
	// useref = require('gulp-useref'),
	// uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	// clear = require('gulp-rimraf'),
	// wiredep = require('wiredep').stream,
	concatCss = require('gulp-concat-css'),
	sourcemaps = require('gulp-sourcemaps');
var path = {
	build: {
		jade: 'prod/',
		sass: 'prod/css',
		fonts: 'prod/fonts/',
		js: 'prod/js/'
	},
	src: {
		jade: 'app/jade/pages/*.jade',
		sass: 'app/sass/style.scss',
		fonts: 'app/fonts/**/*.*',
		js: 'app/js/**/*.*',
		icons:'app/img/icons/*.png'
	},
	watch: {
		jade: 'app/**/*.jade',
		sass: 'app/sass/**/*.scss',
		fonts: 'app/fonts/**/*.*',
		js: 'app/js/**/*.*'

	}
};
 gulp.task('build', [
	'jadeBuild',
	'sassBuild',
	'fontsBuild',
	'jsBuild'
]);

//Сервер
gulp.task('server',['sassBuild'],function(){
	browserSync.init({
        server: {
            baseDir: "./prod"
        }
    });
});
//Слежка
gulp.task ('watch',function(){
		gulp.watch(path.watch.jade, ['jadeBuild']);
		gulp.watch(path.watch.sass,['sassBuild']);
		gulp.watch(path.watch.js);
		gulp.watch([
    'prod/*.html',
    'prod/js/**/*.js',
    'prod/css/**/*.css'
  ]).on('change',browserSync.reload);
		// gulp.watch('bower.json',['wiredep'])
		 });
//Задача по умолчанию
gulp.task('default', ['build', 'server', 'watch']);

// Создание спрайтов
gulp.task('sprite', function () {
  var spriteData = gulp.src(path.src.icons).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    padding: 10,
    algorithm: 'top-down'
  }));
    spriteData.img.pipe(gulp.dest('prod/css/'));
    spriteData.css.pipe(gulp.dest('app/sass/base/'));
});

//jade compil
 gulp.task('jadeBuild', function() {
	var YOUR_LOCALS = {};
	gulp.src(path.src.jade) 
		.pipe(plumber())
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty : '\t',
		}))
		.pipe(gulp.dest(path.build.jade))
		 .pipe(browserSync.stream());
});
//Compass for sass
 gulp.task('sassBuild', function() {
 	gulp.src(path.src.sass)
 		.pipe(plumber())
  		.pipe(sourcemaps.init())
   		.pipe(sass())
	    .pipe(autoprefixer({browsers:['>1%','last 2 versions'],cascade: false}))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(path.build.sass))
 		.pipe(browserSync.stream());
});
// Fonts build
gulp.task('fontsBuild', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

// JS build
gulp.task('jsBuild', function() {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
		 .pipe(browserSync.stream());
});

//Следим за bower
 // gulp.task('wiredep', function(){
 //    gulp.src('app/*.html')
 //    .pipe(wiredep())
 //    .pipe(gulp.dest('app/'));
 //  });
  //Сборка
//   gulp.task('useref', function () {
//     return gulp.src('app/*.html')
//         .pipe(useref())
//         .pipe(gulpif('*.js', uglify()))
//         .pipe(gulpif('*.css', minifyCss({compatibiliti:'ie8'})))
//         .pipe(gulp.dest('dist'));
// });
  //Очистка
	// gulp.task('clear', function() {
	// 	return gulp.src('dist', { read: false }) // much faster 
	// 	  .pipe(rimraf());
	// });