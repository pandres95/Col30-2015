var q = require('q'),
    feed = require('feed-read');

module.exports = function(rss){

    var res = q.defer();

    feed(rss, function(err, articles){
        if(err) res.reject(err);
        else res.resolve(articles);
    });

    return res.promise;

}
