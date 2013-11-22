
// set variables for environment
var express = require('express');
var app = express();
var path = require('path');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // replace with whatever template language you desire
// instruct express to server up static assets
app.use(express.static('public'));


// Set up site routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/foo', function(req, res) {
  res.render('something');
});


// Set server port
app.listen(4000);
console.log('server is running');
