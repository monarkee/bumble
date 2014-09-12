'use strict';

var angular = require('angular');
var uirouter = require('angular-ui-router');

module.exports = angular.module('filmsupply.video', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        console.log('Film Supply - Video Module loaded')
    })
    // Controllers
    .controller('VideoGridListCtrl', require('./controllers/VideoGridListCtrl.js'))
    .controller('VideoClipCtrl', require('./controllers/VideoClipCtrl.js'))
    .controller('VideoClipDetailsCtrl', require('./controllers/VideoClipDetailsCtrl.js'))

    // Services
    .service('VideoGridPlayer', require('./services/VideoGridPlayerService.js'))

    // Directives
    .directive("ngFsVideoGrid", require('./directives/VideoGridDirective.js'))

    // Stub Data
    .value('VideoGridListStub', require('./stubs/VideoGridListStub.js'))
    .value('VideoClipStub', require('./stubs/VideoClipStub.js'));
