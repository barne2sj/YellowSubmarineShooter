//from http://labs.phaser.io/edit.html?src=src/game%20objects\graphics\health%20bars%20demo.js
class HealthBar {

    constructor (scene, x, y, maxHealth)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = maxHealth;
        this.maxValue = maxHealth;
        this.p = 76 / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease (scene, amount)
    {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();
        scene.add.existing(this.bar);

        return (this.value === 0);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 240, 100);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 20, this.y + 20, 160, 60);

        if (this.value < this.maxHealth * .30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        this.bar.fillRect(this.x + 20, this.y + 20, 180, 60);
    }

}