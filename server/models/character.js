/**
 * Created by lelabo on 25/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Character', new Schema({
    _owner          : { type: Schema.Types.ObjectId, ref: 'User' , default: null},
    name            : String,
    exp             : Number,
    campaign        : { type: Schema.Types.ObjectId, ref: 'Campaign' , default: null},
    status          : { type: String, enum: ['created', 'alive', 'campaign', 'dead'], default: 'created' },
    strength        : { type: Number, default: 10},
    dexterity       : { type: Number, default: 10},
    intelligence    : { type: Number, default: 10},
    health          : { type: Number, default: 10},
    handedness      : { type: String, enum: ['right-handed', 'left-handed', 'ambidexterity']},
    hp              : { type: Number, default: 10},
    will            : { type: Number, default: 10},
    fp              : { type: Number, default: 10},
}));