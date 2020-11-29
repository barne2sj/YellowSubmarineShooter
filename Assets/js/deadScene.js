class deadScene extends Phaser.Scene{
  constructor(){
    super("deadScene");
    var playerScore; 
  }

  preload(){
    //load background land and sky
    this.load.image('skynight', 'assets/images/LoveUpper-night.png');
    this.load.image('skyday', 'assets/images/LoveUpper.png');
    this.load.image('sunclear', 'assets/images/day-layer.png');
    this.load.image('suncloudy', 'assets/images/day-layer-cloudy.png');
    this.load.image('moonclear', 'assets/images/night-layer.png');
    this.load.image('suncloudy', 'assets/images/night-layer-cloudy.png');
    this.load.image('cloud1', 'assets/images/cloud1.png');
    this.load.image('cloud2', 'assets/images/cloud2.png');
    this.load.image('cloud3', 'assets/images/cloud3.png');
    this.load.image('replay', 'assets/images/replay-button.png');
  }
  
  create(){
    this.scoreLabel = this.add.bitmapText(250, config.height /2 - 100, "pixelFont", "SCORE: " + score, 200);
    
  }
  
  update(){
    this.dissappearTimer ++;
    if(this.dissappearTimer >= 1000){this.destroy();}


  }
}