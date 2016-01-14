'use strict';

function bowerSync(grunt) {
  var Promise = require('promise');
  var utils = require('../lib/utils');
  var fsys = require('../lib/fsys');

  grunt.registerMultiTask('bowersync', 'Simple copy Bower dependencies in the dest folder.', function() {
    var done = this.async();
    var opts = this.options({
      bowerFile: 'bower.json',
      dependencies: true,
      devDependencies: false,
      peerDependencies: false,
      updateAndDelete: true,
      symlink: false
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      if (f.src.length === 0) {
        grunt.log.warn('Source directory not found.');
        done();
        return;
      }

      f.src.forEach(function(filepath) {
        var deps = utils.getListOfDeps(opts);
        var copyPromise = fsys.copyDeps(filepath, f.dest, deps, opts);
        var removePromise = fsys.removeDeps(f.dest, deps, opts);
        Promise.all([copyPromise, removePromise])
          .then(function() {
            done();
          })
          .catch(function(err) {
            grunt.fail.warn(err);
            done();
          });
      });
    });
  });
}

module.exports = bowerSync;
