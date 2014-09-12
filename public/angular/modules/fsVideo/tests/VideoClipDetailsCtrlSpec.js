'use strict';

var VideoClipDetailsCtrl = require('kombucha/kombucha/angular/modules/fsVideo/controllers/VideoClipDetailsCtrl.js'),
    VideoClipStub = require('kombucha/kombucha/angular/modules/fsVideo/stubs/VideoClipStub.js');

describe("Controller: VideoClipDetailsCtrl", function() {

    var ctrl;
    var scope;

    beforeEach(function() {
        scope = {};
        ctrl = new VideoClipDetailsCtrl(scope, VideoClipStub);
    });

    it("has video scope variable", function() {
        expect(scope.video).toBe(VideoClipStub);
    });
});