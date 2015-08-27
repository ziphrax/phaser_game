var gameserver = function(socket){
    var self = this;


    self.onDisconnect = function(){
        console.log('disconnected');
    }

    self.onGetLobbyList = function(){
        socket.emit(
            'Update Lobby List',
            ['game1','game2','game3','game4','game5','game6']
        );
    }

    return self;
}

module.exports = gameserver;
