var _ = require('underscore');
var q = require('q');
var soap = require('soap');

module.exports = function(url){

    var res = q.defer();

    soap.createClient(url, function(err, client){

        if(err){
            res.reject(err);
        } else {

            res.resolve(
                _.extend(
                    { functions: Object.keys(client) },
                    client
                )
            );

        }

    });

    return res.promise;

}
