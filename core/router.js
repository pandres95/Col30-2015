'use strict';

module.exports = function(express){

    require('./routers/express')(express);
    require('./routers/finalstatuses')();

};
