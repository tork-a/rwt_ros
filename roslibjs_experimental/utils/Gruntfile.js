module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    concat: {
      build: {
        src: ['../src/*.js'],
        dest: '../www/roslibjs_experimental.js'
      }
    },
    uglify: {
      options: {
        report: 'min'
      },
      build: {
        src: '../www/roslibjs_experimental.js',
        dest: '../www/roslibjs_experimental.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        'Gruntfile.js',
        '../www/roslibjs_experimental.js'
      ]
    },
    watch: {
      files: ['../src/*.js', 'Gruntfile.js', '.jshintrc'],
      tasks: ['build', 'doc']
    },
    jsdoc: {
      dist: {
        src: ['../src/*.js'],
        options: {
          destination: '../doc'
        }
      }
    }
  });

  // reading npm tasks
  for(var taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) === 'grunt-'.toString()) {
      grunt.loadNpmTasks(taskName);
    }
  }
  
  grunt.registerTask('build', ['concat', 'jshint', 'uglify']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('doc', ['jsdoc']);
};
