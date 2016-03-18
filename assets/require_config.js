/**
 * RequireJS configuration
 *
 * See: Patterns for separating config from the main module
 * https://github.com/requirejs/requirejs/wiki/Patterns-for-separating-config-from-the-main-module
 */

var require = {
  baseUrl: "/assets",
  shim: {
    "bootstrap": {deps: ["jquery"]},
    "velocity": {deps: ["jquery"]},
    "ie10fix": {deps: ["bootstrap"]}
  },
  paths: {

    // Bootstrap
    "bootstrap": "bootstrap/dist/js/hf-bootstrap.min",

    // IE10 viewport hack for Surface/desktop Windows 8 bug
    "ie10fix": "bootstrap/ie10-viewport-bug-workaround",

    // Vendor
    "d3": "vendor/js/d3.min",
    "jquery": [
      "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js",
      "vendor/js/jquery.min"
    ],
    "lodash": "vendor/js/lodash.min",
    "pouchdb": "vendor/js/pouchdb.min",
    "velocity": "vendor/js/velocity.min",
    "wow": "vendor/js/wow.min",

    // Site
    "lib": "site/js/lib",
    "visualizers": "site/js/visualizers",
    "site": "site/js"
  }
};
