class LoadingScene extends Phaser.Scene{
    constructor(){
        super("LoadingScene");
    }

    preload(){
        //Background
        this.load.image('loadBase', 'assets/images/LoadingBase.png');

        //Loading icon and word spritesheets
        this.load.spritesheet('loadIcon', 'assets/images/LoadingSprite.png', {
            frameWidth: 640,
            frameHeight: 540,
        });
        this.load.spritesheet('loadWord', 'assets/images/LoadingWordSprite.png', {
            frameWidth: 337,
            frameHeight: 45
        });

        //Positioning icon and word
        this.loadIcon = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadIcon');
        this.logo.anchor.setTo(0.5);
        this.loadWord = this.add.sprite(this.game.world.centerX, this.game.centerY + 145, 'loadWord');
        this.loadWord.anchor.setTo(0.5);
    }

    create(){
        //Creating animations
        createSprites(this);
        this.anims.create({
            key: 'loadIcon_anim',
            frames: this.anims.generateFrameNumbers('loadIcon'),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'loadWord_anim',
            frames: this.anims.generateFrameNumbers('loadIcon'),
            frameRate: 1,
            repeat: -1
        });
    }
}