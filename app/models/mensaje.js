/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Mensaje Schema
 */
var MensajeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    receptor: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    asunto: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
MensajeSchema.path('asunto').validate(function(asunto) {
    return asunto.length;
}, 'El asunto no puede estar vacio');

/**
 * Statics
 */
MensajeSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Mensaje', MensajeSchema);