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
In your project's Gruntfile, add a section named `blueprint_test_runner` to the data object passed into `grunt.initConfig()`.

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

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  blueprint_test_runner: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  blueprint_test_runner: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
