# grunt-bower-sync

> Synchronizing Bower dependencies, with the possibility of compiling a list

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-sync');
```

## The bowerSync task

This plugin allows you to synchronize two directories, based on the contents of the **bower.json** file.

## Usage

Within your grunt file:

```js
bowerSync: {
  taskName: {
    files: {
      'your/target/directory': 'bower_components'
    },
    options: {
      bowerFile: 'bower.json', // The path to the file. Default: 'bower.json'
      dependencies: true, // Use when copying `dependencies` section. Default: true
      devDependencies: false, // Use when copying `devDpendencies` section. Default: false
      peerDependencies: false, // Use when copying `peerDependencies` section. Default: false
      updateAndDelete: true, // Remove all files from dest that are not found in src. Default: false
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

  - **v0.1.2** [2015-09-09] - Initial().
