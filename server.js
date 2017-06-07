var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/test";
var User = require('./model/user');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
// configure app to use bodyParser()
// this will let us get the data from a POST app.use(bodyParser.urlencoded({ extended: true })); app.use(bodyParser.json());
var port = process.env.PORT || 8080;        // set our port
var router = express.Router();     // instance of the express Router

router.get('/', function(req, res) {
     res.json({ message: 'Welcome to my web service.' });    
});

// middleware to use for all requests
router.use(function(req, res, next) {
     // do logging
     console.log('Routing is working.');
     next(); // make sure we go to the next routes
});

// Connect to MongoDB database
mongoose.connect(url, function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + url);
  }
});

router.route('/users')
	.get(function(req,res){
		User.find(function(err, users){
			if(err)
				res.send(err);
			if(res.json == 'null') {
				console.log('Invalid request parameters');
				res.json({'result':'error','message':'Invalid request parameters'});
			}
			if(typeof res == 'undefined')
				res.json({'result':'error','message':'User not found'});
			res.json(users);
		});
	});
//setting cors
var originsWhitelist = [
  'http://localhost:80/Angular'      //this is my front-end url for development
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//use cors
app.use(cors(corsOptions));

/*app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});*/

// Register the routes
app.use('/api', router);

// Listens to port
var listen = app.listen(port);

console.log('Server on port ' + port);

module.exports = app;
