//create global variables
var createEnemyTimer = 0;
var enemyTimerRandomizer = Phaser.Math.Between(7, 10);
var createPowerUpTimer = 0;
var PowerUpTimerRandomizer = Phaser.Math.Between (20, 40);
var score = 0;
var playerDamage = 50;
var playerSpeed = 300;
var playerHealth = 300;
var playerMaxHealth = 300;
var bossHealth = 0;
var bossMaxHealth = 0;
var handBossJumpTimer = Phaser.Math.Between(20, 100);
var handBossJumpCount = 0;



class Level1 extends Phaser.Scene{
  constructor(){
    super("Level1");
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

    //load playerExplosion spritesheet
    this.load.spritesheet("playerExplosion", "assets/images/explosionsmall.png", {
      frameWidth: 350,
      frameHeight: 296.5
    });

    //load smallEnemyExplosion spritesheet
    this.load.spritesheet("smallEnemyExplosion", "assets/images/smallEnemyExplosion.png", {
      frameWidth: 418,
      frameHeight: 354
    });
    // load enemy1Projectile spritesheet
    this.load.spritesheet("enemy1Projectile", "assets/images/arrowsprite.png", {
      frameWidth:135,
      frameHeight:26
    });

    //load powerup images
    this.load.image('PowerUp1', 'assets/images/PowerUp1.png');
    this.load.image('PowerUp2', 'assets/images/PowerUp2.png');
    this.load.image('PowerUp3', 'assets/images/PowerUp3.png');

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
    //create player explosion anim
    this.anims.create({
      key: "playerExplosion_anim",
      frames: this.anims.generateFrameNumbers("playerExplosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    //create small enemy explosion anim
    this.anims.create({
      key: "smallEnemyExplosion_anim",
      frames: this.anims.generateFrameNumbers("smallEnemyExplosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });
    //create enemy1Projectile animation
    this.anims.create({
      key:"enemy1Projectile_anim",
      frames: this.anims.generateFrameNumbers("enemy1Projectile"),
      frameRate:20,
      repeat:-1
    });

    //create background sky and ground
    var currentWeather = weather();
    if(currentWeather != 'Clear' && currentWeather != ''){
      currentWeather = 'Cloudy';
    } else {
      currentWeather = 'Clear';
    }
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    if(currentHour >= 6 && currentHour <= 20) {
      this.skyTile = this.add.tileSprite(960,540,config.width, config.height, "skyday");
      if(currentWeather == 'Clear'){
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'sunclear');
      } else{
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'suncloudy');
      }
    } else {
      this.skyTile = this.add.tileSprite(960,540,config.width, config.height, "skynight");
      if(currentWeather == 'Clear'){
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'moonclear');
      } else{
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'mooncloudy');
      }
    }

    this.cloudImage1 = this.add.sprite(config.width + 250, config.height/2 + 200, "cloud1");
    this.cloudImage2 = this.add.sprite(config.width + 250, config.height/2, "cloud2");
    this.cloudImage3 = this.add.sprite(config.width + 250, config.height/2 - 200, "cloud3");

    this.clouds = this.physics.add.group();

    this.clouds.add(this.cloudImage1);
    this.clouds.add(this.cloudImage2);
    this.clouds.add(this.cloudImage2);

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

    //create enemy1projectile group
    this.enemyProjectiles = this.add.group();

    //create powerup groups
    this.PowerUps1 = this.add.group();
    this.PowerUps2 = this.add.group();
    this.PowerUps3 = this.add.group();

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.enemies, this.hurtEnemy, null, this);

    //enemy and player overlap
    this.physics.add.overlap(this.submarine, this.enemies, this.crashDamage, null, this);

    //enemy projectile and player overlap
    this.physics.add.overlap(this.submarine, this.enemyProjectiles, this.playerHit, null, this);

    //player collision with power ups
    this.physics.add.overlap(this.submarine, this.PowerUps1, this.HealthUp, null, this);
    this.physics.add.overlap(this.submarine, this.PowerUps2, this.DamageUp, null, this);
    this.physics.add.overlap(this.submarine, this.PowerUps3, this.SpeedUp, null, this);

    //set depth of submarine
    this.submarine.setDepth(5);
  }

  update ()
  { 
    //moves background sky and ground
    this.skyTile.tilePositionX +=1.0;

    //shoot projectile
    if(Phaser.Input.Keyboard.JustDown(this.shoot)){
        this.shootSubmarineProjectile();
    }
    
    //create enemy
    this.checkCreateEnemyTimer(enemyTimerRandomizer);
    this.checkCreatePowerUpTimer(PowerUpTimerRandomizer);

    //Checks for player movement
    this.movePlayerManager();

    //iterate through each element of projectile group
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var SubmarineProjectile = this.projectiles.getChildren()[i];
      SubmarineProjectile.update();
    }

    //iterate through each element of enemyprojectile group
    for(var i = 0; i < this.enemyProjectiles.getChildren().length; i++){
      var EnemyProjectile = this.enemyProjectiles.getChildren()[i];
      EnemyProjectile.update();
    }

    //iterate through each element of enemies group
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      var Enemy = this.enemies.getChildren()[i];
      Enemy.update(); 
      if(Enemy.update()%240 ==0){
        var littleEnemyProjectile = new enemyProjectile(this, Enemy.x, Enemy.y)
      }  
    }

    //iterate through PowerUps1 group
    for(var i = 0; i < this.PowerUps1.getChildren().length; i++){
      var thisPowerUp1 = this.PowerUps1.getChildren()[i];
      thisPowerUp1.update();
    }
    //iterate through PowerUps2 group
    for(var i = 0; i < this.PowerUps2.getChildren().length; i++){
      var thisPowerUp2 = this.PowerUps2.getChildren()[i];
      thisPowerUp2.update();
    }
    //iterate through PowerUps3 group
    for(var i = 0; i < this.PowerUps3.getChildren().length; i++){
      var thisPowerUp3 = this.PowerUps3.getChildren()[i];
      thisPowerUp3.update();
    }
    
    //check for level 1 complete
    this.checkWinLevel1();

    //move clouds across screen
    this.moveCloud(this.cloudImage1);
    if(this.cloudImage1.x < (config.width * 0.75) || this.cloudImage2.x < config.width){
      this.moveCloud(this.cloudImage2);
    }
    if(this.cloudImage2.x < (config.width * 0.75) || this.cloudImage3.x < config.width){
      this.moveCloud(this.cloudImage3);
    }
    
    
  }

  //move cloud
  moveCloud(cloudToMove){
    cloudToMove.x -= 5;
    if(cloudToMove.x < 0)
    {
      this.resetCloud(cloudToMove);
    }
  }
  // reset cloud
  resetCloud(cloudToMove){
    cloudToMove.x = config.width + 250;
    var randomY = Phaser.Math.Between(200, config.height);
    cloudToMove.y = randomY;
    var randomForLayer = Phaser.Math.Between(0, config.height)
    if(randomForLayer < config.height / 2)
    {
      cloudToMove.setDepth(10);
    }else{
      cloudToMove.setDepth(0);
    }
  }


  //createEnemyTimer check
  checkCreateEnemyTimer(time){
    if(createEnemyTimer > time){
      createEnemyTimer = 0;
      enemyTimerRandomizer = Phaser.Math.Between(7, 10);
      this.createEnemies();
    }
    else{
      createEnemyTimer += 1/60;
    }
  }

  checkCreatePowerUpTimer(time){
    if(createPowerUpTimer > time){
      createPowerUpTimer = 0;
      PowerUpTimerRandomizer = Phaser.Math.Between(20,40);
      this.createPowerUp();
    }
    else{
      createPowerUpTimer += 1/60;
    }
  }
  
  shootSubmarineProjectile(){
    var SubmarineProjectile = new SubmarineProjectiles(this);
  }
  createEnemies(){
    var enemyNumber = 1;
    var Enemy = new Enemies(this, enemyNumber);
  }

  createPowerUp(){
    var PowerUpNumber = Phaser.Math.Between(1, 100);
    var PlayerPowerUp = new PowerUp(this, PowerUpNumber);
    //var PlayerPowerUp = new PowerUp(this, 25);
  }

  //projectile & enemy collision
  hurtEnemy(projectiles, enemies) {
    enemies.health -= playerDamage;
    projectiles.destroy();
    if (enemies.health <= 0){
      score += enemies.starthealth;
      this.scoreLabel.text = "SCORE " + score;
      enemies.destroy();
      var smallEnemyExplosion = new smallEnemyExplosionClass(this, enemies.x, enemies.y);
      projectiles.destroy();
    }
  }

  playerHit(submarine, enemyProjectiles){
    playerHealth -=25;
    this.playerHealthLabel.text = "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    enemyProjectiles.destroy();
    if(playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }
  crashDamage(submarine, enemies){
    playerHealth -= enemies.health;
    this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    enemies.destroy();
    var smallEnemyExplosion = new smallEnemyExplosionClass(this, enemies.x, enemies.y);
    if (playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

  //collisions with power ups
  HealthUp(submarine, powerup1){
    if (playerHealth < playerMaxHealth - 150){
      playerHealth += 200;
      playerMaxHealth +=50;
      this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
      powerup1.destroy();
    }
    else {
      var healthDifference = playerMaxHealth - playerHealth;
      playerMaxHealth +=50;
      playerHealth += (healthDifference + 50);
      this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
      powerup1.destroy();
    }
  }

  DamageUp(submarine, powerup2){
    playerDamage +=50;
    this.damageLabel.text = "PlayerDamage: " + playerDamage;
    powerup2.destroy();
  }

  SpeedUp(submarine, powerup3){
    playerSpeed += 100;
    this.speedLabel.text = "PlayerSpeed: " + playerSpeed;
    powerup3.destroy();
  }
  //check win and set boss health
  checkWinLevel1(){
    if (score >= 200){
      bossHealth = 1200;
      bossMaxHealth = 1200;
      this.scene.start('Level1Boss');
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