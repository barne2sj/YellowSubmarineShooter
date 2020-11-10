var config;
var game;
var gameSettings = {
    playerSpeed: 200,
    restingSpeed: 0,
  }

window.onload = function(){
    config = {
    width: 1920,
    height: 1080,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.Center_BOTH
    },
    scene: [Level1, Level1Boss],
    physics:{
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

game = new Phaser.Game(config);

}


/*var config;
var game;
var gameSettings;
var platforms;
var stars;
var score =0;
var scoreText; 
var skyTile;
var groundTile;
var handIntro1;
var handBossSprite;

window.onload = function() {
    config = {
        
        width: 1920,
        height: 1080,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: {y:300},
                debug: false
            }
        }
    };

    game = new Phaser.Game(config);
}

function preload ()
{
    this.load.image('land', 'assets/images/LoveLower.png');
    this.load.image('sky', 'assets/images/LoveUpper.png');
    this.load.spritesheet('handentrance', 'assets/images/HandSprite.png', {
        frameHeight: 60,
        frameWidth: 292
    });

  
    this.load.spritesheet('handboss', 'assets/images/handBossSprite.png', {
        frameHeight: 295,
        frameWidth: 510
    });

    this.load.spritesheet("yellowsubmarine", "assets/images/YellowSubmarine.png", {
        frameWidth: 552,
        frameHeight: 242
      });

    
}

function create ()
{
    this.anims.create({
        key: "handintro",
        frames: this.anims.generateFrameNumbers("handentrance",{ start: 0, end: 2 }),
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: "handBossAnimation",
        frames: this.anims.generateFrameNumbers("handboss"),
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: "submarine",
        frames: this.anims.generateFrameNumbers("yellowsubmarine"),
        frameRate: 5,
        repeat: -1
      });


    
   // this.handintro1.play("handintro");



    this.skyTile = this.add.tileSprite(960,540,config.width, config.height, "sky");
    this.groundTile = this.add.tileSprite(960,540,config.width, config.height, "land");

    this.handIntro1 = this.add.sprite(0, 0, "handentrance");
    this.handIntro1.play("handintro");

    this.handBossSprite = this.add.sprite(1500, 500, "handboss");
    this.handBossSprite.play("handBossAnimation");
    this.handBossSprite.visible = false;

    
    this.submarine = this.add.sprite(config.width / 2 - 600, config.height/ 3, "yellowsubmarine");
    
    this.submarine.play("submarine");
}

function update ()
{    
    moveBackground(this.skyTile,2.5);
    moveBackground(this.groundTile, 0);
    moveBoss(this.handIntro1, 8, this.handBossSprite);
}


function moveBackground(layer, layerSpeed) {
    layer.tilePositionX += layerSpeed;
}

function moveBoss(bossToMove, speed, newBossAnim) {
    if(bossToMove.y <= config.height/2){
        bossToMove.y += speed; 
    }
    if(bossToMove.x <= config.width){
        bossToMove.x += speed;
    } else {
        bossToMove.destroy();
        newBossAnim.visible = true;
        
    }
}

function resetBoss(boss) {
    boss.x = 0;
    boss.y = 0;
}
*/