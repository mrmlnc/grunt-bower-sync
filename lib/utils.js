var path = require('path');
var fs = require('fs');
var grunt = require('grunt');

var existsSync = function(filepath) {
  try {
    return Boolean(fs.statSync(filepath));
  } catch (err) {
    return false;
  }
};

module.exports.existsSync = existsSync;

module.exports.getListOfDeps = function(opts) {
  var bower = [];
  if (existsSync(opts.bowerFile)) {
    var bowerFile = path.join(process.cwd(), opts.bowerFile);
    var bowerJson = grunt.file.readJSON(bowerFile);

    if (opts.dependencies) {
      bower = bower.concat(Object.keys(bowerJson.dependencies));
    }

    if (opts.devDependencies) {
      bower = bower.concat(Object.keys(bowerJson.devDependencies));
    }

    if (opts.peerDependencies) {
      bower = bower.concat(Object.keys(bowerJson.peerDependencies));
    }

    return bower;
  }

  grunt.log.warn('File bower.json was not found.');
};
