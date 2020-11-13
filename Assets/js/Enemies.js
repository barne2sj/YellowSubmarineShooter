class Enemies extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var x = config.width;
    var y = Phaser.Math.Between(200, config.height - 200);
    var health;
    var starthealth;
    //enemy 1 creation
    super(scene, x, y, "Enemy1");

    scene.add.existing(this);
    this.play("Enemy1_anim");
    scene.physics.world.enableBody(this);

    this.body.velocity.x= -150;
    this.health = 200;
    this.starthealth = 200;

    scene.enemies.add(this);

  }
  update(){
    if(this.x < -50){
      this.destroy();
    }
  }
  getHP(){
    return this.health;
  }
  getStartHP(){
    return this.starthealth;
  }
}