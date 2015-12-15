/*
 * grunt-bower-sync
 * https://github.com/mrmlnc/grunt-bower-sync
 *
 * Copyright (c) 2015 Denis Malinochkin
 * Licensed under the MIT license.
 */

'use strict';

function bowerSync(grunt) {
  var Promise = require('promise');
  var Utils = require('./lib/utils');
  var Fsys = require('./lib/fsys');

  grunt.registerMultiTask('bowersync', 'Simple copy Bower dependencies in the dest folder.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      bowerFile: 'bower.json',
      dependencies: true,
      devDependencies: false,
      peerDependencies: false,
      updateAndDelete: true,
      symlink: false
    });

    // Initialization Utilities
    var done = this.async();
    var utils = new Utils(options);
    var fsys = new Fsys(options);
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      if (f.src.length === 0) {
        grunt.log.warn('Source directory not found.');
        done();
      } else {
        f.src.forEach(function(filepath) {
          var deps = utils.getListDependencies();
          var copyPromise = fsys.copyDependencies(filepath, f.dest, deps);
          var removePromise = fsys.removeDependencies(f.dest, deps);
          Promise.all([copyPromise, removePromise])
            .then(function() {
              done();
            });
        });
      }
    });
  });
}

module.exports = bowerSync;
