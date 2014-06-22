// set variables for environment
var express = require('express');
var app = express();
var path = require('path');

// Displays server log in the CLI
app.use(express.logger());

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
// use either jade or ejs
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));


// set routes
app.get('/', function(req, res) {
  res.render('index');
});


// With the express server and routes defined, we can start to listen
// for requests. Heroku defines the port in an environment variable.
// Our app should use that if defined, otherwise 4000 is a pretty good default.
var port = process.env.PORT || 4000;
app.listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");
