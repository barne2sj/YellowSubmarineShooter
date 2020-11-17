class deadScene extends Phaser.Scene{
  constructor(){
    super("deadScene");
    var playerScore; 
  }


  preload(){


  }
  
  create(){
    this.scoreLabel = this.add.bitmapText(250, config.height /2 - 100, "pixelFont", "SCORE: " + score, 200);

  }
  
  update(){


  }
}