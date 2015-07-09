module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    var tempDir = '.dist';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        clean: {
            dist: 'dist',
            dist2: ".dist"
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true
                },
                src: 'src/less/kuma.less',
                dest: '.dist/<%= pkg.name %>.css'
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    relativeUrls: true
                },
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'src/less/theme',      // Src matches are relative to this path.
                        src: ['*.less'], // Actual pattern(s) to match.
                        dest: '.dist/theme/',   // Destination path prefix.
                        ext: '.css',   // Dest filepaths will have this extension.
                        extDot: 'first'   // Extensions in filenames begin after the first dot}

                    }
                ]
            }
        },

        csslint: {
            options: {
                csslintrc: 'less/.csslintrc'
            },
            dist: [
                '.dist/kuma.css',
                '.dist/kuma-theme.css'
            ]
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            minify: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: '.dist',      // Src matches are relative to this path.
                        src: ['**/*.css'], // Actual pattern(s) to match.
                        dest: 'dist',   // Destination path prefix.
                        ext: '.css',   // Dest filepaths will have this extension.
                        extDot: 'first'   // Extensions in filenames begin after the first dot}
                    }
                ]
            }
        },

        copy: {
            css: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: '.dist',      // Src matches are relative to this path.
                        src: ['**/*.css'], // Actual pattern(s) to match.
                        dest: 'dist',   // Destination path prefix.
                        ext: '-debug.css',   // Dest filepaths will have this extension.
                        extDot: 'first'   // Extensions in filenames begin after the first dot}
                    }
                ]
            }
        },

        watch: {
            less: {
                files: 'less/**/*.less',
                tasks: 'less'
            }
        },


        exec: {
            npmUpdate: {
                command: 'npm update'
            }
        }

    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.registerTask('default', ["clean", "less", "copy", "cssmin", "clean:dist2"]);

    grunt.registerTask('commonjs', 'Generate CommonJS entrypoint module in dist dir.', function () {
        console.log("commonjs");
    });

};
