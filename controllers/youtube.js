'use strict';

module.exports = function () {

    var dao     = new app.dao.youtube()
    ,   json    = new app.views.json();

    return {
        find: function (req, res, next) {
            json.promise(
                dao.videos(req.query.part, req.query.lat, req.query.lng),
                res, next
            );
        }
    };

};
