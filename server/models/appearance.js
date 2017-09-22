/**
 * Created by lelabo on 18/09/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Appearance', new Schema({
    name            : String,
    cost            : Number,
    attract         : Number,
    reaction        : Number,
}));