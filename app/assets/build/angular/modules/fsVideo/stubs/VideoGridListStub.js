'use strict';

var VideoGridListStub = [
    { "id": 1, "url": "http://www.google.com", "title": "Google #1", "img": "http://lorempixel.com/270/145/abstract/1", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4", "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg" ]},
    { "id": 2, "url": "http://www.google.com", "title": "Google #2", "img": "http://lorempixel.com/270/145/abstract/2", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 3, "url": "http://www.google.com", "title": "Google #3", "img": "http://lorempixel.com/270/145/abstract/3", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 4, "url": "http://www.google.com", "title": "Google #4", "img": "http://lorempixel.com/270/145/abstract/4", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 5, "url": "http://www.google.com", "title": "Google #5", "img": "http://lorempixel.com/270/145/abstract/5", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 6, "url": "http://www.google.com", "title": "Google #6", "img": "http://lorempixel.com/270/145/abstract/6", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 7, "url": "http://www.google.com", "title": "Google #7", "img": "http://lorempixel.com/270/145/abstract/7", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 8, "url": "http://www.google.com", "title": "Google #8", "img": "http://lorempixel.com/270/145/abstract/8", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 9, "url": "http://www.google.com", "title": "Google #9", "img": "http://lorempixel.com/270/145/abstract/9", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 10, "url": "http://www.google.com", "title": "Google #10", "img": "http://lorempixel.com/270/145/abstract/10", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 11, "url": "http://www.google.com", "title": "Google #1", "img": "http://lorempixel.com/270/145/nature/1", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4", "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg" ]},
    { "id": 12, "url": "http://www.google.com", "title": "Google #2", "img": "http://lorempixel.com/270/145/nature/2", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 13, "url": "http://www.google.com", "title": "Google #3", "img": "http://lorempixel.com/270/145/nature/3", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 14, "url": "http://www.google.com", "title": "Google #4", "img": "http://lorempixel.com/270/145/nature/4", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 15, "url": "http://www.google.com", "title": "Google #5", "img": "http://lorempixel.com/270/145/nature/5", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 16, "url": "http://www.google.com", "title": "Google #6", "img": "http://lorempixel.com/270/145/nature/6", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 17, "url": "http://www.google.com", "title": "Google #7", "img": "http://lorempixel.com/270/145/nature/7", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 18, "url": "http://www.google.com", "title": "Google #8", "img": "http://lorempixel.com/270/145/nature/8", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 19, "url": "http://www.google.com", "title": "Google #9", "img": "http://lorempixel.com/270/145/nature/9", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 20, "url": "http://www.google.com", "title": "Google #10", "img": "http://lorempixel.com/270/145/nature/10", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 21, "url": "http://www.google.com", "title": "Google #1", "img": "http://lorempixel.com/270/145/animals/1", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4", "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg" ]},
    { "id": 22, "url": "http://www.google.com", "title": "Google #2", "img": "http://lorempixel.com/270/145/animals/2", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 23, "url": "http://www.google.com", "title": "Google #3", "img": "http://lorempixel.com/270/145/animals/3", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 24, "url": "http://www.google.com", "title": "Google #4", "img": "http://lorempixel.com/270/145/animals/4", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 25, "url": "http://www.google.com", "title": "Google #5", "img": "http://lorempixel.com/270/145/animals/5", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 26, "url": "http://www.google.com", "title": "Google #6", "img": "http://lorempixel.com/270/145/animals/6", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 27, "url": "http://www.google.com", "title": "Google #7", "img": "http://lorempixel.com/270/145/animals/7", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 28, "url": "http://www.google.com", "title": "Google #8", "img": "http://lorempixel.com/270/145/animals/8", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 29, "url": "http://www.google.com", "title": "Google #9", "img": "http://lorempixel.com/270/145/animals/9", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] },
    { "id": 30, "url": "http://www.google.com", "title": "Google #10", "img": "http://lorempixel.com/270/145/animals/10", "duration": "00:16", "source": [ "http://www.w3schools.com/html/mov_bbb.mp4" ] }
]

module.exports = VideoGridListStub;