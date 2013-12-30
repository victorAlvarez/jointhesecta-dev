/**
 * Created by Victor-BookPro on 28/12/13.
 */

angular.module('jts.posit').controller('PositController', ['$scope', '$http', '$routeParams', '$location', 'Global', 'socket', function ($scope, $http, $routeParams, $location, Global, socket ) {
    $scope.global = Global;
    $scope.notes = [];
    var cargar = false;

    if (cargar == false) {
        var socket = io.connect('/modulos/posit', {'force new connection' : true});
        angular.element(document).ready(function () {
            socket.emit('addUserPosit', window.user);
            $http.get('/posit').success(function (data) {
                //$scope.name = data
                console.log(data);
            });
            cargar = true;
        });
    }

    // Incoming
    socket.on('onNoteCreated', function(data) {
        $scope.$apply(function () {
            $scope.notes.push(data);
        });
    });

    socket.on('onNoteDeleted', function(data) {
        $scope.$apply(function () {
            $scope.handleDeletedNoted(data.id);
        })
    });

    // Outgoing
    $scope.createNote = function() {
        var note = {
            id: new Date().getTime(),
            title: 'New Note',
            body: 'Pending'
        };

        $scope.notes.push(note);
        socket.emit('createNote', note);
    };

    $scope.deleteNote = function(id) {
        $scope.handleDeletedNoted(id);

        socket.emit('deleteNote', {id: id});
    };

    $scope.handleDeletedNoted = function(id) {
        var oldNotes = $scope.notes,
            newNotes = [];

        angular.forEach(oldNotes, function(note) {
            if(note.id !== id) newNotes.push(note);
        });

        $scope.notes = newNotes;
    }

    $scope.$on('$destroy', function (event) {
        socket.disconnect();
    });
}]);
