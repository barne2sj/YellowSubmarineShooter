var currentWeather = '';


//function for populating the weather variable
(async function(){
  currentWeather = await getWeather();
})();


class Level2 extends Phaser.Scene{
  constructor(){
    super("Level2");
  }

  preload(){
    
    //load background land and sky
    this.load.image('waterNight', 'assets/images/waterNight.png');
    this.load.image('waterDay', 'assets/images/waterDay.png');
    this.load.image('sunclear', 'assets/images/day-layer.png');
    this.load.image('suncloudy', 'assets/images/day-layer-cloudy.png');
    this.load.image('moonclear', 'assets/images/night-layer.png');
    this.load.image('suncloudy', 'assets/images/night-layer-cloudy.png');    

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
    //load enemy 2 spritesheet
    this.load.spritesheet("Enemy2", "assets/images/BlueSub.png", {
      frameWidth: 328,
      frameHeight: 144,
    });

    //load enemy 3 spritesheet
    this.load.spritesheet("Enemy3", "assets/images/PinkSub.png", {
      frameWidth: 328,
      frameHeight: 144,
    });

    //load enemy 4 spritesheet
    this.load.spritesheet("Enemy4", "assets/images/GreenSub.png", {
      frameWidth: 328,
      frameHeight: 144,
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
    // load enemySubProjectile spritesheet
    this.load.spritesheet("enemySubProjectile", "assets/images/torpedo.png", {
      frameWidth:111,
      frameHeight:25
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
    //create enemy 2 animation
    this.anims.create({
      key:"Enemy2_anim",
      frames: this.anims.generateFrameNumbers("Enemy2"),
      frameRate:1,
      repeat:-1
    });
    //create enemy 3 animation
    this.anims.create({
      key:"Enemy3_anim",
      frames: this.anims.generateFrameNumbers("Enemy3"),
      frameRate:1,
      repeat:-1
    });
    //create enemy 4 animation
    this.anims.create({
      key:"Enemy4_anim",
      frames: this.anims.generateFrameNumbers("Enemy4"),
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
    //create enemySubProjectile animation
    this.anims.create({
      key:"enemySubProjectile_anim",
      frames: this.anims.generateFrameNumbers("enemySubProjectile"),
      frameRate:20,
      repeat:-1
    });

    //create background sky and ground
    var currentWeather = getWeather();
    if(currentWeather != 'Clear' && currentWeather != ''){
      currentWeather = 'Cloudy';
    } else {
      currentWeather = 'Clear';
    }
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    if(currentHour >= 6 && currentHour <= 20) {
      this.skyTile = this.add.tileSprite(960,540,config.width, config.height, "waterDay");
      if(currentWeather == 'Clear'){
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'sunclear');
      } else{
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'suncloudy');
      }
    } else {
      this.skyTile = this.add.tileSprite(960,540,config.width, config.height, "waterNight");
      if(currentWeather == 'Clear'){
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'moonclear');
      } else{
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'mooncloudy');
      }
    }


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
    levelMultiplier = 2;
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

    //create powerups
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
        if(Enemy.projectileNumber < 1){
          var littleEnemyProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 1);
        }
        if(Enemy.projectileNumber >=1 && Enemy.projectileNumber <= 4){
          var straightProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 2);
          var upProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 3);
          var downProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 4);
        }
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
    this.checkWinLevel2();
  
  }

  

  //createEnemyTimer check
  checkCreateEnemyTimer(time){
    if(createEnemyTimer > time){
      createEnemyTimer = 0;
      enemyTimerRandomizer = Phaser.Math.Between(4, 6);
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
    var enemyNumber = Phaser.Math.Between(1, 4);
    var Enemy = new Enemies(this, enemyNumber, levelMultiplier);
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
    playerHealth -=(25 * levelMultiplier);
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
  checkWinLevel2(){
    if (score >= 2000){
      bossHealth = 5000;
      bossMaxHealth = 5000;
      this.scene.start('Level2Boss');
      //console.log("level 2 win")
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