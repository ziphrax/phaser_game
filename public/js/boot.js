var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game');
var socket = io();

var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};

boot.prototype = {
	preload: function(){
        game.load.image("loading","/assets/loading.png");
	},
  	create: function(){
		game.state.start("Preload");
	}
}
