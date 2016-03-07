"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-exec");
  grunt.initConfig({
    copy: {
      animatecss: {
        files: [
          {
            expand: true,
            cwd: "bower_components/animate.css/",
            src: "animate.min.css",
            dest: "vendor/css/"
          }
        ]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: "bower_components/jquery/dist/",
            src: "jquery.min.js",
            dest: "vendor/js/"
          }
        ]
      },
      jqueryscrollTo: {
        files: [
          {
            expand: true,
            cwd: "bower_components/jquery.scrollTo/",
            src: "jquery.scrollTo.min.js",
            dest: "vendor/js/"
          }
        ]
      },
      wow: {
        files: [
          {
            expand: true,
            cwd: "bower_components/wow/dist/",
            src: "wow.min.js",
            dest: "vendor/js/"
          }
        ]
      }
    },
    exec: {
      jekyll: {
        cmd: "jekyll build --trace"
      }
    },
    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ["_data/**/*", "_drafts/**/*", "_includes/**/*", "_layouts/**/*", "_posts/**/*", "assets/**/*", "_config.yml", "*.html", "*.md"],
        tasks: ["exec:jekyll"]
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '_site',
          livereload: true
        }
      }
    }
  });
  grunt.registerTask("build", ["copy", "exec:jekyll"]);
  grunt.registerTask("serve", ["build", "connect:server", "watch"]);
  grunt.registerTask("default", ["serve"]);
};
