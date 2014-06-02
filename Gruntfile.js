'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        config: {
            dev: 'static/dev/',
            prod: 'static/'
        },

        csslint: {
            dev: {
                options: {
                    /* https://github.com/CSSLint/csslint/wiki/Rules */
                },
                src: ['<%= config.dev %>*.css']
            }
        },

        cssmin: {
            dev: {
                files: {
                    '<%= config.prod %>min.css': ['<%= config.dev %>*.css']
                }
            }
        },

        uglify: {
            options: {
                'banner': '/* <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>* /\n',
                'preserveComments': false
            },
            dev: {
                files: [{
                    src: '<%= config.dev %>*.js',
                    dest: '<%= config.prod %>min.js'
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: ['Gruntfile.js'],
            dev: ['<%= config.dev %>*.js'],
            all: ['Gruntfile.js', '<%= config.dev %>*.js']
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: ['<%= config.dev %>*.js'],
                tasks: ['jshint:dev','uglify:dev']
            },
            css: {
                files: ['<%= config.dev %>style.css'],
                tasks: ['csslint:dev','cssmin:dev']
            }
        }

    });

    grunt.registerTask('lint', [
        'csslint:dev',
        'jshint:dev'
    ]);

    grunt.registerTask('dev', [
        'csslint:dev',
        'cssmin:dev',
        'jshint:dev',
        'uglify:dev'
    ]);

    grunt.registerTask('default', [
        'csslint:dev',
        'cssmin:dev',
        'jshint:all',
        'uglify:dev'
    ]);

};