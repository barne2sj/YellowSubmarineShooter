function loadReusedSprites(scene){
        //load submarine spritesheet
        scene.load.spritesheet("yellowsubmarine", "assets/images/YellowSubmarine.png", {
            frameWidth: 328,
            frameHeight: 144
        });
          // load submarine projectile spritesheet
        scene.load.spritesheet("SubmarineProjectile", "assets/images/SubmarineProjectile.png", {
            frameWidth:50,
            frameHeight:46
        });
        //load playerExplosion spritesheet
        scene.load.spritesheet("playerExplosion", "assets/images/explosionsmall.png", {
            frameWidth: 350,
            frameHeight: 296.5
        });
        //load smallEnemyExplosion spritesheet
        scene.load.spritesheet("smallEnemyExplosion", "assets/images/smallEnemyExplosion.png", {
            frameWidth: 418,
            frameHeight: 354
        });
        //load powerup images
        scene.load.image('PowerUp1', 'assets/images/PowerUp1.png');
        scene.load.image('PowerUp2', 'assets/images/PowerUp2.png');
        scene.load.image('PowerUp3', 'assets/images/PowerUp3.png');
        scene.load.image('sunclear', 'assets/images/day-layer.png');
        scene.load.image('suncloudy', 'assets/images/day-layer-cloudy.png');
        scene.load.image('moonclear', 'assets/images/night-layer.png');
        scene.load.image('mooncloudy', 'assets/images/night-layer-cloudy.png');
}

function createSprites(scene){
        //create submarine animation
        scene.anims.create({
            key: "submarine",
            frames: scene.anims.generateFrameNumbers("yellowsubmarine"),
            frameRate: 3,
            repeat: -1
        });
        //create submarine projectile animation
        scene.anims.create({
            key:"SubmarineProjectile_anim",
            frames: scene.anims.generateFrameNumbers("SubmarineProjectile"),
            frameRate:20,
            repeat:-1
        });

        //create player explosion anim
        scene.anims.create({
            key: "playerExplosion_anim",
            frames: scene.anims.generateFrameNumbers("playerExplosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        //create small enemy explosion anim
        scene.anims.create({
            key: "smallEnemyExplosion_anim",
            frames: scene.anims.generateFrameNumbers("smallEnemyExplosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
}

function loadWeather(scene, dayImage, nightImage){
    //create background sky and ground
    if(currentWeather != 'Clear' && currentWeather != ''){
        currentWeather = 'Cloudy';
    } else {
    currentWeather = 'Clear';
    }
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    if(currentHour >= 6 && currentHour <= 19) {
        scene.skyTile = scene.add.tileSprite(960,540,config.width, config.height, dayImage);
        if(currentWeather == 'Clear'){
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'sunclear');
        } else{
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'suncloudy');
        }
    } else {
        scene.skyTile = scene.add.tileSprite(960,540,config.width, config.height, nightImage);
        if(currentWeather == 'Clear'){
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'moonclear');
        } else{
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'mooncloudy');
        }
    }
  
}