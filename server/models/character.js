/**
 * Created by lelabo on 25/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Character', new Schema({
    _owner          : { type: Schema.Types.ObjectId, ref: 'User' , default: null},
    name            : String,
    exp             : Number,
    freexp          : { type: Number, default: 0},
    campaign        : { type: Schema.Types.ObjectId, ref: 'Campaign' , default: null},
    status          : { type: String, enum: ['created', 'alive', 'campaign', 'dead'], default: 'created' },
    mind            : { type: String, enum: ['clear', 'stun', 'unconscious'], default: 'clear' },
    strength        : { type: Number, default: 10},
    dexterity       : { type: Number, default: 10},
    intelligence    : { type: Number, default: 10},
    health          : { type: Number, default: 10},
    handedness      : { type: String, enum: ['right-handed', 'left-handed', 'ambidexterity']},
    hp              : { type: Number, default: 10},
    will            : { type: Number, default: 10},
    fp              : { type: Number, default: 10},
    charisma        : { type: Number, default: 0},
    voice           : { type: Boolean, default: false},
    appearance      : { type: String, enum: ['Hideous', 'Ugly', 'Unattractive', 'Average', 'Attractive', 'Handsome', 'Very Handsome'], default: 'Average'},
    habits          : [{
        description    : String,
        type           : { type: String, enum: ['Minor', 'Intermediate', 'Major']},
    }],
    wealthfactor    : { type: SchemaTypes.Double, default: 1.0},
    statusbonus     : { type: Number, default: 0},
    reputations     : [{
        description     : String,
        bonus           : { type: Number, default: 0},
        default         : []
    }],
    advantages       : [{
        name: String,
        level: Number,
        default: []
    }],
    disadvantages    : [{name: String, default: []}],
    skills    : [{
        name: String,
        attr: Number,
        difficulty: Number,
        bonus: Number,
        info: String,
        cost: Number,
        default: []
    }],
    background: {type: String, default: ''},
    details: {type: String, default: ''},
    notes: {type: String, default: ''}
}));