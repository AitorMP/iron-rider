class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.player = new Player(this);

    this.obstacles = [];
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      console.log(code);
      switch (code) {
        case 'ArrowUp':
          event.preventDefault();
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.player.y += 10;
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.player.x += 10;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.player.x -= 10;
          break;
      }
    });
  }

  generateObstacle() {
    let yPositions = [470, 440, 410, 380, 350, 310];
    const obstacleSpeed = Math.random() + 4;
    const obstacleY = yPositions[Math.floor(Math.random() * yPositions.length)];
    const obstacleX = this.canvas.width;
    const obstacle = new Obstacle(this, obstacleX, obstacleY, obstacleSpeed);
    this.obstacles.push(obstacle);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    if (Math.random() < 0.005) {
      this.generateObstacle();
    }

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
