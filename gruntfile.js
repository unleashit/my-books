var bower_path = 'bower_components/',
    // bootstrap_csspath = bower_path + 'bootstrap-sass-official/assets/stylesheets/',
    // bootstrap_jspath = bower_path + 'bootstrap-sass-official/assets/javascripts/bootstrap/',
    source_stylesheets = 'app/css/',
    source_javascripts = 'app/js/',
    dest_stylesheets = 'dist/css/',
    dest_javascripts = 'dist/js/',
    proxyUrl = false; // important: change this to your server's url or 'false' for no proxy!

module.exports = function(grunt) {

    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: '*.html', dest: 'dist/'
                    }
                ]
            }
        },
        concat: {
            dist: {
                src: [
                    //source_javascripts + '**/*.js',
                    source_javascripts + 'utilFncs.js',
                    source_javascripts + 'app.js'

                ],
                dest: dest_javascripts + 'global.js'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 version', 'ie 9']
                },
            single_file: {
                options: {
                },
                src: dest_stylesheets + 'style.css',
                dest: dest_stylesheets + 'style.css'
            }
        },
        sass: {
            dist: {
                options: {
                    compass: false,
                    sourceMap: true
                },
                files: {
                    'dist/css/style.css': 'app/scss/style.scss'
                }
            }
        },
        uglify: {
            build: {
                src: dest_javascripts + 'global.js',
                dest: dest_javascripts + 'global.min.js'
            }
        },
        responsive_images: {
            myTask: {
                options: {
                    engine: 'im',
                    sizes: [{
                        name: 'small',
                        width: "25%",
                        quality: 80
                    },{
                        name: "medium",
                        width: "65%",
                        quality: 65
                    },{
                        name: "large",
                        width: "100%",
                        quality: 60
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'images/source',
                    src: ['**/*.{png,jpg,gif}'],
                    custom_dest: 'images/resized/{%= name %}/'
                }]
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 4
                },
                files: [{
                    expand: true,
                    cwd: 'images/source',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images'
                }]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images/svg/source',
                    src: ['**/*.svg'],
                    dest: 'images/svg'
                }]
            }
        },
        sprite:{
            all: {
                src: 'images/sprites/*.png',
                dest: 'images/spritesheet.png',
                destCss: dest_stylesheets + '_sprites.scss',
                imgPath: 'spritesheet.png',
                cssVarMap: function (sprite) { sprite.name = 'icon-' + sprite.name;}
            }
        },
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: source_javascripts + '**/*.js',
                //tasks: ['concat'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: 'app/scss/**/*.scss',
                tasks: ['sass']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'app/scss/**/*.scss',
                        source_javascripts + '**/*.js',
                        'app/*.html'
                    ]},
                options: {
                    proxy: proxyUrl,
                    port: 63342,
                    watchTask: true,
                    injectChanges: true,
                    ghostMode: {
                        clicks: false,
                        scroll: false,
                        links: true,
                        forms: true
                    }
                }
            }
        }
    });

   // grunt.loadNpmTasks('grunt-spritesmith');

    // grunt.registerTask('firstrun', ['copy', 'sass', 'concat', 'uglify']);
   // grunt.registerTask('images', ['newer:imagemin', 'newer:svgmin', 'newer:sprite']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'newer:concat', 'newer:uglify', 'newer:copy']);
    grunt.registerTask('default', ["browserSync", "watch"]);
};