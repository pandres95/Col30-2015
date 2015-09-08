"use strict";

module.exports = function(){

    var router  = app.router
    ,   json    = new app.views.json();

    // 404 Middleware: Final Middleware matches routes that aren't registered
    router.use(function(req, res) {
        json.error({ "message": "Method not found", status: 404 }, res);
    });

    // Error Middleware: Matches Server Error Routes
    router.use(function(err, req, res, next){ /* jshint unused: false */
        app.utils.log.error('%s\n%s', err, err.stack);
        json.error(err, res);
    });

    app.router = router;
    return app;

};
