const playerImage = new Image();
playerImage.src = './images/player.png';

class Player {
  constructor(game) {
    this.game = game;
    this.x = 133;
    this.y = 450;
    this.width = 106;
    this.height = 61;
    this.frame = 1;
  }
  draw() {
    this.frame++;
    this.game.context.save();
    console.log(this.y);

    //this.game.context.fillStyle = 'red';
    this.game.context.drawImage(
      playerImage,
      this.width * (this.frame % 3),
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.context.restore();
  }
}
