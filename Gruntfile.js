var release_dir = 'release';

module.exports = function (grunt) {

    let pkg = grunt.file.readJSON('package.json');

    let banner = `
/*!
 * WUZHUI v${pkg.version}
 * https://github.com/ansiboy/WuZhui
 *
 * Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 * Licensed under the MIT License.
 *
 */
`

    var config = {

        babel: {
            source: {
                options: {
                    sourceMap: false,
                    presets: ["es2015"],
                },
                files: [{
                    src: [`out/wuzhui.js`],
                    dest: `out/wuzhui.es5.js`
                }]
            }
        },
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
                    port: 2219,
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
            release: {
                files: [{ src: 'out/wuzhui.d.ts', dest: 'release/wuzhui.d.ts' }]
            },
            docs: {
                files: [
                    { expand: true, cwd: 'release', src: ['wuzhui.js', 'wuzhui.d.ts'], dest: 'docs/js' }
                ]
            }
        },
        concat: {
            wuzhui: {
                options: {
                    banner
                },
                src: ['out/wuzhui.js'],
                dest: 'release/wuzhui.js'
            },
            wuzhui_min: {
                options: {
                    banner
                },
                src: ['out/wuzhui.min.js'],
                dest: 'release/wuzhui.min.js'
            }
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
        uglify: {
            out: {
                options: {
                    mangle: false
                },
                files: [{
                    src: `out/wuzhui.es5.js`,
                    dest: `out/wuzhui.min.js`
                }]
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

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['shell', 'babel', 'uglify', 'concat', 'copy:release']);// 'copy:docs', 
    grunt.registerTask('run', ['connect', 'watch']);
};