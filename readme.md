# Steps used to create this project

## Run the following steps inside a clean directory

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
	* Add the following to the Gruntfile within the `grunt.initConfig`

			watch: {
		      source: {
		        files: ['sass/**/*.scss'],
		        tasks: ['sass'],
		        options: {
		          livereload: true,  // needed to run LiveReload
		        }
		      }
		    }

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

	* Just before the `</body>` in your template file, be sure to add in the script for LiveReload

			<script src="//localhost:35729/livereload.js"></script>

1. Our desired file structure

		|- node_modules/
		|- public/
		|--- stylesheets/
		|- sass/
		|- views/

## Get things running

Now that you have a bare bones project set up, we need to get things running. Typically I will be running three terminal windows/tabs for this.

1. user terminal for file navigation
1. run Node server `$ node app.js`
1. run grunt server `$ grunt watch`

Now you should be able to navigate to `http://localhost:4000/` and see your project running.

## Install a Sass framework

For this project I choose to use Thoughtbot's [Bourbon](http://bourbon.io/) library.

While this library is a Ruby Gem, this does not place a Ruby dependency on your project. The Gem installs a version of the Sass mixin library directly into your project.

Before installing the library, update your file structure to contain a `lib/` directory within your `sass/` directory.

	|- node_modules/
	|- public/
	|--- stylesheets/
	|- sass/
	|--- lib/
	|- views/

### Let's install Bourbon.

1. `$ gem install bourbon` or `sudo gem install bourbon` (if you are not running RVM)
1. `$ cd sass/lib` change directories to the new Sass lib directory
1. `bourbon install` to install the library
1. Open the `style.scss` file and add `@import "lib/bourbon/bourbon";`

### Install UI foundational framework

Within the `sass/` directory, we need to install a foundational directory framework to start constructing our site. I recommend the following:

	|- _buttons.scss
	|- _config.scss
	|- _forms.scss
	|- _modules.scss
	|- _reset.scss
	|- _typography.scss
	|- _vendors.scss
	|- application.scss
	|- buttons/
	|- colors/
	|- forms/
	|- layouts/
	|- lib/
	|- modules/
	|- ui_patterns/
	|- vendors/

In our `application.scss` file, we need to import a few files to get this started.

	// App Config - this is where most of your magic will happen
	// ---------------------------------------------------------
	@import "config";  // Editing the config file sets the theme for the project


	// Import core Sass libraries
	// ---------------------------------------------------------
	@import "lib/bourbon/bourbon";


	// Standard CSS reset stuff here
	// ---------------------------------------------------------
	@import "reset";

The reset I have included in this project is a modified version of Eric Meyer's reset plus some ideas from the HTML5 reset project. Additionally I have updated this reset to be more Sass driven using variables.

Next add the individual Sass files that will make up the base, module, vendor and layout portions of the project

	// Base
	@import "typography";
	@import "forms";
	@import "buttons";

	// UI Patterns and Modules
	// State is addressed within the component code itself
	@import "ui_patterns/manifest";
	@import "modules/manifest";

	// Vendor specific styles / modules
	@import "vendors/manifest";

	// Layouts
	@import "layouts/manifest";

This will complete the initial set up of the bare bones project. From here you will be able to customize the Sass to fit the design of your project.
