var Http = require("http"),
    Router = require("router"),
    server,
    router;

var BodyParser = require("body-parser");

router = new Router();

router.use( BodyParser.text() );

var counter = 0,
    messages = { };

function createMessage(req, res){
  var id = counter += 1, message = req.body;
  console.log("create message", id, message);
  messages[id] = message;
  res.writeHead(201, {
    'Content-Type': 'text/plain',
    'Location': '/message/' + id
  });
  res.end(message)
}

router.post("/message", createMessage);

function readMessage(req, res){
  var id = req.params.id, message = messages[id], messageList = [], messageString;
  console.log("Read Message ", id, message);

  for(id in messages){
    if(!messages.hasOwnProperty(id)){
      continue;
    }
    message = messages[id];
    if(typeof message !== 'string'){
      continue;
    }
    messageList.push(message);
  }

  console.log( 'Read messages', JSON.stringify(
        messageList,
        null,
        '  '
    ));

  messageString = messageList.join( '\n' );

  if(message === undefined){
    console.log("Message not found", id);
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end("not found");
  } else {
    res.writeHead(201, {
      'Content-Type': 'text/plain'
    });
    res.end(messageString)
  }

}

router.get("/message/:id", readMessage)

function deleteMessage(req, res){
  var id = req.params.id;
  console.log("Delete message", id);

  if(typeof message !== 'string'){
    console.log("Message not found", id);
    res.writeHead(404, {});
    res.end("\n");
    return;
  }

  messages[id] = undefined;
  res.writeHead(204, {});
  res.end("");
}

router.delete("/message/:id", deleteMessage)

server = Http.createServer(function(req, res){
  router(req,  res, function(error){
    if(!error) {
      res.writeHead(404);
    } else {
      console.log(error.message, error.stack);
      res.writeHead(400);
    }
    res.end( '\n' );
  });
});

server.listen(8080, function(){
  console.log("listening in port 8080");
})
