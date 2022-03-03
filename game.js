const backGroundMusic = new Audio('/images/cyberpunk-street.wav');

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.background = new Background(this);
    this.screens = screens;
    this.running = false;
    this.backGroundMusic = backGroundMusic;
    this.backGroundMusic.volume = 0.1;
    this.backGroundMusic.loop = true;
    this.scoreSpritesObj = {};
    this.score = 3;
    this.liveSprite = new Image();
    this.liveSprite.src = './images/live 40px.png';
    this.enableControls();
  }

  startGame() {
    this.running = true;
    this.score = 3;
    this.player = new Player(this);
    this.obstacles = [];
    this.loop();
    this.displayScreen('playing');
  }

  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = '';
  }

  gameOver() {
    this.running = false;
    this.displayScreen('end');
    this.backGroundMusic.pause();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      if (this.running) {
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
        this.player.x = clamp(
          this.player.x,
          0,
          this.canvas.width - this.player.width
        );
        this.player.y = clamp(
          this.player.y,
          379,
          this.canvas.height - this.player.height
        );
      }
    });
  }

  generateObstacle() {
    let yPositions = [470, 440, 420];
    const obstacleSpeed = Math.random() + 2;
    const obstacleY = yPositions[Math.floor(Math.random() * yPositions.length)];
    const obstacleX = this.canvas.width;
    const obstacle = new Obstacle(this, obstacleX, obstacleY, obstacleSpeed);
    this.obstacles.push(obstacle);
  }

  loop(stamp) {
    window.requestAnimationFrame((stamp) => {
      this.runLogic();
      this.draw(stamp);
      if (this.running) {
        this.loop(stamp);
      }
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
        //console.log('out of bounds');
        const indexOfObstacle = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(indexOfObstacle, 1);
      }
      if (obstacleAndPlayerAreIntersecting) {
        //console.log('Are Intersecting');
        const indexOfObstacle = this.obstacles.indexOf(obstacle);
        this.obstacles.splice(indexOfObstacle, 1);
        this.score -= 1;
      }
    }

    if (this.score <= 0) {
      this.gameOver();
    }
  }

  drawScore() {
    this.context.fillStyle = 'white';
    this.context.font = '20px sans-serif';
    this.context.fillText(`Meters: ${this.player.score}`, 680, 20);
  }

  draw(stamp) {
    this.context.clearRect(0, 0, 800, 500);
    this.background.paint();
    for (const obstacle of this.obstacles) {
      obstacle.draw();
    }
    this.player.draw(stamp);
    this.drawScore();
    for (let i = 0; i < this.score; i++) {
      this.context.drawImage(this.liveSprite, 10 + i * 40, 0, 40, 40);
    }

    //this.context.drawImage(this.scoreSpritesObj[this.score.toString()],20, 50, 120, 40);
  }
}

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
