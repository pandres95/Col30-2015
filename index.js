'use strict';

/*

Copyright (c) 2014 Bool Inc
Bool Node.js MVC Framework

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

// Generate server
require('./core/loader');
var srv = require('./core/server')();

var startServer = function(){
    srv.server.listen(
        srv.app.get('port'),
        srv.app.get('host'),
        function(){

            console.log(
                'Express server listening on http://%s:%d',
                srv.app.get('host'),
                srv.app.get('port')
            );
        }
    );
};

if(process.env.NODE_ENV != 'test'){
    startServer();
}


module.name = "Col30";
exports.app = app;
exports.srv = srv;
