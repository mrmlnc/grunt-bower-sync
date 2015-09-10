var path = require('path');
var fs = require('fs-extra');
var Promise = require('promise');
var arrDiff = require('arr-diff');
var cwd = process.cwd();

function Fsys(options) {
  this.options = options;
}

Fsys.prototype.copyDependencies = function(src, target, deps) {
  return new Promise(function(resolve, reject) {
    if (deps.length !== 0) {
      deps.forEach(function(depName) {
        var srcDir = path.join(cwd, src, depName);
        var targetDir = path.join(cwd, target, depName);

        fs.copy(srcDir, targetDir, {
          clobber: true
        }, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } else {
      resolve();
    }
  });
};

Fsys.prototype.removeDependencies = function(target, deps) {
  var options = this.options;

  return new Promise(function(resolve, reject) {
    var rmDeps = 0;

    if (options.updateAndDelete && fs.existsSync(target)) {
      // Get a list of directories that can remove
      // difference bower.json dependencies and dependencies in the target directory
      rmDeps = arrDiff(fs.readdirSync(target), deps);
    } else {
      resolve();
    }

    // If list not empty
    if (typeof rmDeps !== 'number') {
      rmDeps.forEach(function(depName) {
        fs.remove(path.join(cwd, target, depName), function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } else {
      resolve();
    }
  });
};

module.exports = Fsys;
