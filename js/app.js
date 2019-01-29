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
    this.y =  83 * 5 - 20;
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
      if (this.y > -20) {
        this.dy = -83;
      }
    }
    if (key == 'down') {
      console.log('down');
      // constrain player within the game board
      if (this.y < 395) {
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
// const enemy2C = new Enemy(2, (Math.floor(Math.random() * 250) + 200));

const enemy3A = new Enemy(3, (Math.floor(Math.random() * 150) + 100));
// const enemy3B = new Enemy(3, (Math.floor(Math.random() * 200) + 150));
// const enemy3C = new Enemy(3, (Math.floor(Math.random() * 250) + 200));

let allEnemies = [];

allEnemies.push(enemy1A);
allEnemies.push(enemy1B);
allEnemies.push(enemy1C);
allEnemies.push(enemy2A);
allEnemies.push(enemy2B);
// allEnemies.push(enemy2C);
allEnemies.push(enemy3A);
// allEnemies.push(enemy3B);
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
