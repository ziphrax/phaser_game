var ingame = function(game){}
var     score = 0
    ,   scoreText
    ,   platforms
    ,   stars
    ,   spikes
    ,   fx_jump
    ,   fx_step
    ,   fx_star
    ,   fx_spike
    ,   music
    ,   volume = 0.8
    ,   step_isPlaying = false
    ,   filter = []
    ,   FILTER_VIGNETTE = 0
    ,   FILTER_FILMGRAIN = 1
    ,   FILTER_SNOISE = 1
    ,   timer
    ,   socket;

ingame.prototype = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createBackground();
        createFilters();
        createPlatforms();
        createGround();
        createLedges();
        createSpikes();
        createPlayer();
        createStars();
        createAudio();

        scoreText = game.add.text(310, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    },
    update: function() {
        var f = filter[FILTER_FILMGRAIN];

        game.physics.arcade.collide(player, platforms);
        cursors = game.input.keyboard.createCursorKeys();
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.overlap(player, spikes, killPlayer, null, this);
        updatePlayer();

        f.update();
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

function createFilters(){
    filter[FILTER_VIGNETTE] = game.add.filter('Vignette');
    filter[FILTER_VIGNETTE].size = 0.3;
    filter[FILTER_VIGNETTE].amount = 0.5;
    filter[FILTER_VIGNETTE].alpha = 1.0;

    filter[FILTER_SNOISE] = game.add.filter('SNoise');

    filter[FILTER_FILMGRAIN] = game.add.filter('FilmGrain');
    filter[FILTER_FILMGRAIN].color = 0.6;
    filter[FILTER_FILMGRAIN].amount = 0.04;
    filter[FILTER_FILMGRAIN].luminance = 0.8;


    game.stage.filters = [filter[FILTER_FILMGRAIN], filter[FILTER_VIGNETTE],filter[FILTER_SNOISE]];
}

function createPlatforms(){
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
}

function createBackground(){
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
}

function createGround(){
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
}

function createSpikes(){
    spikes =  game.add.group();
    spikes.enableBody = true;

    spikes.create(128,game.world.height - 64-32,'spike');
    spikes.create(256,game.world.height - 64-32,'spike');
    spikes.create(480,game.world.height - 64-32,'spike');

    spikes.create(464,400 -32,'spike');
    spikes.create(600,400 -32,'spike');
    spikes.create(700,400 -32,'spike');

    spikes.create(0,250-32,'spike');
    spikes.create(128,250-32,'spike');
}

function createLedges(){
    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;
}

function createPlayer(){
    // The player and its settings
   player = game.add.sprite(32, game.world.height - 150, 'dude');

   //  We need to enable physics on the player
   game.physics.arcade.enable(player);

   //  Player physics properties. Give the little guy a slight bounce.
   player.body.bounce.y = 0.2;
   player.body.gravity.y = 300;
   player.body.collideWorldBounds = true;

   //  Our idle animation
   player.animations.add('idle', [0, 1, 2, 3,4,5,6,7], 6, true);
}

function createAudio(){
    fx_jump = game.add.audio('jump');
    fx_step = game.add.audio('step');
    fx_step.loop = true;
    fx_star = game.add.audio('star');

    music = game.add.audio('bg_music');
    music.volume = volume;
    music.loop = true;
    music.play();
}

function createStars(){
    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 6;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.4 + Math.random() * 0.2;
    }
}

function updatePlayer(){
    //  Reset the players velocity (movement)
     player.body.velocity.x = 0;

     if (cursors.left.isDown)
     {
         //  Move to the left
         player.body.velocity.x = -150;
         if(!step_isPlaying){
           fx_step.play();
          step_isPlaying = true;
        }
         //player.animations.play('left');
     }
     else if (cursors.right.isDown)
     {
         //  Move to the right
         player.body.velocity.x = 150;
         if(!step_isPlaying){
           fx_step.play();
          step_isPlaying = true;
         }

        // player.animations.play('right');
     }
     else
     {
         //  Stand still
        player.animations.play('idle');
        step_isPlaying = false;
        fx_step.stop();

     }

     //  Allow the player to jump if they are touching the ground.
     if (cursors.up.isDown && player.body.touching.down)
     {
        fx_jump.play();
        step_isPlaying = false;
         player.body.velocity.y = -350;
     }

      if(score == 120){
        scoreText.text = 'Level Complete!';
      }
}

function networkUpdate(){
    //can shove fancy socket.io stuff in here.
}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //sound fx
    fx_star.play();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function killPlayer(player, spike){
    player.kill();
    scoreText.text = 'Game Over!';
}
