// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // enemy is initially hidden from the game board using negative x coordinate
    this.x = -101 * 1;

    // the row parameter determines the row that this instance of the Enemy occupies
    // row = 1 is closest to the water
    // For aesthetic purpose, offset the Enemy sprite by -20 to visually fit it within the row (with stones background)
    this.y = (83 * row) - 20;

    // the speed at which an Enemy will travel across the game board
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
      this.x = -101 * getRandomIntInclusive(1,5); //randomize the starting position of the enemy after the loop
    }

    this.checkCollisions();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
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



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.heart = 'images/Heart.png';
    this.x = 101 * 2; // initial x coordinate of the player
    this.y =  83 * 5 - 10; // initial y coordinate of the player
    this.dx = 0; // dx (delta x) is the change in the player's x coordinate after an arrow key is pressed
    this.dy = 0; // dy (delta y) is the change in the player's y coordinate after an arrow key is pressed
};

Player.prototype.update = function() {
    this.checkCrossing();

    this.x = this.x + this.dx; // increase or decrease the player's x coordinate by dx
    this.y = this.y + this.dy; // increase or decrease the player's y coordinate by dy

    // reset the dx and dx to zero after the player is moved
    // dx and dy will be assigned new values at the next key press
    this.dx = 0;
    this.dy = 0;

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if (this.y == -10) {
      ctx.drawImage(Resources.get(this.heart), this.x, this.y + 100);
    }
};

Player.prototype.handleInput = function(key) {
    // Constrain the player within the game board by limiting its x & y coordinates
    // Player's y coordinate should be within -10 and 405
    // Player's x coordinate should be within 0 and 404

    if (key == 'up') {
      if (this.y > -10) {
        this.dy = -83;
      }
    }
    if (key == 'down') {
      if (this.y < 405) {
        this.dy = 83;
      }
    }
    if (key == 'left') {
      if (this.x > 0) {
        this.dx = -101;
      }
    }
    if (key == 'right') {
      if (this.x < 404) {
        this.dx = 101;
      }
    }

};

var winPauseTimer = 0;

Player.prototype.checkCrossing = function() {
  // reset player position if it reaches the water
  if (this.y == -10) {
    winPauseTimer += 1;
    if (winPauseTimer > 30) {
      this.x = 101 * 2; // player's initial x coordinate
      this.y = 83 * 5 - 10; // player's initial y coordinate
      winPauseTimer = 0;
    }
  }
};

// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

// set the no. of enemies at each row
const enemyCntRow1 = 3; // no. of enemies at row 1 (nearest to the water)
const enemyCntRow2 = 2; // no. of enemies at row 2
const enemyCntRow3 = 1; // no. of enemies at row 3

// instantiate an enemy object with a row number and a random speed between 100 and 300
// push this new object into the allEnemies array
for (let i = 0; i < enemyCntRow1; i++) {
  allEnemies.push(new Enemy(1, getRandomIntInclusive(300,400)));
}

for (let i = 0; i < enemyCntRow2; i++) {
  allEnemies.push(new Enemy(2, getRandomIntInclusive(200,300)));
}

for (let i = 0; i < enemyCntRow3; i++) {
  allEnemies.push(new Enemy(3, getRandomIntInclusive(100,200)));
}

const player = new Player();

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
