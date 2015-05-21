# Stomap

## Developer Notes
The website was initialized using [yo](http://yeoman.io/) with the [webapp generator](https://github.com/yeoman/generator-webapp). See their notes for further help.

### Installation
1. Checkout the repository
1. Navigate to the working directory (comand line)
  1. run `npm install`
  1. run `npm install -g mocha`
  1. run `bower install`
  1. run `grunt serve`

The server should start and open a browser tab.

#### Tests
To run the tests navigate into the `/test` folder and run `bower install` there.
After that tests can be started using `grunt test` in the *root folder*.

#### Distributing
Running `grunt` in the *root folder* creates a `dist` folder with the content to be uploaded.
