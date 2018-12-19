module.exports = function (grunt) {

    let build_dir = 'out';
    let release_dir = 'dist';
    let pkg = grunt.file.readJSON('package.json');

    let license = `
/*!
 * WUZHUI v${pkg.version}
 * https://github.com/ansiboy/WuZhui
 *
 * Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 * Licensed under the MIT License.
 *
 */`

    let lib_name = 'wuzhui'
    let lib_js_banner = `
 ${license}
 (function(factory) { 
     if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') { 
         // [1] CommonJS/Node.js 
         var target = module['exports'] || exports;
         var mod = factory(target, require);
         Object.assign(target,mod);
     } else if (typeof define === 'function' && define['amd']) {
         define(factory); 
     } else { 
         factory();
     } 
 })(function() {
 `;

    let lib_js_footer =
        `\n\window[\'${lib_name}\'] = window[\'${lib_name}\'] || ${lib_name} \n\
                      \n return ${lib_name};\n\
      });`

    var config = {
        babel: {
            source: {
                options: {
                    sourceMap: false,
                    presets: ["es2015"],
                },
                files: [{
                    src: [`${build_dir}/${lib_name}.js`],
                    dest: `${release_dir}/${lib_name}.es5.js`
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
            docs: {
                files: [
                    { expand: true, cwd: release_dir, src: [`${lib_name}.js`, `${lib_name}.d.ts`], dest: 'docs/js' }
                ]
            }
        },
        concat: {
            es6: {
                options: {
                    banner: lib_js_banner,
                    footer: lib_js_footer,
                },
                src: [`${build_dir}/${lib_name}.js`],
                dest: `${release_dir}/${lib_name}.js`
            },
            declare: {
                options: {
                    banner: `
/// <reference path="../out/${lib_name}.d.ts"/>

declare module "maishu-${lib_name}" { 
    export = ${lib_name}; 
}`,
                },
                src: [],
                dest: `${release_dir}/${lib_name}.d.ts`
            }
        },
        uglify: {
            out: {
                options: {
                    mangle: false
                },
                files: [{
                    src: `${release_dir}/${lib_name}.es5.js`,
                    dest: `${release_dir}/${lib_name}.min.js`
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

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build', ['shell', 'concat', 'babel', 'uglify', 'copy']);
    grunt.registerTask('run', ['connect', 'watch']);
};