var path = require('path');
var fs = require('fs-extra');
var grunt = require('grunt');

function Utils(options) {
  this.options = options;
}

Utils.prototype.getListDependencies = function() {
  var options = this.options;
  var bower = [];

  if (fs.existsSync(options.bowerFile)) {
    var bowerFile = path.join(process.cwd(), options.bowerFile);
    var bowerJson = grunt.file.readJSON(bowerFile);

    if (options.dependencies) {
      bower = bower.concat(Object.keys(bowerJson.dependencies));
    }

    if (options.devDependencies) {
      bower = bower.concat(Object.keys(bowerJson.devDependencies));
    }

    if (options.peerDependencies) {
      bower = bower.concat(Object.keys(bowerJson.peerDependencies));
    }
  } else {
    grunt.log.warn('File bower.json was not found.');
  }

  return bower;
};

module.exports = Utils;
