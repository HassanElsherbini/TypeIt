

class MovingText extends Phaser.Text{
  constructor(game, x, y, text, style){
    super(game, x, y, text, style);
    this.speed = 4;
    this.direction = -1;
    this.currentIndx = 0;
    this.charToScrnRatio = this.width / this.text.length;
  }

  changeColor(color){
    this.addColor(color, this.currentIndx);
    this.addColor('#000', this.currentIndx + 1);
  }

  move(){
    this.x += this.speed * this.direction;
  }

  stop(){
    this.speed = 0;
  }

  continue(){
    this.speed = 2;
    this.currentIndx++;
  }

  setIndx(indx){
    this.currentIndx = indx;
  }
}
