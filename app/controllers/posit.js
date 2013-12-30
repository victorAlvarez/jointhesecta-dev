/**
 * Created by Victor-BookPro on 28/12/13.
 */

exports.iniciarPosit = function (req, res, next) {
    console.log('Entramos en POSIT servidor');

    var io = global.io;

    var _id =  req.user._id;
    var socketid = global.posit[_id];

    socketid.on('createNote', function(data) {
        socketid.broadcast.emit('onNoteCreated', data);
    });

    socketid.on('updateNote', function(data) {
        socketid.broadcast.emit('onNoteUpdated', data);
    });

    socketid.on('moveNote', function(data){
        socketid.broadcast.emit('onNoteMoved', data);
    });

    socketid.on('deleteNote', function(data){
        socketid.broadcast.emit('onNoteDeleted', data);
    });

    socketid.on('disconnect', function () {
        console.log('desconectado');
        if (global.posit[_id]) {
            console.log('Antes de eliminar el socket: ' + global.posit[_id]);
            delete global.posit[_id];
            console.log('Despues de eliminar el socket: ' + global.posit[_id]);
        }
    });

    res.jsonp('entra');
}
