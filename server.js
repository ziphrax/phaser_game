var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var gameServer = require('./gameserver');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  gs = new gameServer(socket);

  console.log('a user connected: ' + socket.id);
  socket.on('update player',function(position){
      console.log(position);
  });

  socket.on('diconnect',gs.onDisconnect);
  socket.on('Get Lobby List',gs.onGetLobbyList);
  socket.on('Join Lobby',gs.onJoinLobby);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
