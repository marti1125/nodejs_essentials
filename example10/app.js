var LevelUP = require( 'level' ),
    db = new LevelUP( './example-db', {
        valueEncoding: 'json'
    });

db.put( 'key1', { inner: 'value' }, function( error ) {
    if ( error ) return console.log( 'Error!', error )

    var stream = db.createReadStream( );

    stream
    .on( 'data', function( pair ) {
        console.log( pair.key, "=", pair.value );
    })
    .on( 'error', function( error ) {
        console.log( error );
    })
    .on( 'end', function( ) {
        console.log( 'end' );
    });
});
