window.angular.module('jts.directives', [])
    .directive('validPasswordC', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var noMatch = viewValue != scope.contact.password.$viewValue
                    ctrl.$setValidity('noMatch', !noMatch)
                })
            }
        };
    })
    .directive('uniqueEmail', ['Usuario', function (Users) {
        return {
            require:'ngModel',
            restrict:'A',
            link:function (scope, el, attrs, ctrl) {

                //TODO: We need to check that the value is different to the original

                //using push() here to run it as the last parser, after we are sure that other validators were run
                ctrl.$parsers.push(function (viewValue) {

                    if (viewValue) {
                        Users.query({email:viewValue}, function (users) {

                            if (users.email == null) {
                                ctrl.$setValidity('uniqueEmail', true);
                            } else {
                                ctrl.$setValidity('uniqueEmail', false);
                            }
                        });
                        return viewValue;
                    }
                });
            }
        };
    }])
    .directive('receptorEmail', ['Receptor', function (Users) {
        return {
            require:'ngModel',
            restrict:'A',
            link:function (scope, el, attrs, ctrl) {

                //TODO: We need to check that the value is different to the original

                //using push() here to run it as the last parser, after we are sure that other validators were run
                ctrl.$parsers.push(function (viewValue) {

                    if (viewValue) {
                        Users.query({email:viewValue}, function (users) {

                            scope.usuarios = users;
                        });
                        return viewValue;
                    }
                });
            }
        };
    }])
    .directive('scrollItem',function(){
        return{
            restrict: "A",
            link: function(scope, element, attributes) {
                if (scope.$last){
                    scope.$emit("Finished");
                }
            }
        }
    })
    .directive('scrollIf', function() {
        return{
            restrict: "A",
            link: function(scope, element, attributes) {
                scope.$on("Finished",function(){
                    var chat_height = element.outerHeight();
                    console.log(chat_height);
                    element.scrollTop(chat_height);
                });
            }
        }
    })
    .directive('stickyNote', function(socket) {
        var linker = function(scope, element, attrs) {
            element.draggable({
                stop: function(event, ui) {
                    socket.emit('moveNote', {
                        id: scope.note.id,
                        x: ui.position.left,
                        y: ui.position.top
                    });
                }
            });

            socket.on('onNoteMoved', function(data) {
                // Update if the same note
                if(data.id == scope.note.id) {
                    element.animate({
                        left: data.x,
                        top: data.y
                    });
                }
            });

            // Some DOM initiation to make it nice
            element.css('left', '10px');
            element.css('top', '50px');
            element.hide().fadeIn();
        };

        var controller = function($scope) {
            // Incoming
            socket.on('onNoteUpdated', function(data) {
                // Update if the same note
                if(data.id == $scope.note.id) {
                    $scope.note.title = data.title;
                    $scope.note.body = data.body;
                }
            });

            // Outgoing
            $scope.updateNote = function(note) {
                socket.emit('updateNote', note);
            };

            $scope.deleteNote = function(id) {
                $scope.ondelete({
                    id: id
                });
            };
        };

        return {
            restrict: 'A',
            link: linker,
            controller: controller,
            scope: {
                note: '=',
                ondelete: '&'
            }
        };
    });

