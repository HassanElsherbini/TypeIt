var JoiningGame = {

  preload: function(){

  },

  create: function(){
    game.stage.backgroundColor = '#FFFFFF';
    let txt = game.add.text(game.world.centerX, game.world.centerY, 'Waiting for opponent ....', {
      font: '25px Source code Pro',
      fill: 'black',
      align: 'center'
    })
    txt.anchor.setTo(0.5, 0.5);
  },
  update: function(){

  },

  startGame: function(){
    game.state.start('Play');
  }

}
