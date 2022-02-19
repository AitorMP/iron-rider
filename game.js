class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.player = new Player(this);
    
    this.obstacles = [
        new Obstacle(this, 770, 468, 0.95),
        new Obstacle(this, 710, 438, 1.5),
        new Obstacle(this, 770, 400, 2),
    ];
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    for (const obstacle of this.obstacles) {
        obstacle.runLogic();
    }
  }

  draw() {
    this.context.clearRect(0, 0, 800, 500);
    this.player.draw();
    for (const obstacle of this.obstacles) {
        obstacle.draw();
    }
  }
}
