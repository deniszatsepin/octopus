module.exports = function(grunt) {

  grunt.initConfig({
    env: {
      options: {
        NODE_PATH: '/home/fetch/work/octos/octopus/modules'
      },
      dev: {
        NODE_ENV: 'development',
      }
    },
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

      all: ['Gruntfile.js', 'index.js', 'modules/**/*.js']
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
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('hint', 'jshint');
  grunt.registerTask('test', ['env', 'mochaTest']);

  grunt.registerTask('default', ['hint', 'test']);
};