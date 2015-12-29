var path = require('path');
var fs = require('fs-extra');
var Promise = require('promise');
var arrDiff = require('arr-diff');
var cwd = process.cwd();

var _copyPromise = Promise.denodeify(fs.copy);
car _symlinkPromise = Promise.denodeify(fs.ensureSymlink);
var _removePromise = Promise.denodeify(fs.remove);

function Fsys(options) {
  this.options = options;
}

Fsys.prototype.copyDependencies = function(src, target, deps) {
  var options = this.options;

  return new Promise(function(resolve) {
    if (deps.length === 0) {
      resolve();
    } else {
      deps = deps.map(function(depName) {
        var srcDir = path.join(cwd, src, depName);
        var targetDir = path.join(cwd, target, depName);

        if (options.symlink) {
          return _symlinkPromise(srcDir, targetDir);
        }

        return _copyPromise(srcDir, targetDir, { clobber: true });
      });
    }

    resolve(Promise.all(deps));
  });
};

Fsys.prototype.removeDependencies = function(target, deps) {
  var options = this.options;

  return new Promise(function(resolve) {
    var rmDeps = 0;

    if (options.updateAndDelete && fs.existsSync(target)) {
      // Get a list of directories that can remove
      // difference bower.json dependencies and dependencies in the target directory
      rmDeps = arrDiff(fs.readdirSync(target), deps);
    } else {
      resolve();
    }

    // If list not empty
    if (typeof rmDeps === 'number') {
      resolve();
    } else {
      rmDeps = rmDeps.map(function(depName) {
        return _removePromise(path.join(cwd, target, depName));
      });
    }

    resolve(Promise.all(rmDeps));
  });
};

module.exports = Fsys;
