/**
 * Created by Victor-BookPro on 30/12/13.
 */

var mongoose = require('mongoose'),
    Graphic = mongoose.model('Graphic'),
    _ = require('underscore');

exports.list = function(req, res) {
    Graphic.find({}, function(err, teams) {
        res.json(teams);
    });
}


exports.update = function(req, res){
    var graphic = new Graphic(req.body);
    Graphic.update({ _id: graphic.id }, {votes: graphic.votes}, function (err, numberAffected, raw) {
        var socketIO = global.io;
        socketIO.sockets.emit('graphic:updated', graphic);
        res.json(true);
    });
}
