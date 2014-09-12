var $ = require('jquery');

var VideoGridPlayer = function() { // Angular Dependancies would go here
    this.$videoObj = $();
    this.videoData = {};

    // Our Constructor
    this.init = function($videoObj, videoData) {
        this.$videoObj = $videoObj;
        this.videoData = videoData;
        var self = this;

        // Options
        var options = {
            muted: true,
            loop: true
        };

        // Add Options Attrs to Video Element
        this.setOptions(options);

        // Show Spinner Loader
        this.showSpinner();

        // Run some things once video is able to be played
        this.$videoObj.on('playing', function() {
            self.hideSpinner();
            self.showVideo();
        });

        // Run some things once video is able to be played
        this.$videoObj.on('emptied', function() {
            self.hideSpinner();
            self.hideVideo();
        });
    };

    this.setOptions = function(options) {
        var self = this;
        $.each(options, function(key, val) {
            self.$videoObj.prop(key, val);
        });
    };

    this.play = function() {
        if (!this.hasSource()) this.addSource(this.videoData.source);
        this.$videoObj.get(0).play();
    };

    this.pause = function() {
        this.$videoObj.get(0).pause();
    };

    this.stop = function() {
        if (this.$videoObj.get(0)) {
            this.$videoObj.get(0).load();
        }
    };

    this.addSource = function(source) {
        var self = this
        $.each(source, function(key, val) {
            var sourceElm = $("<source src='" + val + "'>");
            self.$videoObj.append(sourceElm);
        });
    };

    this.hasSource = function() {
        if ($('source', this.$videoObj).length > 0) return true;
        return false
    };

    this.showSpinner = function() {
        $('.spinner', this.$videoObj.parent()).fadeIn();
    }

    this.hideSpinner = function() {
        $('.spinner', this.$videoObj.parent()).fadeOut();
    }

    this.showVideo = function() {
        $('video', this.$videoObj.parent()).show();
    }

    this.hideVideo = function() {
        $('video', this.$videoObj.parent()).hide();
    }
}

module.exports = VideoGridPlayer;