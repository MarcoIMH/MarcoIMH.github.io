const posNucleo = 1120;

export default class Enemigo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(1.5);
        //VARIABLES DE LOS ENEMIGOS 
        //var x = 0;
        this.t = 0;
    }

    //MOVIMIENTO DEL ENEMIGO
    movEnem(){
        if (this.x < posNucleo){
            this.setPosition(this.t*25, 350 + 150*Math.sin(this.t/7));
            this.t += 0.1;
        }
    }
}
