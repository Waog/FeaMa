# Stomap

## Developer Notes
The website was initialized using [yo](http://yeoman.io/) with the [webapp generator](https://github.com/yeoman/generator-webapp). See their notes for further help.

### Installation
1. Checkout the repository
1. Navigate to the working directory (comand line)
  1. run `npm install -g grunt cli`
  1. run `npm install -g tsd`
  1. run `npm install -g bower`
  1. run `npm install`

### Running
Run `grunt serve`

The server should start and open a browser tab.

#### Tests
Run `grunt test` to start a single build and test.

There are additional options to run tests:
- run `grunt test:once` does the same as `grunt test`. Works headless (PhantomJS).
- run `grunt test:continuous` watches for file changes. Each ts-file change triggers a build and a new test run. Works headless (PhantomJS).
- run `grunt test:debug` like `grunt test:continuous` but runs in Chrome, with better debugging capabilities.

#### Distributing
Running `grunt` in the *root folder* creates a `dist` folder with the content to be uploaded.
