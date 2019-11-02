export default class Torre extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.85);
        this.setInteractive();
        //this.setVisible(false);
    }
}