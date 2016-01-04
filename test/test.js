var fs = require('fs');
var assert = require('assert');
var Fsys = require('../tasks/lib/fsys');

var existsSync = function(filepath) {
  try {
    return fs.statSync(filepath);
  } catch (err) {
    return false;
  }
};

describe('Errors', function() {
  it('dirNotExists | The directory src does not exist', function () {
    var actual = existsSync('tmp/dirNotExists');
    assert.equal(actual, false);
  });

  it('copyNull | Empty bower.json file (no dependencies)', function () {
    var actual = existsSync('tmp/copyNull');
    assert.equal(actual, false);
  });
});

describe('Copying', function() {
  it('copySingle | Copy only one dependency', function() {
    var actual = fs.readdirSync('tmp/copySingle').toString();
    assert.equal(actual, 'jquery');
  });

  it('copyMultiple | Copying multiple dependencies', function() {
    var actual = fs.readdirSync('tmp/copyMultiple').toString();
    assert.equal(actual, 'bootstrap,jquery,salvattore');
  });

  it('symlink | Create symlinks to dependencies', function() {
    var actual = fs.readdirSync('tmp/symlink').toString();
    assert.equal(actual, 'bootstrap,jquery,salvattore');
  });
});

describe('Removing', function() {
  it('removeSingle | Delete only one dependency', function() {
    var fsys = new Fsys({ updateAndDelete: true });
    fsys.removeDependencies('tmp/removeSingle', ['bootstrap', 'salvattore'])
      .then(function() {
        var actual = fs.readdirSync('tmp/removeSingle').toString();
        assert.equal(actual, 'bootstrap,salvattore');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });

  it('removeMultiple | Delete multiple dependencies', function() {
    var fsys = new Fsys({ updateAndDelete: true });
    fsys.removeDependencies('tmp/removeMultiple', ['jquery'])
      .then(function() {
        var actual = fs.readdirSync('tmp/removeMultiple').toString();
        assert.equal(actual, 'jquery');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });

  it('removeSymlink | Delete symlinks to the dependencies', function() {
    var fsys = new Fsys({ updateAndDelete: true });
    fsys.removeDependencies('tmp/removeSymlink', ['jquery'])
      .then(function() {
        var actual = fs.readdirSync('tmp/removeSymlink').toString();
        assert.equal(actual, 'jquery');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });

  it('removeAll | Delete all dependencies', function() {
    var fsys = new Fsys({ updateAndDelete: true });
    fsys.removeDependencies('tmp/removeAll', [])
      .then(function() {
        var actual = fs.readdirSync('tmp/removeAll').toString();
        assert.equal(actual, '');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });
});

describe('Updating', function() {
  it('updateOnly | Only update dependencies (without removing)', function() {
    var fsys = new Fsys({ updateAndDelete: false });
    fsys.removeDependencies('tmp/updateOnly', ['bootstrap'])
      .then(function() {
        var actual = fs.readdirSync('tmp/updateOnly').toString();
        assert.equal(actual, 'bootstrap,jquery');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });
});
