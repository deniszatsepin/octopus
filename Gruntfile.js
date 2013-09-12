module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        laxcomma: true,
        node: true,
        devel: true,
        globals: {
          jQuery: true
        },
      },

      all: ['index.js', 'modules/**/*.js']
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['modules/*/test/**/*.js']
      }
    }
  });

  // Add the tasks here.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', 'jshint');
  grunt.registerTask('test', 'mochaTest');

};