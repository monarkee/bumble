'use strict';

var VideoGridListCtrl = require('kombucha/kombucha/angular/modules/fsVideo/controllers/VideoGridListCtrl.js'),
    VideoGridListStub = require('kombucha/kombucha/angular/modules/fsVideo/stubs/VideoGridListStub.js');

describe("Controller: VideoGridListCtrl", function() {

    var ctrl;
    var scope;

    beforeEach(function() {
        scope = {};
        ctrl = new VideoGridListCtrl(scope, VideoGridListStub);
    });

    it ("has video scope variable", function() {
        expect(scope.videos).toBeDefined();
        expect(scope.videos).toBe(VideoGridListStub);
    });
});