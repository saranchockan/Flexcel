/* jshint node:true */
module.exports = function(grunt) {

  grunt.registerTask('default', ['postcss', 'watch']);

  grunt.initConfig({
    postcss: {
      content: {
        src: 'src/content.css',
        dest: '../textboxio/resources/css/content.css'
      },
      textboxio: {
        src: 'src/textboxio.css',
        dest: '../textboxio/resources/css/textboxio.css'
      },
      options: {
        failOnError: true,
        map: false,
        processors: [
          require('postcss-partial-import')(),
          require('postcss-custom-properties')({ warnings: true, preserve: false }),
          require('postcss-reporter')({ clearMessages: true, throwError: true }),
          require('postcss-color-function')(),
          require('csswring')()
        ]
      }
    },

    watch: {
      theme: {
        files: ['theme.css'],
        tasks: ['postcss']
      },
      livereload: {
        files: ['../textboxio/resources/css/*.css'],
        options: { livereload: 37469 }
      }
    }
  });

  // external tasks
  require('load-grunt-tasks')(grunt);

};