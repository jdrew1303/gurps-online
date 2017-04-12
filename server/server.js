/**
 * Created by lelabo on 11/04/17.
 */
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt     = require('jsonwebtoken');

var config = require('./config'); // get our config file
var users = require('./routes/users');
var auth = require('./routes/auth');
var middleware = require('./routes/middleware');

var port = process.env.PORT || 4000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route
// app.get('/', function(req, res) {
//     res.send('Hello! The API is at http://localhost:' + port + '/api');
// });
app.use('/api', auth);
app.use('/api', middleware);
app.use('/api', users);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
