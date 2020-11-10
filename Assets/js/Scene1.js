// class Scene1 extends Phaser.Scene {
//     constructor() {
//       super("playGame");
//     }
    
    
//     create() {
//         skyTile = this.add.tileSprite(0,0,config.width, config.height, "sky");
//         groundTile = this.add.tileSprite(0,0,config.width, config.height, "land");


//       //  this.handintro1 = this.add.sprite(config.width/2 - 50, 0, "handboss");
//         //this.handintro1.play("handintro");
//       //  this.moveBoss(hand);

//     }

//     moveBoss(boss, speed) {
//         // if(boss.y <= config.height/2){
//         //     boss.y += speed; 
//         // }
//         // if(boss.x <= config.width){
//         //     boss.x += speed;
//         // } else {
//         //     this.resetBoss(boss);
//         // }
        
        
//     }

//     resetBoss(boss) {
//         boss.x = 0;
//         boss.y = 0;
//     }

//     update()   {
//         //this.moveBoss(this.bossIntro1, 2);
//         this.moveBackground(null, null, groundTile, 0, skytile, 0.5);
//     }


// }