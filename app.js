// set variables for environment
var express = require('express');
var app = express();
var path = require('path');

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

// Set server port
app.listen(4000);
console.log('server is running');
