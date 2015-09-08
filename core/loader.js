"use strict";

var _               = require('underscore')
,   q               = require('q')
,   fs              = require('fs')
,   path            = require('path')
,   util            = require('util')
,   crypto          = require('crypto')
,   bcrypt          = require('bcryptjs')
,   uuid            = require('node-uuid')

,   log             = require("../utils/log")
,   cors            = require("../utils/cors")
,   formidable      = require('../utils/formidable')
,   checkFields     = require("../utils/checkFields")

,   airbnb          = require('airapi')

,   express         = require('express')
,   jsonfile        = require('jsonfile');

var utils = {

    q: q,
    _: _,
    log: log,
    util: util,
    path: path,

    cors: cors,
    uuid: uuid,
    crypto: crypto,
    bcrypt: bcrypt,

    formidable: formidable,
    checkFields: checkFields,
    airbnb: airbnb
};

function loadComponents(componentName){

    var component = {};

    var files = fs.readdirSync(componentName, { followLinks: false });

    for(var file in files){

        var filename = files[file].split(".");
        var comp = filename[0];
        var ext = filename[1];

        if(ext != 'js'){
            continue;
        }

        var route = util.format("../%s/%s", componentName, comp);
        if(process.env.NODE_ENV == 'development'){
            log.info("Loading %s.%s", route, ext);
        }

        var exported = require(route);

        var object = _.object([[comp, exported]]);
        component = _.extend(component, object);
    }

    return component;

}

function loadConfigs(){

    var componentName = 'config';

    var component = {};

    var files = fs.readdirSync(componentName, { followLinks: false });

    for(var file in files){

        var filename = files[file].split(".");
        var comp = filename[0];
        var ext = filename[1];

        if(ext != 'json'){
            continue;
        }

        var route = util.format("%s/%s.%s", componentName, comp, ext);
        if(process.env.NODE_ENV == 'development'){
            log.info("Loading %s", route);
        }

        var exported = jsonfile.readFileSync(route);

        var object = _.object([[comp, exported]]);
        component = _.extend(component, object);
    }

    return component;

}

module.exports = (function(){

    var loaders = ['dao', 'views', 'controllers', 'routes' ];

    global.app = {
        utils: utils,
        express: express
    };

    /* */
    app.config = loadConfigs();
    require('./error')();
    /* */

    for(var loader in loaders){
        loader = loaders[loader];
        app[loader] = loadComponents(loader);
    }

    return app;

})();
