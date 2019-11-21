export default class GameObjectsGO extends Phaser.GameObjects.Sprite {
    constructor(scene, daño, x, y, cad, type){
        super(scene, x, y, type);
        this.game = scene;
        //VARIABLES
        this.daño = daño;
        this.cadencia = cad;    //LA CADENCIA IRÁ DISMINUYENDO HASTA LLEGAR A '0'
        this.cadenciaAux = 0;
    }

    preload() {
        this.w = this.sys.game.config.width / 2;
        this.h = this.sys.game.config.height / 2;
    }

    //ATAQUE: OBJ1 -> OBJ2
    ataque(obj1, obj2) {
        if (obj1.cadenciaAux <= 0){
            obj2.vida -= obj1.daño;
            console.log("Vida: " + obj2.vida);
            obj1.cadenciaAux = obj1.cadencia;
        }
        else {
            obj1.cadenciaAux -= 1;
        }
    }

    muestraPtos(ptos) {
        let graphics = this.game.add.graphics();
        graphics.fillStyle(0x696969, 1);
        graphics.fillRect(50, 50, 550, 80);
        this.game.add.text(75, 65, ptos, { font: "60px Courier", fill: "#FFFFFF"});
    }
}