'use strict';

var VideoClipStub = {
    id: 1,
    img: "http://lorempixel.com/630/354/abstract/1",
    details: {
        description: "Stinky Goldfish in Tinfoil",
        duration: "00.29"
    },
    source: [
        "http://www.w3schools.com/html/mov_bbb.mp4",
        "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg"
    ],
    formats: [
        { type: "UHD", description: "Ultra High Definition", price: 200 },
        { type: "HD", description: "High Definition", price: 100 }
    ]
};

module.exports = VideoClipStub;