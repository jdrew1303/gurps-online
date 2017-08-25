/**
 * Created by lelabo on 25/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Posture', new Schema({
    name            : String,
    attack          : {type: Number, default: 0},
    defense         : {type: Number, default: 0},
    target          : {type: Number, default: 0},
    movement        : {type: Number, default: 0},
}));