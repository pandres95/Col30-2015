'use strict';

var _ = require('underscore');

function json(err, data, res){

    var status = (
        (err && (err.status || 500)) || (data && (data.status || 200))
    );

    var obj = { success: !err };

    if(err){
        obj.error = _.omit(err, 'status');
        obj.error.message = err.message || 'internal_server_error';
    } else {
        if(data) obj.data = _.isArray(data) ? data : _.omit(data, 'status');
    }

    res.status(status).json(obj);

}

module.exports = function () {
    var plugin = {
        data: function (data, res) {
            json(null, data || false, res);
        },
        error: function (err, res) {
            json(err, null, res);
        },
        promise: function (promise, res, next) {
            promise.then(function (data) {
                plugin.data(data, res);
            }).catch(next);
        }
    };
    return plugin;
};
