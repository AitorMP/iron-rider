class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.player = new Player(this);
    this.obstacles = [];
    this.enableControls();
    this.score = 100;

    this.background = new Background(this);
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
      this.player.x = Clamp(this.player.x, 0, this.canvas.width - this.player.width);
      this.player.y = Clamp(this.player.y, 379, this.canvas.height - this.player.height);
    });
  }

  

  generateObstacle() {
    let yPositions = [470, 440, 420];
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
      console.log(this.obstacles.length);
    });
  }

  runLogic() {
    if (Math.random() < 0.005) {
      this.generateObstacle();
    }

    for (const obstacle of this.obstacles) {
      obstacle.runLogic();

      const obstacleAndPlayerAreIntersecting = obstacle.checkIntersection(
        this.player
      );

      const obstacleOutOfBounds = obstacle.x < 0;
      if (obstacleOutOfBounds) {
        console.log('out of bounds');
        const IndexOfObstacle = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(IndexOfObstacle, 1);
      }
      if (obstacleAndPlayerAreIntersecting) {
        console.log('Are Intersecting');
        const IndexOfObstacle = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(IndexOfObstacle, 1);
        this.score -= 10;
      }
    }
  }

  drawScore() {
    this.context.font = '50px monospace';
    this.context.fillText(this.score, 370, 50);
  }

  draw() {
    
    this.context.clearRect(0, 0, 800, 500);
    this.background.paint();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    this.player.draw();
    this.drawScore();
  }
}
function Clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
