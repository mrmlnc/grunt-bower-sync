var path = require('path');
var fs = require('fs');
var grunt = require('grunt');
var test = require('ava');
var Fsys = require('../tasks/lib/fsys');

test('copyNull | Empty bower.json file (no dependencies)', function(t) {
  var actual = !(fs.existsSync('tmp/copyNull'));
  t.is(actual, true);

  t.end();
});

test('copySingle | Copy only one dependency', function(t) {
  var actual = fs.readdirSync('tmp/copySingle').toString();
  t.is(actual, 'jquery');
  t.end();
});

test('copyMultiple | Copying multiple dependencies', function(t) {
  var actual = fs.readdirSync('tmp/copyMultiple').toString();
  t.is(actual, 'bootstrap,jquery,salvattore');
  t.end();
});

test('removeSingle | Delete only one dependency', function(t) {
  var fsys = new Fsys({ updateAndDelete: true });
  fsys.removeDependencies('tmp/removeSingle', ['bootstrap', 'salvattore']).then(function(err) {
    if (err) {
      throw new Error(err);
    }

    var actual = fs.readdirSync('tmp/removeSingle').toString();
    t.is(actual, 'bootstrap,salvattore');
    t.end();
  });
});

test('removeMultiple | Delete multiple dependencies', function(t) {
  var fsys = new Fsys({ updateAndDelete: true });
  fsys.removeDependencies('tmp/removeMultiple', ['jquery']).then(function(err) {
    if (err) {
      throw new Error(err);
    }

    var actual = fs.readdirSync('tmp/removeMultiple').toString();
    t.is(actual, 'jquery');
    t.end();
  });
});

test('removeAll | Delete all dependencies', function(t) {
  var fsys = new Fsys({ updateAndDelete: true });
  fsys.removeDependencies('tmp/removeAll', []).then(function(err) {
    if (err) {
      throw new Error(err);
    }

    var actual = fs.readdirSync('tmp/removeAll').toString();
    t.is(actual, '');
    t.end();
  });
});

test('updateOnly | Only update dependencies (without removing)', function(t) {
  var fsys = new Fsys({ updateAndDelete: false });
  fsys.removeDependencies('tmp/updateOnly', ['bootstrap']).then(function(err) {
    if (err) {
      throw new Error(err);
    }

    var actual = fs.readdirSync('tmp/updateOnly').toString();
    t.is(actual, 'bootstrap,jquery');
    t.end();
  });
});
