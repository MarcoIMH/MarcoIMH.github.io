const cadencia = 2000;   //2 segundos

export default class Enemigo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1.5);

        //VARIABLES DE LOS ENEMIGOS 
        this.t = 0;
        this.ataque = 50;
        this.pausa = false;
        this.i = 0;
        this.vida = 100;
    }

    //MOVIMIENTO DEL ENEMIGO
    movEnem(){
        if (!this.pausa) {
            this.setPosition(this.t*25, 350 + 150*Math.sin(this.t/7));
            this.t += 0.1;
        }
    }

    //ATAQUE DEL ENEMIGO
    atEnem(obj1, obj2) {
        obj2.pausa = true;
        if (obj2.i <= 0){
            obj1.vida -= obj2.ataque;
            console.log("Vida núcleo: " + obj1.vida);
            obj2.i = cadencia;
        }
        else {
            obj2.i -= 20;
        }
    }
}