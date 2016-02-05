var Http = require("http");

var count = 0;

function requestHandler(req, res) {
  var message,
      status = 200;
  count += 1;

  switch (req.url) {
    case "/count":
        message = count.toString();
        break;
    case "/hello":
        message = "world";
        break;
    default:
        status = 404;
        message = "Not Found";
        break;
  }

  res.writeHead(201, {
    "Content-Type": "text/plain"
  })

  console.log(req.method, req.url, status, message);

  res.end(message);

}

var server = Http.createServer(requestHandler);

server.listen(8080, function(){
  console.log("listening in port 8080");
})
