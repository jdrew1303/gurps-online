/**
 * Created by lelabo on 11/04/17.
 */
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');


var config = require('./config'); // get our config file
var users = require('./routes/users');
var auth = require('./routes/auth');
var middleware = require('./routes/middleware');

var port = process.env.PORT || 4000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan('dev')); // LOG
app.use('/api/users', auth);
app.use('/api', middleware);
app.use('/api/users', users);

app.listen(port);
console.log("Server ready!");
