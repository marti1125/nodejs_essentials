var Morgan = require( 'morgan' ),
    Router = require( 'router' ),
    Http = require( 'http' );

router = new Router( );

router.use( Morgan( 'combined' ) );

/* Simple server */
Http.createServer( function( request, response ) {
    router( request, response, function( error ) {
        if( !error ) {
            response.writeHead( 404 );
        } else {
            //Handle errors
            console.log( error.message, error.stack );
            response.writeHead( 400 );
        }
        response.end( '\n' );

    });
}).listen( 8000 );

console.log( 'Server running on port 8000' );

function getInfo ( request, response ) {
    var info = process.versions;

    info = JSON.stringify( info );
    response.writeHead( 200, { 'Content-Type': 'application/json' } );
    response.end( info );
}
router.get( '/info', getInfo );
