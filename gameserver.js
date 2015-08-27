var gameserver = function(socket){
    var self = this;


    self.onDisconnect = function(){
        console.log(socket.id + ': has disconnected');
    }

    self.onGetLobbyList = function(){
        socket.emit(
            'Update Lobby List',
            ['game1','game2','game3','game4','game5','game6']
        );
    }

    self.onJoinLobby = function(lobby){
        socket.join(lobby);
        console.log(socket.id + ': has joined lobby ' + lobby);
    }

    return self;
}

module.exports = gameserver;
