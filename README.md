# grunt-bower-sync

> Synchronizing Bower dependencies, with the possibility of compiling a list

[![Travis](https://img.shields.io/travis/mrmlnc/grunt-bower-sync.svg?style=flat-square)](https://travis-ci.org/mrmlnc/grunt-bower-sync)
[![NPM version](https://img.shields.io/npm/v/grunt-bower-sync.svg?style=flat-square)](https://www.npmjs.com/package/grunt-bower-sync)
[![devDependency Status](https://img.shields.io/david/mrmlnc/grunt-bower-sync.svg?style=flat-square)](https://david-dm.org/mrmlnc/grunt-bower-sync#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/grunt-bower-sync.svg?style=flat-square)](https://david-dm.org/mrmlnc/grunt-bower-sync#info=devDependencies)

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-sync');
```

## The bowersync task

This plugin allows you to synchronize two directories, based on the contents of the **bower.json** file.

## Usage

Within your grunt file:

```js
bowersync: {
  taskName: {
    files: {
      'your/target/directory': 'bower_components'
    },
    options: {
      // The path to the file. Default: 'bower.json'
      bowerFile: 'bower.json',
      // Use when copying `dependencies` section. Default: true
      dependencies: true,
      // Use when copying `devDpendencies` section. Default: false
      devDependencies: false,
      // Use when copying `peerDependencies` section. Default: false
      peerDependencies: false,
      // Remove all files from dest that are not found in src. Default: true
      updateAndDelete: true,
      // Create symlinks to dependencies, instead of copying them. Default: false
      symlink: false
    }
  }
}
```

## How it works?

Algorithm of work built on comparing the dependencies in the bower.json file  and the current list of dependencies in the target directory.

Details:

  1. Read dependencies in the bower.json file
  2. Copy all dependencies (overwrite*) into the target directory
  3. Get a list of dependencies in the target directory
  4. Find unique items in a list (dependencies that are not in bower.json file)
    1. Compiling a list of dependencies for delete in the target directory
  5. Removing unnecessary dependencies to the target directory

Remark:

  1. Overwrite enabled due to the possibility release of a new version of the dependency

## History

  - **v1.0.1** [2016-02-22] - Compatibility with Grunt version 1.0.0.
  - **v1.0.0** [2016-01-14] - Update deps, simplify conditions and first stable release.
  - **v0.2.3** [2015-12-29] - Fix wrong work with promises in a loop. Again.
  - **v0.2.2** [2015-12-26] - Update `arr-diff` to v2.0.0
  - **v0.2.1** [2015-12-15] - Fix wrong work with promises in a loop.
  - **v0.2.0** [2015-12-14] - Working with symlinks.
  - **v0.1.5** [2015-09-13] - Eslint (XO) checking.
  - **v0.1.4** [2015-09-10] - The completion of the task, if the src directory does not exist.
  - **v0.1.3** [2015-09-09] - Change task name.
  - **v0.1.2** [2015-09-09] - Initial().
