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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
    ball.anchor.set(0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.set(150, -150);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function(){
        alert('Game over!');
        location.reload();
    }, this);

    paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
  }
  
  update(){
    this.dissappearTimer ++;
    if(this.dissappearTimer >= 1000){this.destroy();}


  }
}