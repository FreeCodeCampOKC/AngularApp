module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    //concat all files
    concat: {
      options: {
      	stripBanners: true,
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
      },
      	js:{
        	src: ['public/controllers/*.js','public/services/*.js'],
        	dest: 'public/js/<%= pkg.name %>.js',
        },
        css: {
        	src: ['public/css/*.css', '!public/css/<%= pkg.name %>.css'],
        	dest: 'public/css/<%= pkg.name %>.css',
        },
    },
    //watch some of these files
    watch:{
    	js:{
    		files:['gruntfile.js','public/controllers/*.js','public/services/*.js'],
    		tasks:['jshint','concat:js','mochaTest'],
        options:{
          livereload:true
        },
    	},
    	css:{
    		files:['public/css/styles.css'],
    		tasks:['concat:css'],
        options:{
          livereload:true,
        },
    	},
    	server:{
    		files:['server/*/*.js'],
    		tasks:['jshint','mochaTest'],
    		options:{
    			interrupt:true,
          livereload:true,
    		},
    	},
    	tests:{
    		files:['./test/*.js','./karma/*.js','./test/*.html'],
    		tasks:['jshint','mochaTest']
    	},

    },

    //check these files for valid javascripts
    jshint:{
    	options:{
    		esnext:true,
    	},
    	beforeconcat: ['public/*/*.js'],
    	afterconcat:['public/js/<%= pkg.name %>.js','./test/*.js','./server/*/*.js','!./*/*.mock.js'],
    	
    },

    //concurrent stuffs
    concurrent:{
    	dev:{
    		tasks:['nodemon','watch','mochaTest','open'],
    	},
    	options: {
      		logConcurrentOutput: true,
    	},
    },

    //load that server bruh
    nodemon:{
    	dev:{
    		script:'./server/server.js'
    	},
    },
    open: {
      dev: {
        url: 'http://localhost:3000'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/*.js'],
      }
    },
  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');


  // Default task(s).
  grunt.registerTask('default', ['concurrent']);

};