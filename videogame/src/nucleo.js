export default class Nucleo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.setScale(3);
        this.vida = 1000;
    }

    onDestroy(){
        //Finalizar la partida blabla
    }
}