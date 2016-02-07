var Bunyan = require( 'bunyan' ),
    logger;

logger = Bunyan.createLogger( {
    name: 'example-7-b',
    streams: [
        {
            level: Bunyan.INFO,
            path: './log.log'
        },
        {
            level: Bunyan.INFO,
            stream: process.stdout
        }
    ]
});
logger.info( process.versions );
logger.info( 'Application started' );
