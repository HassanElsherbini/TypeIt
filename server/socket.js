const {generateWords, shuffleWords} = require('./words');

module.exports = io => {
  let generatedWords = generateWords(10);
  let txt1 = generatedWords.join(' ');
  let txt2 = shuffleWords(generatedWords).join(' ');
  var generatedTxt = [
    {playerTxt: txt1, enemyTxt: txt2 },
    {playerTxt: txt2, enemyTxt: txt1 }
  ];

  var connectedPlayers = { readyCount: 0, players: {}};

  io.on('connection', socket => {
    //console.log(socket.id);

    socket.on('newplayer', () => {
      socket.player = {
        id: socket.id,
        isReady: false
      };

      let playerCount = Object.keys(connectedPlayers.players).length;

      if (playerCount < 2){
        //console.log(socket.player);
        connectedPlayers.players[socket.player.id] = socket.player;
        console.log(playerCount);
        console.log(connectedPlayers);
        socket.emit('receiveTxt', generatedTxt.shift());
      } else {
        socket.emit('disconnect', 'a game is in progress');
        socket.disconnect();
      }

      // else if (connectedClientCount === 2){
      //   io.sockets.emit('recieve-text', 'this is my board', 'this the enemy board');
      // }

    });

    socket.on('disconnect', function(){
      if (connectedPlayers.readyCount > 0) connectedPlayers.readyCount--;
      delete connectedPlayers.players[socket.id];
    });

    socket.on('ready', function(){
      let pid = socket.player.id;
      connectedPlayers.players[pid].isReady = true;
      connectedPlayers.readyCount++;

      if (connectedPlayers.readyCount === 2){
        io.emit('start');
      }
      console.log(connectedPlayers);
    });

    socket.on('playerTyped', (x, txtIdx, isCorrect) => {
      socket.broadcast.emit('opponentTyped', x, txtIdx, isCorrect);
    });

    socket.on('addtxt', (txt) => {
      socket.broadcast.emit('addtxtToboard', txt);
    });

    socket.on('gameWon', () => {
      let pid = socket.player.id;
      connectedPlayers.players[pid].isReady = false;
      socket.broadcast.emit('gameOver');
    });


    socket.on('flickerEnemyText', () => {
      socket.broadcast.emit('flickerText');
    });


  });
};
