/* jshint laxcomma: true, node: true */
'use strict';

var Q       = require('q')
,   airbnb  = require('airapi')
,   util    = require('util');

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

console.info('Querying...');
search({
    location: 'Seattle, WA',
    checkin: '07/03/2015',
    checkout: '07/06/2015',
    guests: 2,
    page: 2,
    ib: true
}).then(function (hostings) {
    console.info('Finding hosts...');
    var qs = [];
    for(var hosting in hostings){
        qs.push(process(hostings[hosting]));
    }
    return Q.all(qs);
}).then(function (hostings) {
    console.info('Hosts found:');
    for(var hosting in hostings){
        console.log(
            "(%d, %d)",
            hostings[hosting].listing.lat,
            hostings[hosting].listing.lng
        );
    }
});
