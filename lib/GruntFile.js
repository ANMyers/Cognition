module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope", "$q", "require" ],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true}
      },
      files: ['../app/**/*.js', '!../app/values/kmeans.js', '!../app/factories/kmeansFactory.js']
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js', '!../app/values/kmeans.js', '!../app/factories/kmeansFactory.js'],
        tasks: ['jshint']
      },
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'watch']);
};