var timer1 = 0;
var animationTimer1 = 0;
var timer2 = 0;
var animationTimer2 = 0;

const Play = {

  preload: function(){

  },

  create: function(){
    this.gameBg = this.add.sprite(0, 0, 'gameBg');
    this.initBoard(game.global.playerTxt);
    this.initOpponentBoard(game.global.enemyTxt);
    this.color = {wrong: '#ef472b', correct: '#81ff11'};
    this.effects = ['addtxt', 'flicker'];
    this.shouldFlikrenmytxt = false;
    this.shouldFlikrtxt = false;

    let streaks = this.board.currentStreak;
    this.streakTxt = this.add.text(9, 5, `x ${streaks}`, {font: '30px Source code Pro', fill: '#81ff11', align: 'center'});
    this.streakTxt.anchor.setTo(0.2, 0);

    this.lettersTxt = this.add.text(30, 60, 'left 0', {font: '30px Source code Pro', fill: '#ef472b', align: 'center'});
    this.lettersTxt.anchor.setTo(0.2, 0);
  },

  update: function(){

    if (this.shouldFlikrtxt  && animationTimer1 <= 5000){
      timer1 += game.time.elapsed;
      if ( timer1 >= 300 ){
        timer1 -= 300;
        this.board.txt.visible = !this.board.txt.visible;
      }
      animationTimer1 += game.time.elapsed;
    } else {
      timer1 = 0;
      animationTimer1 = 0;
      this.shouldFlikrtxt = false;
    }

    if (this.shouldFlikrenmytxt && animationTimer2 <= 5000){
      timer2 += game.time.elapsed;
      if ( timer2 >= 300 ){
        timer2 -= 300;
        this.opponentBoard.txt.visible = !this.opponentBoard.txt.visible;
      }
      animationTimer2 += game.time.elapsed;
    } else {
      timer2 = 0;
      animationTimer2 = 0;
      this.shouldFlikrenmytxt = false;
    }

    this.streakTxt.text = `x${this.board.currentStreak}`;
    this.lettersTxt.text = `left ${this.board.txt.text.length - this.board.hitCount}`;
  },

  initBoard: function(text) {

    this.board = new Board(this.game, text, {
      x: this.game.world._width,
      y: this.game.world.centerY / 2
    });

    this.game.input.keyboard.addCallbacks(this, null, this.handleKeyInput, null);
  },

  handleKeyInput: function(e){
    let board = this.board;
    let isCorrect = false;
    let textLen = board.txt.text.length;
    let currentIndx = board.txt.currentIndx;

    if (currentIndx < textLen - 1) {
      if (board.txt.text[currentIndx] !== e.key){
        board.txt.stop();
        board.txt.changeColor('#ef472b');
        board.resetStreak();
      }
      else {
        isCorrect = true;
        board.hitCount++;
        board.currentStreak++;
        board.txt.changeColor('#81ff11');
        board.txt.continue();
        this.createScoreAnimation(500, 200, e.key, "#39d179");

        if ( board.txt.text[currentIndx + 1] === ' '){
          board.txt.currentIndx++;
        }
        if (board.canTriggerEffect()){
          board.currentStreak = 0;
          this.selectEffect();
        }
      }

      Client.playerTyped(board.txt.x, board.txt.currentIndx, isCorrect);
    }
    else {
      Client.playerWon();
      this.gameWon();
    }

  },

  initOpponentBoard: function(text){
    this.opponentBoard = new Board(this.game, text, {
      x: this.game.world._width,
      y: this.game.world._height * 0.75
    });
  },

  updateOponentTxt: function(x, txtIndx, isCorrect){
    let board = this.opponentBoard;
    //board.txt.setIndx(txtIndx);
    // board.setTxtPos(x);
    //console.log(isCorrect, txtIndx);
    if (!isCorrect){
      board.txt.stop();
      board.txt.changeColor('#ef472b');
    }
    else {
      board.txt.changeColor('#81ff11');
      if ( board.txt.text[board.txt.currentIndx + 1] === ' '){
        board.txt.currentIndx++;
      }
      board.txt.continue();
    }

  },

  selectEffect(){
    let effect = this.effects[Math.floor(Math.random() * this.effects.length)];

    let txt = this.getRandomWord();
    console.log(effect);

    switch (effect) {
      case 'addtxt':
          Client.addText(txt);
          this.addTxtToOpponent(txt);
          break;
      case 'flicker':
           Client.flickerEnemyText();
           this.flickerEnmyTxt()
          break;
      // case 'dwindle':
      //     Client.addText(txt);
      //     this.addTxtToOpponent(txt);
      //     break;
      default:
          return;
    }

  },

  getRandomWord(){
    let words = this.board.txt.text.split(' ');
    return words[Math.floor(Math.random() * words.length)];
  },

  addTxtToBoard(txt){
    this.board.addtext(txt);
    this.createScoreAnimation(this.world.centerX, this.world.centerY + 100, txt.length, '#ef472b');
  },

  addTxtToOpponent(txt) {
    this.opponentBoard.addtext(txt);
  },

  gameOver(){
    // game.board.destroy();
    // game.opponentBoard.destroy();
   this.board.txt.destroy();
   this.opponentBoard.txt.destroy();
   this.game.state.start('GameOver');
  },
  gameWon(){
    this.board.txt.destroy();
    this.opponentBoard.txt.destroy();
    this.game.state.start('GameWon');
  },

  createScoreAnimation: function(x, y, message, color){

    var me = this;

    var scoreFont = "90px Arial";

    //Create a new label for the score
    var scoreAnimation = this.add.text(x, y, message, {font: scoreFont, fill: color, stroke: "#ffffff", strokeThickness: 15});
    scoreAnimation.anchor.setTo(0.5, 0);
    scoreAnimation.align = 'center';

    //Tween this score label to the total score label
    var scoreTween = this.add.tween(scoreAnimation).to({x: this.world.centerX, y: 50}, 800, Phaser.Easing.Exponential.In, true);

    //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
    scoreTween.onComplete.add(function(){
        scoreAnimation.destroy();
    }, this);
  },
  flickertxt(){
    console.log('afafaa');
    this.shouldFlikrtxt = true;
  },

  flickerEnmyTxt() {
    this.shouldFlikrenmytxt = true;
  }

}

