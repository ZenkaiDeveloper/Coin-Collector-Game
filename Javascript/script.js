// Game Setup
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'stage', {
    preload: preload,
    create: create,
    update: update
});

// Global Variables
var cursors;
var player_speed = 600;

var coin;
var coin_padding = 60;
var score = 0;

//Global functions

var randomCoinPoisition = function(){
  let posX = Math.round(Math.random()*(game.width-(2*coin_padding+1)+coin_padding));
  let posY = Math.round(Math.random()* (game.height-(2*coin_padding+1)+coin_padding));
  coin.position = new Phaser.Point(posX,posY);
}

// var Collect = function(){
//   randomCoinPoisition();
// }

// Loads assets before starting the game
function preload() {

    game.load.crossOrigin = 'anonymous'; // For loading external assets
    // Load player image
    game.load.image('player','../Images/Mariopix.png');

    game.load.image('coin', 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg');

}

// Creates game objects before starting the game
function create() {
   game.physics.startSystem(Phaser.Physics.Arcade); // Starts the physics system

    cursors = game.input.keyboard.createCursorKeys(); // Adds keyboard input

    game.stage.backgroundColor = "#72d899";

    // Add Player
    player = game.add.sprite(128, 128, 'player'); // Add player sprite at x, y position
    player.scale.setTo(0.5, 0.5); //scale the image
    game.physics.enable(player, Phaser.Physics.ARCADE); // Enable player physics
    player.body.collideWorldBounds = true; // Keep player inside the screen

    // Add Key
    coin = game.add.sprite(200, 200, 'coin'); // Add key sprite at x, y position
    coin.scale.setTo(0.4, 0.4); //scale the image
    game.physics.enable(coin, Phaser.Physics.ARCADE); // Enable key physics
    coin.body.immovable = true; // Keep key from moving
    // Picks a random location on the stage for the coin to appear.
    randomCoinPoisition();
}

// Runs every frame
function update() {
    var speed_x = 0; // Current x speed
    var speed_y = 0; // Current y speed

    // X Movement
    if (cursors.left.isDown) { // Left
        speed_x = speed_x - player_speed;
    } else if (cursors.right.isDown) { // Right
        speed_x = speed_x + player_speed;
    }

    // Y Movement
    if (cursors.up.isDown) { // Up
        speed_y = -player_speed;
    } else if (cursors.down.isDown) { // Down
        speed_y = player_speed;
    }

    var speed_dir = new Phaser.Point(speed_x, speed_y); // make speed vector
    player.body.velocity = speed_dir; // Set player velocity

    game.physics.arcade.collide(player, coin, function(){
      randomCoinPoisition();
      score++;
      document.getElementById("score").innerHTML = score;
    }); // Player-key collision
}
