'use strict';

module.exports = function () {

    var Q       = app.utils.q
    ,   youtube = app.utils.youtube;

    return {
        videos: function (part, lat, lng) {
            youtube.authenticate(app.config.youtube);
            return Q.nbind(youtube.search.list, youtube.search)({
                part: part,
                location: app.utils.util.format('%d, %d', lat, lng)
            });
        }
    };

};
