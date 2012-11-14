// Set the require.js configuration for your application
var requireConfig = require.config({

  paths: {
    // Paths
    root: "../app",

    // Vendor Libraries
    jquery: "../js/jquery/jquery",
    json: "../js/json2/json2",

    // Primary application instance
    app: "../app/app",
    "self.initializers": "../app/self.initializers"
  },

  // Shim section is for specifiying dependencies for non-amd libraries/modules
  shim: {
  }
});
