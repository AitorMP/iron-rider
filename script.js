const canvasElement = document.querySelector('canvas');

const game = new Game(canvasElement);

game.draw();

console.log(game.player.x);

game.runLogic();

console.log(game.player.x);

game.draw();

game.loop();
