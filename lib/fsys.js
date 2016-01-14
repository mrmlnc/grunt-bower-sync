var path = require('path');
var fs = require('fs-extra');
var Promise = require('promise');
var arrDiff = require('array-differ');
var utils = require('./utils');
var cwd = process.cwd();

var _copyPromise = Promise.denodeify(fs.copy);
var _symlinkPromise = Promise.denodeify(fs.ensureSymlink);
var _removePromise = Promise.denodeify(fs.remove);

module.exports.copyDeps = function(src, target, deps, opts) {
  return new Promise(function(resolve) {
    if (deps.length === 0) {
      resolve();
    }

    deps = deps.map(function(depName) {
      var srcDir = path.join(cwd, src, depName);
      var targetDir = path.join(cwd, target, depName);

      if (opts.symlink) {
        return _symlinkPromise(srcDir, targetDir);
      }

      return _copyPromise(srcDir, targetDir, { clobber: true });
    });

    resolve(Promise.all(deps));
  });
};

module.exports.removeDeps = function(target, deps, opts) {
  return new Promise(function(resolve) {
    var rmDeps = [];
    if (opts.updateAndDelete && utils.existsSync(target)) {
      // Get a list of directories that can remove
      // difference bower.json dependencies and dependencies in the destination directory
      rmDeps = arrDiff(fs.readdirSync(target), deps);
    } else {
      resolve();
    }

    // If list empty
    if (rmDeps.length === 0) {
      resolve();
    }

    rmDeps = rmDeps.map(function(depName) {
      return _removePromise(path.join(cwd, target, depName));
    });

    resolve(Promise.all(rmDeps));
  });
};
