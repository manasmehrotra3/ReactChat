module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
          options : {
            stdout: true
          },
          npm_install: {
            command: 'npm install'
          },
          bower_install: {
            command: 'bower install'
          },
          hello: {
            command: function () {
                return 'echo Installation process complete. Type \'Grunt\' and press Enter key to run the demo.';
            }
          }
        },

        react: {
            dynamic_mappings: {
              files: [
                {
                  expand: true,
                  cwd: 'js/jsx',
                  src: ['*.jsx'],
                  dest: 'js',
                  ext: '.js'
                }
              ]
            }     
        },

        concat: {
             dist: {
                src: [
                    'js/*.js' // All JS in the libs folder
                ],
                dest: 'js/build/production.js',
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/style.css': 'css/style.scss'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: 'localhost'
                }
            }
        },

        open: {
            delayed: {
              path: 'http://localhost:8080/index.html',
            }
        },

        watch: {
            options: {
                livereload: true,
            }, 
            scripts: {
                files: ['js/jsx/*.jsx', 'css/*.scss', 'index.html'],
                tasks: ['react', 'concat', 'sass'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.registerTask('default', ['react', 'concat', 'sass', 'connect', 'open', 'watch']);

    grunt.registerTask('install', ['shell:npm_install','shell:bower_install', 'shell:hello']);
};