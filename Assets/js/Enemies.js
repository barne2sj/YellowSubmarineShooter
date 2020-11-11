class Enemies extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var x = config.width;
    var y = Phaser.Math.Between(200, config.height - 200);
    
    super(scene, x, y, "Enemy1");
    scene.add.existing(this);
    

    this.play("Enemy1_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x= -150;
    scene.enemies.add(this);
  }
  update(){
    if(this.x < -50){this.destroy();}
  }
}