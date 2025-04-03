module.exports = function(grunt){

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		

        requirejs: {
            compile: {
                options: {
                    baseUrl: "./js",
                    mainConfigFile: './js/main.js',
                    out: "../dist/js/main.min.js",
                    findNestedDependencies: true,
                    name: "main",
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false
                        }
                    }
                }
            }
        },

		/**
		 * Sass task
		 */

		sass:{
			dev: {
				options:{
					style: 'expanded',
					sourcemap: 'none',
				},
				files: {
					'compiled/style-human.css' : 'sass/style.scss'
				}
			},

			dist: {
				options:{
					style: 'compressed',
					sourcemap: 'none',
				},
				files: {
					'compiled/style.css' : 'sass/style.scss'
				}
			}
		},


		autoprefixer:{
			options:{
				browsers: ['last 2 versions']
			},
			//prefix all files
			multiple_files:{
				expand: true,
				flatten: true,
				src: 'compiled/*.css',
				dest:''
			}
		},

		
        /**
         * Browser Sync
         */

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'style.css',
                        '**/*.html',
                        '**/*.js'
                    ]
                },

                options: {
                    watchTask: true,
                    proxy: {
            			target: 'shugg.dev'
        			}
        			
                }
            }
        },

		/**
		 * Watch task
		 */
		 
		watch : {
			css: {
				files:'**/*.scss',
				tasks: ['sass', 'autoprefixer']
			}
		}

	});

    grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('default',['browserSync','watch', 'requirejs']);

}
