var lobby = function(game){}

lobby.prototype = {
  	create: function(){
        socket.emit('Get Lobby List');
        rooms = game.add.group();
	}
}

socket.on('Update Lobby List',function(list){
    for(var i = 0; i < list.length;i++){
        var text = game.add.text(64, (32*i) + 5 , list[i], { fontSize: '32px', fill: '#fff' });
        var button = game.add.button(0,(32*i) + 5,'btn_lobby', lobbyJoinOnClick, this, 2 , 1 , 0 );
        button.lobby = list[i];
        rooms.add(text);
        rooms.add(button);
    }
});

function lobbyJoinOnClick(button, pointer){
    socket.emit('Join Lobby',button.lobby);
    game.state.start("InGame");
}
