var gulp       = require('gulp');
var sass       = require('gulp-sass');
var include    = require('gulp-include');
var rename     = require('gulp-rename');
var uglifyjs   = require('gulp-uglifyjs');
var finclude   = require('gulp-file-include');
var FileSystem = require('fs');
var del        = require('del');

var COMPONENTS_PATH = 'components/';

gulp.task('html', ['css', 'js'], function(){
   return gulp.src('src/html/*.html')
          .pipe(finclude())
          .pipe(gulp.dest('src'))
});

function addComponentCssTask(name){
   gulp.task(name+'.css', function(){
   return gulp.src(COMPONENTS_PATH + name + '/src/scss/style.scss')
          .pipe(sass())
          .pipe(gulp.dest(COMPONENTS_PATH + name + '/dist/css'))
   });
}

function addComponentJsTask(name){
   gulp.task(name+'.js', function(){
   return gulp.src(COMPONENTS_PATH + name + '/src/js/script.js')
          .pipe(include()).on('error', console.log)
          .pipe(gulp.dest(COMPONENTS_PATH + name + '/dist/js'))
   });
}

function addComponentHtmlTask(name){
   gulp.task(name, [name+'.css', name+'.js'], function(){
      return gulp.src(COMPONENTS_PATH + name + '/src/index.html')
             .pipe(finclude())
             .pipe(gulp.dest(COMPONENTS_PATH + name))
   });
}

function addComponentTask(name){
   addComponentCssTask(name);
   addComponentJsTask(name);
   addComponentHtmlTask(name);
}

var components = FileSystem.readdirSync(COMPONENTS_PATH);
for (var i in components){
   addComponentTask(components[i]);
}