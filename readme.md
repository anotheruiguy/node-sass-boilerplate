# Steps used to create this project

## Run the following steps inside a clean directory

Not sure if you are in the same boat as I, but I could not find any good resource out there that pulled this all together. So here is a step-by-step tutorial for creating a Node.js app from scratch, adding in Grunt and then Node-Sass. Yeah, try and find good docs on Node-Sass alone :(

Hope this is of help!

#### Create your Node.js project
* `$ npm init` - create a clean node project
* **NOTE**: update the `package.json` file to to add `"private": true,` so that your project is not globally distributed as a npm app. Example: 

		"version": "0.1.0",
		"private": true,
		"description": "This is a new boilerplate project",


#### Install Express
* `$ npm install --save express` - install the Express package and save to your `package.json` file


#### Install Grunt
* `$ npm install --save-dev grunt` - install the Grunt package and save to your `package.json` file

##### Grunt dependencies

Depending on your setup, you may or may not have the `coffee-script` package installed. Run to install globally:

	$ npm install -g coffee-script

If you only want to add to this project:

	$ npm install --save-dev coffee-script


#### Set up skeleton project framework
* `$ mkdir public` - at the root of the project, crate a new 'public' directory
* `$ mkdir public/stylesheets` - create stylesheets directory within the public directory


#### Get the app started
* `$ touch app.js` - create the core application `.js` file
* add the following

		// set variables for environment
		var express = require('express');
		var app = express();
		var path = require('path');

		// Set server port
		app.listen(4000);
		console.log('server is running');


#### Install template language
* `$ npm install --save ejs` - to install ejs  -- or --
* `$ npm install --save jade` - to install jade
* `$ mkdir views` - create views directory for template views


#### Update the app.js file

Add the following above setting the server port

```
// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
// use either jade or ejs
app.set('view engine', 'jade'); 

// instruct express to server up static assets
app.use(express.static('public'));
```


#### Make a home page
* **NOTE**: ALL routes need to come **BEFORE** `app.listen(port);`
* update `app.js` to reflect template being used per the route
* `$ cd views` where all view templates will live
* `$ touch views/index.jade` - create base index file

On your new `index.jade` file, add the following: 

	!!! 5
	html
	  head
	    meta(charset='utf-8')
	    meta(http-equiv='X-UA-Compatible', content='IE=edge')
	    title
	    meta(name='description', content='')
	    meta(name='viewport', content='width=device-width, initial-scale=1')
	    link(rel='stylesheet', href='stylesheets/application.css')
	  body
	    h1 This is a heading 1
	    h2 This is a heading 2
	    p Hello world! This is HTML5 Boilerplate.
	    
	    script(src='//localhost:35729/livereload.js') //- to use Livereload


#### Add Livereload
Just before the `</body>` in your template file, be sure to add in the script for LiveReload

	script(src='//localhost:35729/livereload.js')


#### Add routes
Open `app.js` and crate root route that points to that template file

	// set routes
	app.get('/', function(req, res) {
	  res.render('index');
	});

#### Install Grunt-Sass
* `npm install --save-dev grunt-sass` - install grunt-sass


#### Add Sass to the project
* `mkdir sass` - create Sass directory in the root of the project


#### Create Gruntfile
`$ touch gruntfile.js` - create a new Gruntfile in the root of your project, add the following code to the empty file

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


#### Install Grunt Watch
* `npm install grunt-contrib-watch --save-dev` - install Grunt watcher and save as a Dev resource
* Add the following to `gruntfile.js` within the `grunt.initConfig` function

Add the `livereload: true` option so that LiveReload will work on your project

	watch: {
      source: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      }
    }


#### Our desired file structure

	|- node_modules/
	|- public/
	|--- stylesheets/
	|- sass/
	|- views/


## Get things running

Now that you have a bare bones project set up, we need to get things running. Typically I will be running three terminal windows/tabs for this.

* user terminal for file navigation
* run Node server `$ node app.js`
* run grunt server `$ grunt watch`

Now you should be able to navigate to `http://localhost:3000/` and see your project running. Run `PORT=4000 node app.js` to listen on a different port.


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

* `$ gem install bourbon` or `sudo gem install bourbon` (if you are not running RVM)
* `$ cd sass/lib` change directories to the new Sass lib directory
* `$ bourbon install` to install the library
* Open the `style.scss` file and add `@import "lib/bourbon/bourbon";`


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

## Deploy to Heroku

The Heroku Dev Center has a great article on ["Getting Started with Node.js on Heroku"](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

The tl;dr version (assuming you already have the Heroku Toolbelt):

1. Add a `Procfile` to declare the process type. Our `Procfile` should contain a single line: `web: node app.js`
2. Create a new Heroku app and add it as a Git remote: `heroku create`
3. Deploy: `git push heroku master`
4. Visit your new app: `heroku open`

### Compiling your Sass on deploy

Checking compiled CSS into version control isn't the most evil thing a developer could do, but it's close. So how do you compile your Sass into CSS *and* deploy it?

1. Include `grunt-cli` in your `package.json`: `npm install --save-dev grunt-cli`
2. Add a [`postinstall`](https://npmjs.org/doc/scripts.html) "scripts" step to `package.json`. It should look something like this:

        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "postinstall": "./node_modules/.bin/grunt"
        },

3. Previously, we installed Grunt and Grunt-Sass in the `devDependencies` group in `package.json`, which won't work because Heroku runs `npm install --production` during deployment. The `--production` flag skips the `devDependencies` group. So we need to move grunt and Grunt-Sass to the `dependencies` group instead:

        "dependencies": {
          "grunt": "~0.4.1",
          "grunt-sass": "~0.8.0",
          ...
        },
        "devDependencies": {
          "grunt-contrib-watch": "~0.5.3",
          "grunt-cli": "~0.1.11"
        }

4. Now, when you `git push heroku` Heroku will compile your Sass.
