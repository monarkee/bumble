'use strict';

var VideoClipCtrl = require('kombucha/kombucha/angular/modules/fsVideo/controllers/VideoClipCtrl.js'),
    VideoClipStub = require('kombucha/kombucha/angular/modules/fsVideo/stubs/VideoClipStub.js');

describe("Controller: VideoClipCtrl", function() {

    var ctrl;
    var scope;

    beforeEach(function() {
        scope = {};
        ctrl = new VideoClipCtrl(scope, VideoClipStub);
    });

    it("has video scope variable", function() {
        expect(scope.video).toBe(VideoClipStub);
    });
});