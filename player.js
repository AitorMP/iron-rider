class Player {
  constructor(game) {
    this.game = game;
    this.x = 133;
    this.y = 450;
    this.width = 104;
    this.height = 95;
  }
  draw() {
    this.game.context.save();

    this.game.context.fillStyle = 'red';
    this.game.context.fillRect(this.x, this.y, this.width, this.height);

    this.game.context.restore();
  }
}
