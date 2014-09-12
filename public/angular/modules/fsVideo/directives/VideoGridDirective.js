'use strict';

var fsVideoGridTemplate = require('../views/videoGridDirective.html');
var $ = require('jquery');

var VideoGridDirective = function($http, VideoGridPlayer, $compile) {
    return {
        restrict: "A",

        // The controller is initialized pre-linking phase just like a normal controller.
        controller: ['$scope', function($scope) {

        }],
        scope: true,
        link: function (scope, iElement, iAttrs, ctrl) {
            var hoverTimer = null;

            // Compile Popover
            iElement.append(fsVideoGridTemplate);
            $compile(iElement.contents())(scope);

            $(iElement).hover(function(e) {
                clearTimeout(hoverTimer);
                var $video = $('video', iElement);

                hoverTimer = setTimeout(function() {
                    VideoGridPlayer.init($video, scope.video);
                    VideoGridPlayer.play();
                }, 750);

            }, function(e) {
                clearTimeout(hoverTimer);
                var $video = $('video', iElement);
                VideoGridPlayer.stop();
            });
        }
    }
};

module.exports = VideoGridDirective;