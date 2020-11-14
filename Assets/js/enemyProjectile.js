class enemyProjectile extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    

    super(scene, x, y, "enemy1Projectile");
    scene.add.existing(this);

    this.play("enemy1Projectile_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x= -500;
    scene.enemyProjectiles.add(this);
  }
  update(){
    if(this.x > config.width){this.destroy();}
  }
}