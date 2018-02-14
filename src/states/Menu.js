const FONT_NAME = 'Source Code Pro';
const Menu = {

  // WebFontConfig: {
  //   active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
  //   google: {
  //     families: [FONT_NAME]
  //   }
  // },

  preload: function(){
    this.options = { 1: 'MATCH MAKING', 2: 'EXIT'};
    this.selection = 1;
    // this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  },

  create: function() {
    game.stage.backgroundColor = '#FFFFFF';
    // game.add.image(0, 0, 'menuBg').anchor.set(0.5);
    const title = 'TYPE IT';
    let titleScreen = game.add.text(this.game.world._width / 2, 50, title, {font: '100px Source code Pro', fill: 'black', align: 'center'});
    titleScreen.anchor.setTo(0.5, 0);

    this.createButton(game, 'Match Making', game.world.centerX, game.world.centerY - 150, 280, 50, () => {
      Client.playerReady();
      this.state.start('JoiningGame');
    });

    Client.askNewPlayer();
  },

  createButton : function(game, name, x, y, w, h, callback){
    let btn = game.add.button(x, y, 'menuBtn', callback, this, 2, 1, 0);
    btn.anchor.setTo(0.5, 0.5);
    btn.width = w;
    btn.height = h;

    let txt = game.add.text(btn.x, btn.y, name, {
      font: '25px Source code Pro',
      fill: 'black',
      align: 'center'
    })
    txt.anchor.setTo(0.5, 0.5);
  }

}
