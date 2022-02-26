const obstacleImage = new Image();
obstacleImage.src = './images/obstacle.png';

class Obstacle {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = speed;
  }

  checkIntersection(element) {
    return (
      element.x + element.width > this.x &&
      element.x < this.x + this.width &&
      element.y + element.height > this.y + this.height / 2 &&
      element.y + element.height * 0.7 < this.y + this.height
    );
  }

  runLogic() {
    this.x -= this.speed;
  }

  draw() {
    this.game.context.drawImage(
      obstacleImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
