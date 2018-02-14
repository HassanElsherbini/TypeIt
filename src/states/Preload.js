
// class Preload extends Phaser.State{

//   preload(){
//   }

//   create(){
//     this.state.start('Play')
//   }
// }

var Preload = {

  preload: function(){
    game.stage.disableVisibilityChange = true;
  },

  create: function(){
    this.state.start('Menu');
  }
}
