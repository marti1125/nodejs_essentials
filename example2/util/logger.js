function Logger(){
}

Logger.prototype.log = function( message ) {
    console.log.apply( console, arguments );
};

module.exports = Logger;
