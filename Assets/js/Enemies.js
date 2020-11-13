class Enemies extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var x = config.width;
    var y = Phaser.Math.Between(200, config.height - 200);
    var health;

    //enemy 1 creation
    super(scene, x, y, "Enemy1");

    scene.add.existing(this);
    this.play("Enemy1_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x= -150;
    this.health = 200;
    //hp graphics
    var hpgraphics = scene.add.graphics();
    hpgraphics.fillStyle(0x000000, 1);
    hpgraphics.beginPath();
    hpgraphics.moveTo(x - 100, y-100);
    hpgraphics.lineTo(x+100, y-100);
    hpgraphics.lineTo(x+100, y-70);
    hpgraphics.lineTo(x-100, y-70);
    hpgraphics.lineTo(x-100, y-100);
    hpgraphics.closePath();
    hpgraphics.fillPath();

    this.hp = health;
    this.hpLabel = scene.add.bitmapText(x- 90, y-98, "pixelFont", this.health + "/200", 40);
    scene.physics.world.enableBody(hpgraphics);
    scene.physics.world.enableBody(this.hpLabel);
    hpgraphics.body.velocity.x = -150;
    this.hpLabel.body.velocity.x = -150;


    scene.enemies.add(this);

  }
  update(){
    if(this.x < -50){
      this.destroy();
    }
  }

}