'use strict';

module.exports = function () {

    var json    = new app.views.json()
    ,   dao     = new app.dao.airbnb();

    return {
        find: function (req, res, next) {
            json.promise(dao.list(req.query), res, next);
        }
    };

};
