const cadencia = 500;   //0.5 segundos

export default class Torre extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        scene.add.existing(this);
        this.setScale(0.85);
        this.setInteractive();

        //VARIABLES DE LAS TORRES
        this.ataque = 10;
        this.rango = 150;
        this.i = 0;
    }

    //ATAQUE DE LA TORRE
    atTorre(obj1, obj2){
        if (obj2.i <= 0){
            obj1.vida -= obj2.ataque;
            console.log("Vida enemigo: " + obj1.vida);
            obj2.i = cadencia;
        }
        else {
            obj2.i -= 20;
        }
    }
}