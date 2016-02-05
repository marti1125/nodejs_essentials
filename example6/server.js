var Express = require('express');
var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var BodyParser = require( 'body-parser' );

var app = Express();

var users = {
  foo: {
    username: 'foo',
    password: 'bar',
    id: 1
  },
  bar: {
    username: 'bar',
    password: 'foo',
    id: 2
  }
}

var localStrategy = new LocalStrategy({
    usernameField: 'username',
    password: 'password'
  },

  function(username, password, done){
    user = users[username];
    if(user === null) {
      return done(null, false, {message: 'Ivalid user'});
    }
    if(user.password !== password) {
      return done(null, false, {message: 'Ivalid password'});
    }
    done(null, user);
  }

);

Passport.use( 'local', localStrategy );

app.use( BodyParser.urlencoded( { extended: false } ) );
app.use( BodyParser.json( ) );
app.use( Passport.initialize( ) );

app.post(
    '/login',
    Passport.authenticate( 'local', { session: false } ),
    function ( request, response ) {
      response.send( 'User Id ' + request.user.id );
    }
);

app.listen( 8080, function( ) {
    console.log( 'Listening on port 8080' );
});
