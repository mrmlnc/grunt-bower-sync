var path = require('path');
var fs = require('fs-extra');
var Promise = require('promise');
var arrDiff = require('arr-diff');
var cwd = process.cwd();

var _copyPromise = function(src, target) {
  return new Promise(function(resolve, reject) {
    fs.copy(src, target, {
      clobber: true
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var _symlinkPromise = function(src, target) {
  return new Promise(function(resolve, reject) {
    fs.ensureSymlink(src, target, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


var _removePromise = function(target, depName) {
  return new Promise(function(resolve, reject) {
    fs.remove(path.join(cwd, target, depName), function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

function Fsys(options) {
  this.options = options;
}

Fsys.prototype.copyDependencies = function(src, target, deps) {
  var options = this.options;

  return new Promise(function(resolve, reject) {
    if (deps.length === 0) {
      resolve();
    } else {
      deps = deps.map(function(depName) {
        var srcDir = path.join(cwd, src, depName);
        var targetDir = path.join(cwd, target, depName);

        if (options.symlink) {
          return _symlinkPromise(srcDir, targetDir);
        }

        return _copyPromise(srcDir, targetDir);
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
        return _removePromise(target, depName);
      });
    }

    resolve(Promise.all(rmDeps));
  });
};

module.exports = Fsys;
