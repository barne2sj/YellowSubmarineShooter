class LoadingScene extends Phaser.Scene{
    constructor(){
        super("LoadingScene");
    }

    preload(){
        //Background
        this.load.image('loadBase', 'assets/images/LoadingBase.png');

        //Loading icon and word spritesheets
        this.load.spritesheet('loadIcon', 'assets/images/LoadingSprite.png');
        this.load.spritesheet('loadWord', 'assets/images/LoadingWordSprite.png');

        
    }
}