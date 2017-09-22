/**
 * Created by lelabo on 18/09/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Habit', new Schema({
    name            : String,
    description     : String,
    level           : { type: String, enum: ['Minor', 'Intermediate', 'Major']},
}));