module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    shell: {
      install: {
        command: 'node ./node_modules/bower/bin/bower install'
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'karma:unit']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        eqeqeq: true,
        globals: {
          angular: true
        }
      }
    },
    concat: {
      src: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      src: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': '<%= concat.src.dest %>'
        }
      }
    },
    connect: {
      options: {
        port: 8000,
      },
      server: {
        options: {
          keepalive: true
        }
      },
      testserver: {}
    },
    karma: {
      dev: {
        e2e: {
          configFile: './test/karma-e2e.conf.js'
        }
      },
      unit: {
        configFile: './test/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true
      },
      e2e: {
        configFile: './test/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true
      }
    },
    ngmin: {
      src: {
        src: '<%= concat.src.dest %>',
        dest: '<%= concat.src.dest %>'
      }
    }
  });

  grunt.registerTask('test', ['karma:unit', 'connect:testserver', 'karma:e2e']);
  grunt.registerTask('test:unit', ['karma:unit']);
  grunt.registerTask('test:e2e', ['connect:testserver', 'karma:e2e']);
  grunt.registerTask('test:dev:e2e', ['connect:testserver', 'karma:dev:e2e']);

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('default', ['dev']);

  grunt.registerTask('install', ['shell:install']);
  grunt.registerTask('server', ['connect:server']);
  grunt.registerTask('build', ['jshint', 'test', 'concat', 'ngmin', 'uglify']);
};
