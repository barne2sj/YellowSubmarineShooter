class Level1Boss extends Phaser.Scene{
  constructor(){
    super("Level1Boss");

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

    //load boss spritesheet
    this.load.spritesheet("handBoss", "assets/images/HandBossSprite.png", {
      frameWidth: 510,
      frameHeight: 295
    });

    // load submarine projectile spritesheet
    this.load.spritesheet("SubmarineProjectile", "assets/images/SubmarineProjectile.png", {
      frameWidth:50,
      frameHeight:46
    });

    //load playerExplosion spritesheet
    this.load.spritesheet("playerExplosion", "assets/images/explosionsmall.png", {
      frameWidth: 350,
      frameHeight: 296.5
    });

    //load bossExplosion spritesheet
    this.load.spritesheet("bossExplosion", "assets/images/BossExplosion.png", {
      frameWidth: 418,
      frameHeight: 354
    });

    // load hand boss Projectile spritesheet
    this.load.spritesheet("handBossProjectile", "assets/images/HandSprite.png", {
      frameWidth:292,
      frameHeight:60
    });

    //load pixelfont
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

  }

  create(){
    this.bossAttackTimer = 0;


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

    //create hand boss animation
    this.anims.create({
      key: "handBoss_anim",
      frames: this.anims.generateFrameNumbers("handBoss"),
      frameRate: 10,
      repeat: -1
    });

    //create hand boss projectile animation
    this.anims.create({
      key:"playerExplosion_anim",
      frames: this.anims.generateFrameNumbers("playerExplosion"),
      frameRate:20,
      repeat:-1
    });

    //create player explosion animation
    this.anims.create({
      key: "bossExplosion_anim",
      frames: this.anims.generateFrameNumbers("bossExplosion"),
      frameRate: 10,
      repeat: -1
    });

    //create boss explosion animation
    this.anims.create({
      key:"handBossProjectile_anim",
      frames: this.anims.generateFrameNumbers("handBossProjectile"),
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
    //create cloud images
    this.cloudImage1 = this.add.sprite(config.width + 250, config.height/2 + 200, "cloud1");
    this.cloudImage2 = this.add.sprite(config.width + 250, config.height/2, "cloud2");
    this.cloudImage3 = this.add.sprite(config.width + 250, config.height/2 - 200, "cloud3");
    //create cloud group
    this.clouds = this.physics.add.group();
    //add clouds to group
    this.clouds.add(this.cloudImage1);
    this.clouds.add(this.cloudImage2);
    this.clouds.add(this.cloudImage2);

    //create the submarine
    this.submarine = this.physics.add.sprite(config.width / 2 - 600, config.height/ 3, "yellowsubmarine");

    //play submarine animation
    this.submarine.play("submarine");

    //create boss
    this.handBoss = this.physics.add.sprite(config.width -250, config.height - 150, "handBoss");

    //play hand boss animation
    this.handBoss.play("handBoss_anim");

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

    //boss health graphics
    this.bossHPGraphics = this.add.graphics();
    this.bossHPGraphics.fillStyle(0x000000, 1);
    this.bossHPGraphics.beginPath();
    this.bossHPGraphics.moveTo(1600, 775);
    this.bossHPGraphics.lineTo(1850, 775);
    this.bossHPGraphics.lineTo(1850, 825);
    this.bossHPGraphics.lineTo(1600, 825);
    this.bossHPGraphics.lineTo(1600, 775);
    this.bossHPGraphics.closePath();
    this.bossHPGraphics.fillPath();
    this.bossHPLabel = this.add.bitmapText(1610, 780, "pixelFont", "HP:" + bossHealth + "/" + bossMaxHealth, 50);

    this.physics.world.enableBody(this.bossHPGraphics);
    this.physics.world.enableBody(this.bossHPLabel);
    //create a projectiles group
    this.projectiles = this.add.group();  
    
    //create boss projectile group
    this.bossProjectiles = this.add.group();

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.handBoss, this.hurtBoss, null, this);

    //enemy and player overlap
    this.physics.add.overlap(this.submarine, this.handBoss, this.crashDamage, null, this);

    //enemy projectile and player overlap
    this.physics.add.overlap(this.submarine, this.bossProjectiles, this.playerHit, null, this);

    //set depth of submarine
    this.submarine.setDepth(5);
  }

  update(){
    //moves background sky and ground
    this.skyTile.tilePositionX +=1.0;

    //shoot projectile
    if(Phaser.Input.Keyboard.JustDown(this.shoot)){
        this.shootSubmarineProjectile();
    }

    //Checks for player movement
    this.movePlayerManager();

    //iterate through each element of projectile group
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var SubmarineProjectile = this.projectiles.getChildren()[i];
      SubmarineProjectile.update();
    }

    for(var i = 0; i < this.bossProjectiles.getChildren().length; i++){
      var bossProjectile = this.bossProjectiles.getChildren()[i];
      bossProjectile.update();
    }

    //move clouds across screen
    this.moveCloud(this.cloudImage1);
    if(this.cloudImage1.x < (config.width * 0.75) || this.cloudImage2.x < config.width){
      this.moveCloud(this.cloudImage2);
    }
    if(this.cloudImage2.x < (config.width * 0.75) || this.cloudImage3.x < config.width){
      this.moveCloud(this.cloudImage3);
    }

    //check boss jump timer
    this.checkBossJumpTimer(this.handBoss, this.bossHPLabel, this.bossHPGraphics);

    //check boss attack timer
    this.checkBossAttackTimer();

  }
  //boss attack timer
  checkBossAttackTimer(){
    if(this.bossAttackTimer > 180){
      var bossProjectile = new handBossProjectile(this, this.handBoss.x - 300, this.handBoss.y - 20);
      this.bossAttackTimer = 0;
    }
    else{
      this.bossAttackTimer++;
    }

  }

  //boss Jump timer
  checkBossJumpTimer(handboss, hplabel, hpgraphics){
    if(handBossJumpCount >= handBossJumpTimer){
      handBossJumpCount =0;
      if(handboss.body.velocity.y == 0){
        handboss.body.velocity.y -= 400;
        hplabel.body.velocity.y -= 400;
        hpgraphics.body.velocity.y -= 400;
      }
      else if(handboss.body.velocity.y == 400){
        handboss.body.velocity.y -= 400;
        hplabel.body.velocity.y -= 400;
        hpgraphics.body.velocity.y -= 400;
        handBossJumpTimer = Phaser.Math.Between(20, 100);
      }
      else{
        handboss.body.velocity.y += 800;
        hplabel.body.velocity.y += 800;
        hpgraphics.body.velocity.y += 800;
      }
    }
    else{handBossJumpCount++}
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
  //shoot submarine projectile
  shootSubmarineProjectile(){
    var SubmarineProjectile = new SubmarineProjectiles(this);
  }

  //projectile & enemy collision
  hurtBoss(projectiles, handBoss) {
    bossHealth -= playerDamage;
    projectiles.destroy();
    this.bossHPLabel.text = "HP:" + bossHealth + "/" + bossMaxHealth;
    if (bossHealth<= 0){
      score += bossMaxHealth;
      handBoss.destroy();
      console.log("winner");
    }
  }

  //player hit by enemy projectile
  playerHit(submarine, bossProjectiles){
    playerHealth -=200;
    this.playerHealthLabel.text = "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    bossProjectiles.destroy();
    if(playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

  //player hit boss
  crashDamage(submarine, handBoss){
    playerHealth -= handBoss.health;
    this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    handBoss.destroy();
    if (playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
    else{console.log("boss dead");}
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