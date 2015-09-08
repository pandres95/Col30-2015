"use strict";

module.exports = function(){

    var util = require('util');

    global.BoolError = function(status, code, message, uri){

        Error.apply(this, arguments);

        if(!(typeof status === 'number' && (status % 1) === 0)) {
            // First argument is errorCode
            status = 500;
            code = status || 'server_error';
            message = code || null;
            uri = message || null;
        }

        Error.call(this);
        Error.captureStackTrace(this, BoolError);
        this.name = 'BoolError';
        this.status = status || 500;
        this.code = code || 'server_error';
        this.message = message;
        this.uri = uri;

    };

    function createError(errorKey, statusKey, code, message){

        global[errorKey + "Error"] = function(){
            return new BoolError(
                statusKey,
                code,
                message
            );
        };

    }

    var errorDefinitions = app.config.errors;

    /**
    * Inherits from `Error`.
    */
    util.inherits(BoolError, Error);

    for(var statusKey in errorDefinitions){
        var status = errorDefinitions[statusKey];

        for(var errorKey in status){
            var error = status[errorKey];

            createError(
                errorKey,
                parseInt(statusKey),
                error.code,
                error.message
            );

        }
    }

};
