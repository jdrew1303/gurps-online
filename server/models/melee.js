/**
 * Created by lelabo on 18/09/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Melee', new Schema({
    tl              : {type: Number, default: 0},
    name            : String,
    attack          : [{
        damage          : String,
        strength        : {type: Number, default: 0},
        category        : {type: Number, default: 0}
    }],
    cost            : {type: Number, default: 0},
    weight          : {type: Number, default: 0},
    skills          : [String],
    notes           : {type: String, default: ""},
}));