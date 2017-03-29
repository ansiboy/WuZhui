var release_dir = 'release';
module.exports = function (grunt) {
    var config = {
        shell: {
            src: {
                command: 'tsc -p src',
                options: {
                    failOnError: false
                }
            },
            test: {
                command: 'tsc -p test',
                options: {
                    failOnError: false
                }
            },
        },
        copy: {
            release_test: {
                files: [
                    { src: ['release/wuzhui.js'], dest: 'test/scripts/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: 'test/scripts/typings/wuzhui.d.ts' },

                    { src: ['release/wuzhui.js'], dest: '../ShopCloud/AdminWeb/src/scripts/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: '../ShopCloud/AdminWeb/src/scripts/typings/wuzhui.d.ts' },

                    // { src: ['release/wuzhui.js'], dest: '../ShopCloud/AdminWeb/Shop/scripts/wuzhui.js' },
                    // { src: ['release/wuzhui.d.ts'], dest: '../ShopCloud/AdminWeb/Shop/scripts/typings/wuzhui.d.ts' },

                    { src: ['release/wuzhui.js'], dest: '../node_auth/src/client/js/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: '../node_auth/src/client/js/typings/wuzhui.d.ts' },
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

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['shell', 'copy']);

};