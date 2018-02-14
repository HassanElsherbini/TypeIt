
// class Boot extends Phaser.State {

//   preload(){
//     //this.game.stage.backgroundColor = '#000';
//     this.load.image('gameBg', 'static/assets/background.png');
//   }

//   create(){
//     //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     this.state.start('Preload');
//   }
// }

var Boot = {

  WebFontConfig: {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['Source Code Pro']
    }
  },

  preload: function(){
    this.load.image('gameBg', 'static/assets/background.png');
    this.load.image('menuBg', 'static/assets/menuBg.png');
    this.load.image('menuBtn', 'static/assets/menubtn.png');
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  },

  create: function(){
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.state.start('Preload');
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  }
};
