class Enemies extends Phaser.GameObjects.Sprite{
  constructor(scene, enemyNumber){
    var x = config.width;
    var y = Phaser.Math.Between(200, config.height - 200);
    var health;
    var starthealth;
    var attackTimer;
    //enemy 1 creation
    if (enemyNumber == 1){
    super(scene, x, y, "Enemy1");
    this.attackTimer = 0;
    scene.add.existing(this);
    this.play("Enemy1_anim");
    scene.physics.world.enableBody(this);

    this.body.velocity.x= -150;
    this.health = 200;
    this.starthealth = 200;

    scene.enemies.add(this);
    }
  }
  update(){
    if(this.enemyNumber =1){
      this.attackTimer ++;
      if(this.x < -50){
      this.destroy();
      }
      return this.attackTimer;
      //if (this.attackTimer %120 ==0){
        //return this.attackTimer;
      //}
    }
  }
  getHP(){
    return this.health;
  }
  getStartHP(){
    return this.starthealth;
  }
}