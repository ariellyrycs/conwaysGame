
/*globals module, grunt*/

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'app/css/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                cwd: '',
                files: ['sass/*.scss'],
                tasks:['sass'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: ['app/js/**/*.js', 'test/**/*.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },
        express: {
            all: {
                options: {
                    port:9000,
                    hostname:'localhost',
                    bases: ['app/'],
                    livereload: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['karma:unit:start', 'watch']);
    grunt.registerTask('gwatch',['watch']);
    grunt.registerTask('default', ['sass', 'watch']);
    grunt.registerTask('server',['express', 'watch','sass']);
};