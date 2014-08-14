module.exports = function (grunt) {
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
                    livereload:true
                }
            }
        },
        express: {
            all: {
                options: {
                    port:9000,
                    hostname:'localhost',
                    bases: ['app/'],
                    livereload:true
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('gwatch',['watch']);
    grunt.registerTask('default', ['sass', 'watch']);
    grunt.registerTask('server',['express', 'watch','sass']);
};