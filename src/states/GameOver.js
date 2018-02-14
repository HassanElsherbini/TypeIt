var GameOver = {

  preload : function(){

  },

  create: function(){
    const title = 'Defeated !';
    let titleScreen = game.add.text(this.game.world._width / 2, 190, title, {font: '70px Source code Pro', fill: 'black', align: 'center'});
    titleScreen.anchor.setTo(0.5, 0);
  },
  update(){

  }

};
