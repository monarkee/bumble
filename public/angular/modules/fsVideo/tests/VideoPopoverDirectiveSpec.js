'use strict';

//var angular = require('angular');
var fsVideo = require('kombucha/kombucha/angular/modules/fsVideo');
var mocks = require('angular-module-mocks');
var VideoGridListStub = require('kombucha/kombucha/angular/modules/fsVideo/stubs/VideoGridListStub.js');
var $ = require('jquery');

//    VideoClipStub = require('kombucha/kombucha/angular/modules/fsVideo/stubs/VideoClipStub.js');

describe("Directive: VideoPopoverDirective", function() {

    var scope, elem, html

    beforeEach(function() {
       angular.mock.module('filmsupply.video');
       console.log = jasmine.createSpy()
    });

    beforeEach(function() {
        angular.mock.inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.video = VideoGridListStub[0];
            html = '<div ng-fs-video-popover ui-sref="video.detail" ng-model="video" video-id="{{ video.id }}" ng-mouseenter="active = true" ng-mouseleave="active = false"></div>';

            elem = $compile(html)(scope);
            scope.$digest();
        });
    })

    it("should populate html on mouseenter", function() {
        $(elem).trigger('mouseenter');
        expect($(elem).find('video').length).toBe(1);
    });

    it("should set popoverLeft var to false by default", function() {
        var isolateScope = elem.scope();
        $(elem).trigger('mouseenter');
        expect(isolateScope.popoverLeft).toBe(false);
    });

    it("should set popoverTimer timer null on initialization", function() {
        var isolateScope = elem.scope();
        expect(isolateScope.popoverTimer).toBeDefined();
    });

    it("should set popoverTimer interval on mouseenter", function() {
        var isolateScope = elem.scope();
        $(elem).trigger('mouseenter');
        expect(isolateScope.popoverTimer).toBeGreaterThan(0);
    });

    it("should clear popover timer on mouseleave", function() {
        var isolateScope = elem.scope();
        $(elem).trigger('mouseenter');
        $(elem).trigger('mouseleave');
        expect(isolateScope.popoverTimer).toBeNull()
    });

    it("should fade out popover on mouseleave", function() {
        spyOn($.fn, 'fadeOut');
        var isolateScope = elem.scope();
        $(elem).trigger('mouseenter');
        $(elem).trigger('mouseleave');
        expect($.fn.fadeOut).toHaveBeenCalled();
    });
});