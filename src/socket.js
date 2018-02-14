var Client = {}

Client.socket = io.connect();

Client.askNewPlayer = () => {
  Client.socket.emit('newplayer');
};

Client.playerReady = () => {
  Client.socket.emit('ready');
};

Client.playerTyped = (x, txtIdx, isCorrect) => {
  Client.socket.emit('playerTyped', x, txtIdx, isCorrect);
};

Client.addText = (txt) => {
  Client.socket.emit('addtxt', txt);
};

Client.playerWon = () => {
  Client.socket.emit('gameWon');
}

Client.flickerEnemyText = () => {
  Client.socket.emit('flickerEnemyText');
};

// Client.dwindleText = () => {
//   Client.socket.emit('dwindletxt');
// };

Client.socket.on('receiveTxt', (genTxt) => {
  game.global.playerTxt = genTxt.playerTxt;
  game.global.enemyTxt = genTxt.enemyTxt;
});

Client.socket.on('start', () => {
  JoiningGame.startGame();
});

Client.socket.on('opponentTyped', (x, txtIdx, isCorrect) => {
  Play.updateOponentTxt(x, txtIdx, isCorrect);
});

Client.socket.on('addtxtToboard', (txt) => {
  Play.addTxtToBoard(txt);
});

Client.socket.on('gameOver', () => {
  Play.gameOver();
});

Client.socket.on('flickerText', () => {
  console.log('on flickertext');
  Play.flickertxt();
});
