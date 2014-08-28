# grunt-blueprint-test-runner

> API Blueprint and Protractor Test Runner.

## Getting Started
This plugin requires Grunt `~0.4.5`

```shell
npm install grunt-blueprint-test-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-blueprint-test-runner');
```

## The "blueprint_test_runner" task

### Overview
In your project's Gruntfile, add a section named `blueprint-test-runner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  blueprint_test_runner: {
    your_target: {
      drakov: {
        sourceFiles: 'path/to/blueprint/files/**/*.md',
        serverPort: 3000,
        staticPaths: 'path/to/static/files'
      },
      protractor: {
        suites: {
          test-suite1: 'path/to/specs/**.js'
        }
      }    
    }
  }
});
```

**NOTE:** The plugin defaults to running the tests with selenium + phantomjs. *See example below to run with chromedriver.*

### Usage Examples

#### Default Options
This is an example of a minimum configuration config.

The `sourceFiles` property is required in the `drakov` object below. `suites` is also required to have entries like the example below.

```js
grunt.initConfig({
  blueprint_test_runner: {
    your_target: {
      drakov: {
        sourceFiles: 'path/to/blueprint/files/**/*.md',
      },
      protractor: {
        suites: {
          test-suite1: 'path/to/specs/**.js'
        }
      }    
    }
  }
});
```

#### Running with the chromedriver
This is an example of a minimum configuration config.

Instead of running with selenium and phantomjs, simple add `chromeDriver: true` inside your target properties.

```js
grunt.initConfig({
  blueprint_test_runner: {
    your_target: {
      chromeDriver: true,
      drakov: {
        sourceFiles: 'path/to/blueprint/files/**/*.md',
      },
      protractor: {
        suites: {
          test-suite1: 'path/to/specs/**.js'
        }
      }    
    }
  }
});
```

#### Configuration with additional Drakov properties
This is an example of all the extra properties for Drakov including server port and a basic static route.

The `sourceFiles` property is required in the `drakov` object below. `suites` is also required to have entries like the example below.

```js
grunt.initConfig({
  blueprint_test_runner: {
    your_target: {
      drakov: {
        sourceFiles: 'path/to/blueprint/files/**/*.md',
        serverPort: 3000,
        staticPaths: 'path/to/static/files'
      },
      protractor: {
        suites: {
          test-suite1: 'path/to/specs/**.js'
        }
      }    
    }
  }
});
```

`staticPaths` can also take a path with a mount point, i.e. `staticPaths: 'path/to/static/files=/url/mnt'`. This will mount the files at the url base path of `/url/mnt`.

You can also provide multiple paths/mounts by substituting the value with an array.

For example:
```js
...
staticPaths: [
    'path/to/static/files',
    'another/path/to/static/files=/mnt/me/here'
]
...
```