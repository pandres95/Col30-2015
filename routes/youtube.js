'use strict';

module.exports = function () {

    var youtube = new app.controllers.youtube();

    return [
        {
            method: 'get',
            url: '/youtube',
            action: youtube.find,
            cors: true
        }
    ];

};
