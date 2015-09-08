'use strict';

module.exports = function () {

    var airbnb = new app.controllers.airbnb();

    return [
        {
            url: '/hostings',
            method: 'get',
            action: airbnb.find,
            cors: true
        }
    ];

};
