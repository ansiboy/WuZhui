var release_dir = 'release';
module.exports = function (grunt) {
    var config = {
        ts: {
            wuzhui_release: {
                src: ['src/**/*.ts'],
                dest: release_dir + '/wuzhui.js',
                options: {
                    basePath: release_dir,
                    target: 'es5',
                    removeComments: true,
                    declaration: true,
                    references: [
                        "src/**/*.ts"
                    ],
                    sourceMap: false
                }
            },
            test_release: {
                src: ['test/**/*.ts'],
                dest: release_dir + '/test',
                options: {
                    basePath: release_dir,
                    target: 'es5',
                    removeComments: true,
                    declaration: false,
                    references: [
                        "test/**/*.ts"
                    ],
                    sourceMap: false
                }
            }
        },
        copy: {
            release_test: {
                files: [
                    { src: ['release/wuzhui.js'], dest: 'test/scripts/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: 'test/scripts/typings/wuzhui.d.ts' },

                    { src: ['release/wuzhui.js'], dest: '../ShopCloud/AdminWeb/src/js/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: '../ShopCloud/AdminWeb/src/js/typings/wuzhui.d.ts' },

                    { src: ['release/wuzhui.js'], dest: '../ShopCloud/AdminWeb/Shop/js/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: '../ShopCloud/AdminWeb/Shop/js/typings/wuzhui.d.ts' },
                ]
            },
            test_release: {
                files: [
                    { expand: true, src: ['test/**/*.html'], dest: release_dir },
                    { expand: true, src: ['test/scripts/**/*.js'], dest: release_dir },
                    { expand: true, src: ['test/content/**/*.css'], dest: release_dir },
                ]
            },
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['ts', 'copy']);

};