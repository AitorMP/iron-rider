class Obstacle {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = speed;
  }

  runLogic() {
    this.x -= this.speed;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'black';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}
