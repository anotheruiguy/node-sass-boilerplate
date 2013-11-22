# Steps used to create this project

### Run the following steps inside a clean directory

1. Create your Node.js project
	* `npm init` - create a clean node project
	* **NOTE**: be sure to add `"private": true,` to the `package.json` so that your project is not globally distributed as a npm app

1. Install Express
	* `npm install --save express` - install the Express package and save to your `package.json` file

1. Install Grunt
	* `npm install --save-dev grunt` - install the Grunt package and save to your `package.json` file

1. Install Grunt-Sass
	* `npm install --save-dev grunt-sass` - install grunt-sass

1. Set up skeleton project framework
	* `mkdir public` - at the root of the project, crate a new 'public' directory
	* `touch public/index.html` - create static file in the public directory and add some simple 'Hello World' content
	* `mkdir public/stylesheets` - create stylesheets directory within the public directory
	* `mkdir sass` - create Sass directory in the root of the project
	
1. Create Gruntfile
	* `touch gruntfile.js` - create a new Gruntfile in the root of your project, add the following code to the empty file

			module.exports = function(grunt) {
			  grunt.initConfig ({
			    sass: {
			      dist: {
			        files: {
			          'public/stylesheets/style.css' : 'sass/style.scss'
			        }
			      }
			    }
			
			  grunt.loadNpmTasks('grunt-sass');
			  grunt.registerTask('default', ['sass']);
			};

1. Install Grunt Watch
	* `npm install grunt-contrib-watch --save-dev` - install Grunt watcher and save as a Dev resource

1. Install template language
	* `npm install --save ejs` - to install ejs  -- or --
	* `npm install --save jade` - to install jade
	* `mkdir views` - create views directory for template views
	* `touch views/something.ejs` - create any view file   -- or --
	* `touch views/something.jade` - create any view file

1. Adding routes
	* **NOTE**: ALL routes need to come **BEFORE** `app.listen(4000);`
	* Remove all static `.html` files from the `public` directory
	* update `app.js` to reflect template being used per the route

			app.get('/foo', function(req, res) {
			  res.render('something');
			});

1. Create the 'home' page
	* `touch views/index.ejs` - create base index file
	* Open `app.js` and crate root route that points to that template file

			app.get('/', function(req, res) {
			  res.render('index');
			});
			
1. Our desired file structure	

		|- node_modules/
		|- public/
		|--- stylesheets/
		|- sass/
		|- views/