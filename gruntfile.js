module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        clean: ['build/'],

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['node_modules/**']
            },//end of options for jshint
            source: {
                files: {
                    src:['src/js/**/*.js']
                }//end of files for src/
            }, //end of source for jshint
            test: {
                files: {
                    src: ['test/specs/**/*.js']
                }//end of files for test/
            }//end of test information for jshnt
        },//end of jshint

        copy: {
          html: {
            files: [
              {
                expand: true,
                cwd: 'src/',
                src: [ 'index.html' ],
                dest: 'build/'
              }//end of files for copy
            ]//end of files for html copy
          },//end of html information for copy
          vendorjs: {
            files: [
              {
                expand: true,
                cwd: 'node_modules/jquery/dist/',
                src: [ 'jquery.js' ],
                dest: 'build/js/'
              }//end of file list for vendorjs
            ]//files for vendorjs
          }//vendorjs
        },//end of copy
      concat: {
          js: {
            src:['src/js/**/*.js'],
            dest:'build/js/app.js'
          }
      },//end of concat
      connect: {
        testing: {
          options: {
            port: 8888,
            base: '.'
          }
        }
      },//end of connect
      mocha: {
          all: {
            options: {
                urls: [
                    'http://localhost:8888/test/test.html'
                ]
            }
          }
      },//end of mocha
      watch: {
        html: {
          files: ['src/index.html'],
          tasks: ['copy:html']
        },
        js: {
          files: ['src/js/**/*.js'],
          tasks: ['test', 'concat']
        },
        sass: {
          files: ['src/sass/**/*.scss'],
          tasks: ['sass']
        },
        test: {
          files: ['test/specs/**/*.js'],
          tasks: ['test']
        }
      }
    });//end of init config

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch')

    grunt.registerTask('default', ['jshint','clean', 'test', 'concat', 'copy']);
    grunt.registerTask('test', ['jshint', 'connect', 'mocha']);
};
