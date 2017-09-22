/**
 * Created by lelabo on 18/09/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Skill', new Schema({
    name            : String,
    attribute       : { type: String, enum: ['ST', 'DX', 'IQ', 'HT']},
    difficulty      : { type: String, enum: ['Easy', 'Medium', 'Hard']},
    base            : { type: Number, default: 0},
    info            : String,
}));