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
        // 通过connect任务，创建一个静态服务器
        connect: {
            www: {
                options: {
                    // 服务器端口号
                    port: 2218,
                    // 服务器地址(可以使用主机名localhost，也能使用IP)
                    // hostname: '192.168.1.7',
                    hostname: '0.0.0.0',
                    keepalive: true,
                    // livereload: 17024,
                    // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                    base: 'docs',
                    open: true,
                    // protocol: 'https'
                }
            }
        },
        copy: {
            docs: {
                files: [
                    { src: ['release/wuzhui.js'], dest: 'docs/js/wuzhui.js' },
                    { src: ['release/wuzhui.d.ts'], dest: 'docs/js/wuzhui.d.ts' },
                ]
            }
            // release_test: {
            //     files: [
            //         { src: ['release/wuzhui.js'], dest: 'test/scripts/wuzhui.js' },
            //         { src: ['release/wuzhui.d.ts'], dest: 'test/scripts/typings/wuzhui.d.ts' },

            //         { src: ['release/wuzhui.js'], dest: '../ShopCloud/AdminWeb/src/scripts/wuzhui.js' },
            //         { src: ['release/wuzhui.d.ts'], dest: '../ShopCloud/AdminWeb/src/scripts/typings/wuzhui.d.ts' },

            //         // { src: ['release/wuzhui.js'], dest: '../ShopCloud/AdminWeb/Shop/scripts/wuzhui.js' },
            //         // { src: ['release/wuzhui.d.ts'], dest: '../ShopCloud/AdminWeb/Shop/scripts/typings/wuzhui.d.ts' },

            //         { src: ['release/wuzhui.js'], dest: '../node_auth/src/client/js/wuzhui.js' },
            //         { src: ['release/wuzhui.d.ts'], dest: '../node_auth/src/client/js/typings/wuzhui.d.ts' },
            //     ]
            // },
            // test_release: {
            //     files: [
            //         { expand: true, src: ['test/**/*.html'], dest: release_dir },
            //         { expand: true, src: ['test/scripts/**/*.js'], dest: release_dir },
            //         { expand: true, src: ['test/content/**/*.css'], dest: release_dir },
            //     ]
            // },
        },
        less: {
            css: {
                options: {
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    src: ['docs/css/*.less'],
                    ext: '.css'
                },]
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: 17024 //监听前面声明的端口  35729
                },
                files: [
                    // `out/es6/**/*`
                ]
            }
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['shell', 'copy']);
    grunt.registerTask('run', ['connect', 'watch']);
};