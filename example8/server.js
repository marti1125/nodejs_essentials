var Config = require('./config.json'),
    Http = require('http');
Http.createServer(function(request, response) {

}).listen(Config.port, Config.host, function() {
    console.log('Listening on port', Config.port, 'and host', Config.host);
});
