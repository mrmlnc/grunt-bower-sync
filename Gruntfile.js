/*
 * grunt-bower-sync
 * https://github.com/mrmlnc/grunt-assetser
 *
 * Copyright (c) 2015 Denis Malinochkin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bowersync: {
      options: {
        bowerFile: 'test/fixtures/bower.json'
      },

      copyNull: {
        options: {
          bowerFile: 'test/fixtures/bower_null.json'
        },
        files: {
          'tmp/copyNull': 'test/fixtures/bower_components'
        }
      },
      dirNotExists: {
        files: {
          'tmp/dirNotExists': 'test/fixtures/ooops'
        }
      },
      copySingle: {
        files: {
          'tmp/copySingle': 'test/fixtures/bower_components'
        }
      },
      copyMultiple: {
        options: {
          devDependencies: true,
          peerDependencies: true
        },
        files: {
          'tmp/copyMultiple': 'test/fixtures/bower_components'
        }
      },
      removeSingle: {
        options: {
          devDependencies: true,
          peerDependencies: true
        },
        files: {
          'tmp/removeSingle': 'test/fixtures/bower_components'
        }
      },
      removeMultiple: {
        options: {
          devDependencies: true,
          peerDependencies: true
        },
        files: {
          'tmp/removeMultiple': 'test/fixtures/bower_components'
        }
      },
      removeAll: {
        options: {
          devDependencies: true,
          peerDependencies: true
        },
        files: {
          'tmp/removeAll': 'test/fixtures/bower_components'
        }
      },
      updateOnly: {
        options: {
          devDependencies: true,
          updateAndDelete: false
        },
        files: {
          'tmp/updateOnly': 'test/fixtures/bower_components'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'bowersync']);

};
