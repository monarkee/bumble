'use strict';

var VideoGridPlayerService = require('kombucha/kombucha/angular/modules/fsVideo/services/VideoGridPlayerService.js');
var $ = require('jquery');

describe("Service: VideoGridPlayerService", function() {

    var service;
    var videoData;
    var options;
    var $videoObj;

    beforeEach(function() {
        service = new VideoGridPlayerService();

        $videoObj = $(document.createElement('video'));

        videoData = {
            id: 1,
            img: "http://lorempixel.com/270/150/abstract/6",
            source: ["http://www.w3schools.com/html/mov_bbb.mp4"],
            title: "Google #1",
            url: "http://www.google.com"
        };

        options = {
            muted: true,
            loop: true,
            poster: videoData.img
        };
    });

    afterEach(function() {
        service,
        videoData,
        options,
        $videoObj = null;
    });

    it("should have init() function", function() {
        expect(service.init).toBeDefined();
    });

    it ("should have setOptions(options) function", function() {
        expect(service.setOptions).toBeDefined();
    });

    it ("should have play() function", function() {
        expect(service.play).toBeDefined();
    });

    it ("should have pause() function", function() {
        expect(service.pause).toBeDefined();
    });

    it ("should have addSource() function", function() {
        expect(service.addSource).toBeDefined();
    });

    it ("should have hasSource() function", function() {
        expect(service.hasSource).toBeDefined();
    });

    it ("should have showSpinner() function", function() {
        expect(service.showSpinner).toBeDefined();
    });

    it ("should have hideSpinner() function", function() {
        expect(service.hideSpinner).toBeDefined();
    });

    it("should initialize function", function() {
        service.showSpinner = jasmine.createSpy("showSpinner Spy()");
        service.setOptions = jasmine.createSpy("setOptions Spy()");
        service.init($videoObj, videoData);

        expect(service.showSpinner).toHaveBeenCalled();
        expect(service.setOptions).toHaveBeenCalled();
    });

    it ("should set options", function() {
        service.$videoObj = $videoObj;
        service.setOptions(options);

        expect(service.$videoObj.get(0)).toMatch(options);
    });

    it ("should have play() method", function() {
        service.$videoObj = $videoObj;
        service.setOptions(options);

        expect(service.$videoObj.get(0).play).toBeDefined();
    });

    it ("should have pause() method", function() {
        service.$videoObj = $videoObj;
        service.setOptions(options);

        expect(service.$videoObj.get(0).pause).toBeDefined();
    });

    it ("should add one source element to video", function() {
        service.$videoObj = $videoObj;
        service.addSource(videoData.source);
        expect(service.$videoObj.find('source').length).toEqual(1);
    });

    it ("should add more than one source element to video", function() {
        service.$videoObj = $videoObj;
        videoData.source.push("http://www.w3schools.com/html/mov_bbb.ogg")
        service.addSource(videoData.source);
        expect(service.$videoObj.find('source').length).toEqual(2);
    });

    it ("should have source element", function() {
        service.$videoObj = $videoObj;
        service.addSource(videoData.source);
        expect(service.hasSource()).toBe(true);
    });
});