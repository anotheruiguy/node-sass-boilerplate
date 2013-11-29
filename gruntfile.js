module.exports = function(grunt) {
  grunt.initConfig ({
    sass: {
      dist: {
        files: {
          'public/stylesheets/application.css' : 'sass/application.scss'
        }
      }
    },

    watch: {
      source: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass']);
};
