var preload = function(game){}

preload.prototype = {
	preload: function(){
          var loadingBar = this.add.sprite(200,200,"loading");
		  var loadingProgress = loadingBar.animations.add('loading');
          loadingBar.anchor.setTo(0.5,0.5);
          game.load.setPreloadSprite(loadingBar);
		  loadFilters();
		  loadAudio();
		  loadSpritesheets();
		  loadImages();
	},
  	create: function(){
		game.state.start("InGame");
	}
}

function loadFilters(){
    game.load.script('filter-vignette', '/assets/filters/Vignette.js');
    game.load.script('filter-snoise', '/assets/filters/SNoise.js');
    game.load.script('filter-filmgrain', '/assets/filters/FilmGrain.js');
}

function loadAudio(){
    game.load.audio('bg_music','/assets/audio/Electrix_NES.mp3');
    game.load.audio('jump','/assets/audio/platformer_jumping/jump_05.wav');
    game.load.audio('step','/assets/audio/steps/stepstone_1.wav');
    game.load.audio('star','/assets/audio/completetask_0.mp3');
}

function loadSpritesheets(){
    game.load.spritesheet('dude', '/assets/dude1.png', 32, 48);
}

function loadImages(){
    game.load.image('sky', '/assets/sky.png');
    game.load.image('ground', '/assets/platform.png');
    game.load.image('star', '/assets/star.png');
    game.load.image('spike', '/assets/spike.png');
}
