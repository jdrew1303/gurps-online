/**
 * Created by lelabo on 18/09/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Advantage', new Schema({
    name            : String,
    haslevel        : Boolean,
    cost            : Number,
    description     : String,
    info            : String,
}));