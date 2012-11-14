// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {

  // space-separated list to array
  function _L(list) {
    return list.split(" ");
  }

  var distPath = "dist/";
  var debugPath = distPath + "debug/";
  var releasePath = distPath + "release/";

  grunt.initConfig({

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: [distPath],

    // The jshint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.
    jshint: {
      files: [
        "app/**/*.js"
      ],
      options: {
        scripturl: true,
        sub: true
      }
    },

    concat: {
      css: {
        src: [
          debugPath + "css/app.css"
        ],
        dest: debugPath + "css/all.css"
      },
      preScripts: {
        src: [
// TODO
          "assets/js/utils/console-helper.js",
          "components/json2/json2.js",
          debugPath + "all.js"
        ],
        dest: debugPath + "all.js"
      }
    },

    // The less task compiles and concats all less templates
    // into a CSS file.
    less: {
      compile: {
        options: {
          compress: false,
          yuicompress: false
        },
        files: {
          "dist/debug/css/app.css": "app/styles/**/*.less"
        }
      }
    },

    // This task uses the MinCSS Node.js task to minimize the all CSS file.
    mincss: {
      release: {
        src: [releasePath+"css/all.css"],
          dest:releasePath+"css/all.css"
      }
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      js: {
        src: debugPath+"all.js",
        dest: releasePath+"all.js"
      }
    },

    // The makedir task creates a specified directory if it
    // does not exist.
    makedir: {
      dist: {
        path: distPath
      },
      debug: {
        path: debugPath
      },
      // create an 'img' directory in the dist/debug dir.
      img: {
        path: debugPath + "images/"
      },

      // create an 'img' directory in the dist/release dir.
      imgRelease: {
        path: releasePath + "images/"
      }
    },

    // The copy task copies file(s)/folder(s) with wildcards
    // to a specified destination.
    copy: {
      app: {
        src: ["app/**/*.js"],
        dest: debugPath + "app/"
      },
// TODO: this is the temporary part that needs to be resolved
      "components-images": {
        src: ["components/bootstrap/img/*"],
        dest: debugPath + 'images/'
      },
      "components-js": {
        src: ["components/domready/ready.js","components/jquery/jquery.js","components/json2/json2.js","components/requirejs/require.js"],
        dest: debugPath + 'js/'
      },
// TODO: this is the temporary part that needs to be resolved
      // copy the favicon to the dist/debug directory
      faviconDebug: {
        src: ["assets/icons/favIcon.debug.ico"],
        dest: debugPath + "favicon.ico"
      },
      // copy the favicon to the dist/release directory
      faviconRelease: {
        src: ["assets/icons/favIcon.release.ico"],
        dest: releasePath + "favicon.ico"
      },
      html: {
        src: ["assets/html/*.html","assets/html/*.txt"],
        dest: debugPath + "/"
      },
      images: {
        src: ["assets/images/**/*.png", "assets/images/**/*.jpeg", "assets/images/**/*.jpg", "assets/images/**/*.gif"],
        dest: debugPath + "images/"
      },
      libs: {
        src: "assets/js/**/*.js",
        dest: debugPath + 'js/'
      },
      release: {
        src: [debugPath+"**/*.*"],
        dest: releasePath + "/"
      }
    },

    // Running the server without specifying an action will run the defaults,
    // port: 8000 and host: 127.0.0.1.  If you would like to change these
    // defaults, simply add in the properties `port` and `host` respectively.
    // Alternatively you can omit the port and host properties and the server
    // task will instead default to process.env.PORT or process.env.HOST.
    //
    // Changing the defaults might look something like this:
    //
    // server: {
    //   host: "127.0.0.1", port: 9001
    //  }
    //
    server: {
      // settings for the 'debug' build
      host: process.env.HOST || "0.0.0.0",
      port: 4444,
      index: debugPath + "index.html",
      app: debugPath + "index.html",
      favicon: debugPath + "favicon.ico",

      // known static files
      files: {
        "index.html": debugPath + "index.html",
        "all.js": debugPath + "all.js",
        "favicon.ico": debugPath + "favicon.ico"
      },

      // aliases for folders
      folders: {
        "app": debugPath + "app",
        "css": debugPath + "css",
        "js": debugPath + "js",
        "images": debugPath + "images"
      }
    },

    // This task uses James Burke's excellent r.js AMD build tool.  In the
    // future other builders may be contributed as drop-in alternatives.
    requirejs: {
      baseUrl: "dist/debug/app",
      // Include the main configuration file.
      mainConfigFile: "app/config.js",
      // Output file.
      out: debugPath+"all.js",
      // Root application module.
      name: "main",
      // Do not wrap everything in an IIFE.
      wrap: false
    },

    // The watch task monitors specified files for changes
    // and executes a task upon change.
    watch: {
      files: ["<config:jshint.files>", "**/*.html", "app/styles/**/*", "app/templates/**/*.hbs", "assets/css/*", "assets/icons/*", "assets/images/*", "assets/js/*"],
      tasks: "build"
    },

     // compress
    compress: {
      zip: {
        options: {
          mode: "zip",
          basePath: distPath,
          level: 1
        },
        files: {
          "dist/release.zip": releasePath+"/**"
        }
      },
      tgz: {
        options: {
          mode: "tgz",
          basePath: releasePath,
          level: 1
        },
        files: {
          "dist/release.tgz": releasePath+"/**"
        }
      }
    }

  });

  // The build task will:
    // remove all contents inside the dist/ folder
    // jshint all your code
    // precompile all the underscore templates into dist/debug/templates.js
    // compile all the application code into dist/debug/all.js
    // concatenate dist/debug/templates.js + dist/debug/all.js
  grunt.registerTask("default", "server");
  grunt.registerTask("build", "Builds a debug version of the app", _L("clean jshint makedir:debug copyAll less concat:css requirejs concat:preScripts"));

  // The release task will run the debug tasks and then minify the dist/debug/require.js file and CSS files.
  grunt.registerTask("release", "Builds a release version of the app (alias - br)", _L("build copy:release copy:faviconRelease min:js mincss:release compress:tgz doc"));
  
  // the copyAll task copies from assets to dist
  grunt.registerTask("copyAll", "Helper (copying)", _L("copy:faviconDebug makedir:img copy:images copy:html copy:app copy:components-images copy:components-js copy:libs"));

  // coverage
  grunt.registerTask("cover", "Generate code coverage data", _L("makedir:dist makedir:cover copy:cover jscoverage"));
};
