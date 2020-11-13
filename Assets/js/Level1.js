//create global variables
var createEnemyTimer = 0;
var enemeyTimerRandomizer = Phaser.Math.Between(7, 10);
var score = 0;
var playerDamage = 50;
var playerSpeed = 300;
var playerHealth = 100;
var playerMaxHealth = 100;



class Level1 extends Phaser.Scene{
  constructor(){
    super("Level1");
  }

  preload(){
    
    //load background land and sky
    //this.load.image('land', 'assets/images/LoveLower.png');
    this.load.image('sky', 'assets/images/LoveUpper.png');

    //load submarine spritesheet
    this.load.spritesheet("yellowsubmarine", "assets/images/YellowSubmarine.png", {
      frameWidth: 328,
      frameHeight: 144
    });
    // load submarine projectile spritesheet
    this.load.spritesheet("SubmarineProjectile", "assets/images/SubmarineProjectile.png", {
      frameWidth:50,
      frameHeight:46
    });
    //load enemy 1 spritesheet
    this.load.spritesheet("Enemy1", "assets/images/bluemeaniesprite.png", {
      frameWidth: 224,
      frameHeight: 175,
    });


    //load pixelfont
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    
  }
  create(){
    //create submarine animation
    this.anims.create({
      key: "submarine",
      frames: this.anims.generateFrameNumbers("yellowsubmarine"),
      frameRate: 10,
      repeat: -1
    });
    //create submarine projectile animation
    this.anims.create({
      key:"SubmarineProjectile_anim",
      frames: this.anims.generateFrameNumbers("SubmarineProjectile"),
      frameRate:20,
      repeat:-1
    });
    //create enemy 1 animation
    this.anims.create({
      key:"Enemy1_anim",
      frames: this.anims.generateFrameNumbers("Enemy1"),
      frameRate:1,
      repeat:-1
    });
    //create background sky and ground
    this.skyTile = this.add.tileSprite(960,540,config.width, config.height, "sky");
    //this.groundTile = this.add.tileSprite(960,540,config.width, config.height, "land");

    //create the submarine
    this.submarine = this.physics.add.sprite(config.width / 2 - 600, config.height/ 3, "yellowsubmarine");

    //play submarine animation
    this.submarine.play("submarine");

    //set world bounds on submarine
    this.submarine.setCollideWorldBounds(true);

    //set world bounds
    this.physics.world.setBoundsCollision();


    //add keys
    this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.tester = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    //Score graphics
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

    // add top label
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: " + score, 50);
    this.playerHealthLabel = this.add.bitmapText(600, 5, "pixelFont", "PlayerHealth: " + playerHealth + "/" + playerMaxHealth, 50)
    this.speedLabel = this.add.bitmapText(1100, 5, "pixelFont", "PlayerSpeed: " + playerSpeed, 50);
    this.damageLabel = this.add.bitmapText(1500, 5, "pixelFont", "PlayerDamage: " + playerDamage, 50);

    //create a projectiles group
    this.projectiles = this.add.group();

    //create enemies group
    this.enemies = this.add.group();

    //create enemy hp group
    this.enemyHPGraphics = this.add.group();
    this.enemyHPLabel = this.add.group();

    

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.enemies, this.hurtEnemy, null, this);

  }

  update ()
  { 
    //moves background sky and ground
    this.skyTile.tilePositionX +=1.0;
    //this.groundTile.tilePositionX +=2.0;

    //shoot projectile
    if(Phaser.Input.Keyboard.JustDown(this.shoot)){
        this.shootSubmarineProjectile();
    }
    
    //create enemy
    this.checkCreateEnemyTimer(enemeyTimerRandomizer);


    //Checks for player movement
    this.movePlayerManager();

    //iterate through each element of projectile group
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var SubmarineProjectile = this.projectiles.getChildren()[i];
      SubmarineProjectile.update();
    }
    //iterate through each element of enemies group
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      var Enemy = this.enemies.getChildren()[i];
      var eachEnemyHPLabel = this.enemyHPLabel.getChildren()[0];
      var eachEnemyHPGraphics = this.enemyHPGraphics.getChildren()[0];
      if(eachEnemyHPLabel.x <=0){
        eachEnemyHPLabel.destroy();
        eachEnemyHPGraphics.destroy();
        
      }
      Enemy.update();
      this.hpLabel.text = Enemy.getHP() + "/200";
      
    }
    
    
    
  }
  //createEnemyTimer check
  checkCreateEnemyTimer(time){
    if(createEnemyTimer > time){
      createEnemyTimer = 0;
      enemeyTimerRandomizer = Phaser.Math.Between(2, 5);
      this.createEnemies();
    }
    else{
      createEnemyTimer += 1/60;
    }
  }
  
  shootSubmarineProjectile(){
    var SubmarineProjectile = new SubmarineProjectiles(this);
  }
  createEnemies(){
    var Enemy = new Enemies(this);

    //hp graphics
    this.hpgraphics = this.add.graphics();
    this.hpgraphics.fillStyle(0x000000, 1);
    this.hpgraphics.beginPath();
    this.hpgraphics.moveTo(Enemy.body.x+55, Enemy.body.y-30);
    this.hpgraphics.lineTo(Enemy.body.x+185, Enemy.body.y-30);
    this.hpgraphics.lineTo(Enemy.body.x+185, Enemy.body.y+0);
    this.hpgraphics.lineTo(Enemy.body.x+55, Enemy.body.y+0);
    this.hpgraphics.lineTo(Enemy.body.x+55, Enemy.body.y-30);
    this.hpgraphics.closePath();
    this.hpgraphics.fillPath();

    this.hpLabel = this.add.bitmapText(Enemy.body.x+60, Enemy.body.y-28, "pixelFont", Enemy.getHP() + "/" + Enemy.getStartHP(), 40);
    this.physics.world.enableBody(this.hpgraphics);
    this.physics.world.enableBody(this.hpLabel);
    this.hpgraphics.body.velocity.x = -150;
    this.hpLabel.body.velocity.x = -150;

    this.enemyHPGraphics.add(this.hpgraphics);
    this.enemyHPLabel.add(this.hpLabel);

  }

  //projectile & enemy collision
  hurtEnemy(projectiles, enemies) {
    enemies.health -= playerDamage;
    projectiles.destroy();
    if (enemies.health <= 0){
      score += enemies.starthealth;
      this.scoreLabel.text = "SCORE " + score;
      enemies.destroy();
      projectiles.destroy();
      this.hpLabel.destroy();
      this.hpgraphics.destroy();
    }
  }
  
  movePlayerManager(){
    //move left
    if(this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown){
      this.submarine.body.velocity.x = -playerSpeed;
      this.submarine.body.velocity.y=0;
    }
    //move right
    else if(!this.leftKey.isDown && this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown){
      this.submarine.body.velocity.x = playerSpeed;
      this.submarine.body.velocity.y=0;
    }
    //move up
    else if (!this.leftKey.isDown && !this.rightKey.isDown && this.upKey.isDown && !this.downKey.isDown){
      this.submarine.body.velocity.y = -playerSpeed;
      this.submarine.body.velocity.x = 0;
    }
    //move down
    else if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && this.downKey.isDown){
      this.submarine.body.velocity.y = playerSpeed;
      this.submarine.body.velocity.x = 0;
    }
    //move up left
    else if(this.leftKey.isDown && !this.rightKey.isDown && this.upKey.isDown && !this.downKey.isDown){
      this.submarine.body.velocity.x = -playerSpeed;
      this.submarine.body.velocity.y = -playerSpeed;
    }
    //move up right
    else if(!this.leftKey.isDown && this.rightKey.isDown && this.upKey.isDown && !this.downKey.isDown){
      this.submarine.body.velocity.x = playerSpeed;
      this.submarine.body.velocity.y = -playerSpeed;
    }
    //move down left
    else if (this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && this.downKey.isDown){
      this.submarine.body.velocity.y = playerSpeed;
      this.submarine.body.velocity.x = -playerSpeed;
    }
    //move down right
    else if (!this.leftKey.isDown && this.rightKey.isDown && !this.upKey.isDown && this.downKey.isDown){
      this.submarine.body.velocity.y = playerSpeed;
      this.submarine.body.velocity.x = playerSpeed;
    }
    //stop moving
    else{
      this.submarine.body.velocity.x = 0;
      this.submarine.body.velocity.y=0;
    }

  }
  
}