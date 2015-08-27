var gameserver = function(socket){
    var self = this;


    self.onDisconnect = function(){
        console.log('disconnected');
    }

    return self;
}

module.exports = new gameserver();
