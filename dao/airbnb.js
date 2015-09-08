'use strict';

module.exports = function () {

    var Q       = app.utils.q
    ,   airbnb  = app.utils.airbnb;

    function search(query) {
        var defer = Q.defer();
        airbnb.search(query, function (hostings) {
            defer.resolve(hostings);
        });
        return defer.promise;
    }

    function process(hosting) {
        var defer = Q.defer();
        airbnb.info(hosting.getId(), function (info) {
            defer.resolve(info);
        });
        return defer.promise;
    }

    return {
        list: function (query) {

            return search(query).then(function (hostings) {
                var qs = [];
                for(var hosting in hostings){
                    qs.push(process(hostings[hosting]));
                }
                return Q.all(qs);
            }).then(function (hostings) {
                var places = [];
                for(var hosting in hostings){
                    places.push(hostings[hosting].listing);
                }
                return places;
            });
        }
    };

};
