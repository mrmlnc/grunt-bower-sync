var fs = require('fs');
var assert = require('assert');
var fsys = require('../lib/fsys');
var utils = require('../lib/utils');

describe('Errors', function() {
  it('dirNotExists | The directory src does not exist', function () {
    var actual = utils.existsSync('tmp/dirNotExists');
    assert.equal(actual, false);
  });

  it('copyNull | Empty bower.json file (no dependencies)', function () {
    var actual = utils.existsSync('tmp/copyNull');
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
    fsys.removeDeps('tmp/removeSingle', ['bootstrap', 'salvattore'], {
      updateAndDelete: true
    })
      .then(function() {
        var actual = fs.readdirSync('tmp/removeSingle').toString();
        assert.equal(actual, 'bootstrap,salvattore');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });

  it('removeMultiple | Delete multiple dependencies', function() {
    fsys.removeDeps('tmp/removeMultiple', ['jquery'], {
      updateAndDelete: true
    })
      .then(function() {
        var actual = fs.readdirSync('tmp/removeMultiple').toString();
        assert.equal(actual, 'jquery');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });

  it('removeSymlink | Delete symlinks to the dependencies', function() {
    fsys.removeDeps('tmp/removeSymlink', ['jquery'], {
      updateAndDelete: true
    })
      .then(function() {
        var actual = fs.readdirSync('tmp/removeSymlink').toString();
        assert.equal(actual, 'jquery');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });

  it('removeAll | Delete all dependencies', function() {
    fsys.removeDeps('tmp/removeAll', [], {
      updateAndDelete: true
    })
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
    fsys.removeDeps('tmp/updateOnly', ['bootstrap'], {
      updateAndDelete: true
    })
      .then(function() {
        var actual = fs.readdirSync('tmp/updateOnly').toString();
        assert.equal(actual, 'bootstrap,jquery');
      })
      .catch(function (err) {
        assert.fail(err);
      });
  });
});
