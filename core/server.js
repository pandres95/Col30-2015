"use strict";

var bodyParser = require('body-parser');

module.exports = function(){

    var srv     = app.express()
    ,   path    = app.utils.path
    ,   log     = app.utils.log;

    // Load of nodejs modules
    srv.use(function(req, res, next){
        res.header("X-Powered-By", "Bool Inc. PLAeX MVC Framework v1.0.1");
        next();
    });
    srv.set('host', process.env.IP || process.env.HOSTNAME || '0.0.0.0');
    srv.set('port', process.env.PORT || 3005);
    srv.set('json spaces', 4);

    srv.use(bodyParser.urlencoded({ extended: true }));
    srv.use(bodyParser.json());

    srv.use(
        '/static',
        function(req, res, next){
            log.info("%s %s", req.method.toUpperCase(), req.path);
            next();
        },
        function(req, res, next){
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Methods',
                ['GET'].join(', ')
            );
            res.header(
                'Access-Control-Allow-Headers',
                [
                'Authorization', 'Accept', 'Content-Type', 'X-Requested-With',
                'Cache-Control'
                ].join(', ')
            );
            next();
        },
        app.express.static(path.join(__dirname, '../static'))
    );

    require('./router')(app.express);
    srv.use('/api', app.router);

    var server  = require('http').createServer(srv);

    return {
        app: srv,
        server: server
    };

};
