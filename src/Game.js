
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

game.global = {
  playerTxt: '',
  enemyTxt: '',
};

game.state.add('Play', Play, false);
game.state.add('Preload', Preload, false);
game.state.add('Boot', Boot, false);
game.state.add('Menu', Menu, false);
game.state.add('JoiningGame', JoiningGame, false);
game.state.add('GameOver', GameOver, false);
game.state.add('GameWon', GameWon, false);
game.state.start('Boot');

