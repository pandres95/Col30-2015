'use strict';

module.exports = function () {

    var Q       = app.utils.q
    ,   youtube = app.utils.youtube;

    return {
        videos: function (query) {
            youtube.authenticate(app.config.youtube);
            return Q.nbind(youtube.search.list, youtube.search)(query);
        }
    };

};
