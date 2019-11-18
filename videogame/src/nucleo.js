export default class Nucleo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.setScale(3);
        this.setInteractive();
        this.vida = 100;
    }

    onDestroy() {
        this.game.derrota = true;
    }
}