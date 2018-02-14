
class Board extends Phaser.Group{

  constructor(game, text, txtpos){
    super(game);
    this.txt = this.setTxt(text, txtpos);
    this.game.stage.addChild(this.txt);
    this.currentStreak = 0;
    this.hitCount = 0;
    this.streakThreshold = 7;
  }

  preload(){

  }
  update(){

    if (this.txt.x + (this.txt.currentIndx * this.txt.charToScrnRatio) < 1){
      this.txt.stop();
    } else {
      this.txt.move();
    }
    // this.txt.move();
  }

  setTxt(text, txtpos){
    return new MovingText(this.game, txtpos.x, txtpos.y, text, {
      font: '45px Source code Pro',
      align: 'center',
      fill: '#000000'
    });
  }

  setTxtPos(x){
    this.txt.x = x;
  }

  resetStreak(){
    this.currentStreak = 0;
  }

  canTriggerEffect(){
    return this.currentStreak % this.streakThreshold === 0;
  }

  addtext(txt){
    this.txt.text += ' ' + txt;
  }

}
