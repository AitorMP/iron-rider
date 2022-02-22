const playerImage = new Image();
playerImage.src = './images/player.png';

class Player {
  constructor(game) {
    this.game = game;
    this.x = 133;
    this.y = 450;
    this.width = 113;
    this.height = 63;
    //this.frame = 1;
  }
  draw() {
    //this.frame++;
    this.game.context.save();

    this.game.context.fillStyle = 'red';
    //this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(playerImage, 20, 73, this.width, this.height, 133, 435, this.width, this.height);

    this.game.context.restore();
  }
}
