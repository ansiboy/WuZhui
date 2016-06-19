var js_output_file = 'release/chitu.js';
var ts_output_file = 'release/chitu.d.ts';
var build_dir = 'build';
var release_dir = 'release';
module.exports = function (grunt) {
    var config = {
        ts: {
            main: {
                src: ['src/**/*.ts'],
                dest: build_dir + '/wuzhui.js',
                options: {
                    basePath: build_dir,
                    target: 'es5',
                    removeComments: true,
                    declaration: true,
                    references: [
                        "src/**/*.ts"
                    ],
                    sourceMap: false
                }
            }
        }
    };




    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['ts']);//,, 'clean'

};