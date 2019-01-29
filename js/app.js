// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // enemy is initially hidden from the game board using negative coordinates
    // enemy initial position is randomized
    // this.x = -101 * (Math.floor(Math.random() * 10) + 1);
    this.x = -101 * 1;
    this.y = (83 * row) - 20;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // make enemies loop across the board
    if (this.x <= 505) {
      this.x = this.x + (this.speed * dt);
    } else {
      this.x = -101 * (Math.floor(Math.random() * 5) + 1); //randomize the starting position of the enemy after the loop
    }

    // reset player position if it reaches the water
    if (player.y == -10) {
      player.x = 101 * 2; // player's initial x coordinate
      player.y = 83 * 5 - 10; // player's initial y coordinate
    }

    // Collision Detection

    // Y-axis considerations:
    // For aesthetic purpose, Enemy's initial y coordinate is offset by -20 (refer to: this.y = (83 * row) - 20;),
    // while Player's initial y coordinate is offset by -10 (refer to this.y =  83 * 5 - 10;),
    // for Enemy and Player to collide, Enemy's y coordinate needs to be shifted by 10 to match Player's y coordinate

    // X-axis considerations:
    // Enemy's x coordinate is located at the Enemy's backside (visually), to have a 'head-on' collision with the Player,
    // The x coordinate of interest should be the x coordinate of the Enemy's head, which is thix.x + 75, where
    // the number 75 can be adjusted to simulate a more realistic collision, for example if the number is 101,
    // then the collision happens before the sprites of the enemy and the player touches each other visually
    // A boundary is set (this.x + 75 < player.x + 101) so that the x-direction collision is considered complete
    // after the enemy passes by the length of the player (player.x + 101)

    if ((this.y + 10 == player.y) && (this.x + 75 > player.x && this.x + 75 < player.x + 101)) {
      // reset player position if it collides with enemies
      player.x = 101 * 2; // player's initial x coordinate
      player.y = 83 * 5 - 10; // player's initial y coordinate
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 101 * 2;
    this.y =  83 * 5 - 10;
    this.dx = 0;
    this.dy = 0;
};

Player.prototype.update = function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.dx = 0;
    this.dy = 0;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'up') {
      console.log('up');
      // constrain player within the game board
      if (this.y > -10) {
        this.dy = -83;
      }
    }
    if (key == 'down') {
      console.log('down');
      // constrain player within the game board
      if (this.y < 405) {
        this.dy = 83;
      }
    }
    if (key == 'left') {
      console.log('left');
      // constrain player within the game board
      if (this.x > 0) {
        this.dx = -101;
      }
    }
    if (key == 'right') {
      console.log('right');
      // constrain player within the game board
      if (this.x < 404) {
        this.dx = 101;
      }
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1A = new Enemy(1, (Math.floor(Math.random() * 150) + 100));
const enemy1B = new Enemy(1, (Math.floor(Math.random() * 200) + 150));
const enemy1C = new Enemy(1, (Math.floor(Math.random() * 250) + 200));

const enemy2A = new Enemy(2, (Math.floor(Math.random() * 150) + 100));
const enemy2B = new Enemy(2, (Math.floor(Math.random() * 200) + 150));
const enemy2C = new Enemy(2, (Math.floor(Math.random() * 250) + 200));

const enemy3A = new Enemy(3, (Math.floor(Math.random() * 150) + 100));
const enemy3B = new Enemy(3, (Math.floor(Math.random() * 200) + 150));
const enemy3C = new Enemy(3, (Math.floor(Math.random() * 250) + 200));

let allEnemies = [];

allEnemies.push(enemy1A);
allEnemies.push(enemy1B);
allEnemies.push(enemy1C);
allEnemies.push(enemy2A);
allEnemies.push(enemy2B);
// allEnemies.push(enemy2C);
// allEnemies.push(enemy3A);
allEnemies.push(enemy3B);
// allEnemies.push(enemy3C);

const player = new Player();
console.log(player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
