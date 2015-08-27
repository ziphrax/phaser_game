    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game');
    var socket = io();
    game.state.add("Boot",boot);
    game.state.add("Preload",preload);
    game.state.add("InGame",ingame);
    game.state.start("Boot");
