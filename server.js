'use strict';

require('dotenv').config({
  silent: true
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var passport = require("passport");
var mongoose = require('mongoose');
require('./models/User');
require('./config/passport');
require('dotenv').config({silent:true});

if(process.env.NODE_ENV == 'test') {
mongoose.connect('mongodb://localhost/userauth-test');
}
else{
mongoose.connect(process.env.MONGOLAB);
}

app.set('views', './views');
app.engine('.html', require('ejs').renderFile);
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

passport.initialize();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var userRoutes = require('./Routes/UserRoutes');
app.use('/api/users', userRoutes);

app.get('/*', function(req, res) {
	res.render('index');
});


module.exports = app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});

// var server = app.listen(port, function() {
//   var host = server.address().address;
//   console.log('Example app listening at http://localhost:' + port);
// });
