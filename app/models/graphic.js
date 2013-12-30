/**
 * Created by Victor-BookPro on 30/12/13.
 */

var mongoose = require('mongoose')
    , config = require('../../config/config')
    , Schema = mongoose.Schema

var TeamSchema = new Schema({
    code: String,
    name: String,
    urlImage: String,
    votes: {type: Number, default: 0}
})

mongoose.model('Graphic', TeamSchema)