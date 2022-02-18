const canvasElment = document.querySelector('canvas');

class Player {
  constructor() {
    this.x = 100;
    this.y = 200;
  }
}

class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
  }

  draw() {
    this.context.fillStyle = 'blue';
    this.context.fillRect(400, 450, 50, 50);
  }
}

const game = new Game(canvasElment);

game.draw();
