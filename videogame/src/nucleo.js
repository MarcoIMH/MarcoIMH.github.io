export default class Nucleo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(3);
        this.setInteractive();
        //scene.physics.world.enable(this);
        //this.body.immovable = true;
        this.vidaNucleo = 1000;
        //this.setVisible(false);
    }
    pierdeVidaNucleo(daño){
        this.vidaNucleo -= daño;
        console.log(this.vidaNucleo);
    }
}