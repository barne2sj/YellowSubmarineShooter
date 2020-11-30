class deadScene extends Phaser.Scene{
  constructor(){
    super("deadScene");
    var playerScore; 
  }

  startGame(){
    document.getElementById('Level1').style.display = 'none';
  }
  replay(){
    document.getElementById('deadScene').style.display = 'none';
    buttonGo.style.display = 'none';
    replayButton = 'replay';
    Image.Computer.src = 'images/replay-button.png';
    document.getElementById.style.backgroundColor = 'yellow';

    deselctAll();
    location.reload();
  }
  go(){
    var textEndTitle = document.getElementById('textEndTitle');
    var textEndMessage = document.getElementById('textEndMessage');
    if (points == 0) {
    if(playerScore = 1000) {
      level = 'Level1Boss';
    }
    else if(playerScore = 2000) {
      level = 'Level2Boss';
    }
    else (playerScore = 3000) => {
      level = 'Level3Boss';
    }
  }

  document.getElementById('endScreen').style.display ='block';

  //graphics
  var graphics = this.add.graphics();
  graphics.fillStyle(0x000000, 1);
  graphics.beginPath();
  graphics.moveTo(0,0);
  graphics.lineTo(config.width, 0);
  graphics.lineTo(config.width, 80);
  graphics.lineTo(0, 80);
  graphics.lineTo(0, 0);
  graphics.closePath();
  graphics.fillPath();


}
  //preload(){
    
  //}
  
  //create(){
    //this.scoreLabel = this.add.bitmapText(250, config.height /2 - 100, "pixelFont", "SCORE: " + score, 200);
    
  //}
  
  //update(){
    //this.dissappearTimer ++;
    //if(this.dissappearTimer >= 1000){this.destroy();}


  //}
}