module.exports = function(grunt) {
    // Configuration goes here
    grunt.initConfig({
        concat: {
            dist: {
                src: 'src/**/*.js',
                dest: 'dest/hbbtv_lib.js'
            }
        },
        uglify: {
            options: {
            },
            my_target: {
                files: {
                    'dest/hbbtv_lib.min.js': ['dest/hbbtv_lib.js']
                }
            }
        }
    });

    // Load plugins here
    grunt.loadNpmTasks('grunt-contrib');

    // Define your tasks here
    grunt.registerTask('default', ['concat','uglify']);

};