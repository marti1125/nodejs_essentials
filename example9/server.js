var Http = require('http'),
    server_port,
    server_host;

server_port = parseInt(process.env.FOO_SERVER_PORT, 10);
server_host = process.env.FOO_SERVER_HOST;

Http.createServer(function(request, response) {

}).listen(server_port, server_host, function() {
  console.log('Listening on port', server_port, 'and host', server_host);
});
