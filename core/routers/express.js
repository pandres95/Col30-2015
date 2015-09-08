"use strict";

module.exports = function(express){

    var _           = app.utils._
    ,   log         = app.utils.log
    ,   util        = app.utils.util
    ,   approutes   = app.routes;

    require('./middleware')(express);

    var router = app.router,
        cors = app.utils.cors;

    function processRoute(route) {
        if(
            !_.contains(['get', 'post', 'put', 'delete'], route.method)
        ) throw new BoolError(
            0, "EINVALIDMETHOD",
            "Method " + route.method + " is invalid"
        );

        if(route.cors){
            cors.registerRoute(route.url, route.method);
        }

        if(typeof route.action !== 'function') throw new BoolError(
            0, "ENOTCONTROLLER",
            util.format(
                "%s %s: This route's action is not a Controller, is a %s",
                route.method.toUpperCase(), route.url, typeof route.action
            )
        );
        if(process.env.NODE_ENV === "development"){
            log.info("Loading %s %s", route.method.toUpperCase(), route.url);
        }

        router[route.method](route.url, route.action);
    }

    for(var module in approutes){
        module = new approutes[module]();
        for(var route in module){
            processRoute(module[route]);
        }
    }

    app.router = router;

};
