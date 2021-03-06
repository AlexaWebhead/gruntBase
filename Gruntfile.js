module.exports = function(grunt){

    // Theme path
    $themepath = 'content/';

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // 1. Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //validate html
        htmlhint: {
		    build: {
		        options: {
		        	// Force tags to have a closing pair
		            'tag-pair': true,
		            // Force tags to be lowercase
		            'tagname-lowercase': true,
		            // Force attribute names to be lowercase e.g. <div ID="header"> is invalid
		            'attr-lowercase': true,
		            // Force attributes to have double quotes rather than single
		            'attr-value-double-quotes': true,
		            // Force the DOCTYPE declaration to come first in the document
		            'doctype-first': true,
		            // Force special characters to be escaped
		            'spec-char-escape': true,
		            // Prevent using the same ID multiple times in a document
		            'id-unique': true,
		            // Prevent script tags being loaded in the body for performance reasons
		            'head-script-disabled': false,
		            // Prevent style tags. CSS should be loaded through css files
		            'style-disabled': true
		        },
		        src: ['index.html']
		    }
		},

        // Concatenate JS
        concat: {   
            dist: {
                src: [
                    $themepath + 'js/modernizr.custom.92469.js',     // Modernizr
                    $themepath + 'js/script.js'                      // Script
                ],
                dest: $themepath + 'js/build/production.js',
            }
        },

        // Uglify JS
        uglify: {
            build: {
                src: $themepath + 'js/build/production.js',
                dest: $themepath + 'js/build/production.min.js'
            }
        },

        // Image optimization
        imageoptim: {
          myTask: {
            options: {
              jpegMini: false,
              imageAlpha: true,
              quitAfter: true
            },
            src: ['content/img']
          }
        },

        //Compass
        compass: {                  // Task
		    dist: {                   // Target
		      	options: {              // Target options
		        	bundleExec: true,
                    relativeAssets: true,
                    cssDir: 'content/css',
                    sassDir: 'content/sass',
                    imagesDir: 'content/img',
                    javascriptsDir: 'content/js',
                    fontsDir: 'content/fonts',
                    assetCacheBuster: 'none',
                    require: [
                      'breakpoint',
                      'chunky_png', 
                      'sass-globbing', 
                      'singularitygs', 
                      'rgbapng', 
                      'toolkit',
                    ]
                }
		    },
            // Production
            /*prod: {
                options: {
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true,
                }
            }*/
		},

        // Minimize SVGs
        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false }
                ]
            },
            all: {                                        // Target
                files: [{                                 // Dictionary of files
                    expand: true,                         // Enable dynamic expansion.
                    cwd: 'img/',                       // Src matches are relative to this path.
                    src: ['**/*.svg'],                    // Actual pattern(s) to match.
                    dest: $themepath + 'img/',                      // Destination path prefix.
                    ext: '.svg'                           // Dest filepaths will have this extension.
                }]
            }
        },

        // SVG Sprites
        "svg-sprites": {
            "icons": {
                options: {
                    spriteElementPath: $themepath + "img/icons/svg",
                    spritePath: $themepath + "img",
                    cssPath: $themepath + "sass",
                    cssSuffix: "scss",
                    cssPrefix: "_sprite",
                    cssPngPrefix: ".no-svg",
                    prefix: "icon",
                    unit: 20
                }
            }
        },

        // PNG Sprites
        sprite:{

            icons: {
                src: $themepath + 'img/icons/*.png',
                destImg: $themepath + 'img/sprite-icons.png',
                destCSS: $themepath + 'sass/_sprite-icons.scss',
                // 'padding': 20,
            },

            // navigation: {
            //     src: 'images/nav/*.png',
            //     destImg: 'images/sprite-nav.png',
            //     destCSS: 'sass/_sprite-nav.scss',
            //     'padding': 20,
            // },
        },

        // Watch
        watch: {

            //Html
            html: {
		        files: ['index.html'],
		        tasks: ['htmlhint'],
                options: {
                    livereload: true,
                },
		    },

            // CSS
            css: {
		        files: [ '**/*.scss', ],
		        tasks: ['compass'],
                options: {
                    livereload: true,
                },
		    }
        }

    });

    // 3. Grunt tasks
    grunt.registerTask('default', [
    	'watch',
        'compass',
    	'htmlhint'
    ]);

};