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
            obj1.cadenciaAux = obj1.cadencia;
        }
        else {
            obj1.cadenciaAux -= 1;
        }
    }

    muestraPtos() {
        let posPtosX;
        let graphics = this.game.add.graphics();        
        this.game.ptos.destroy();
        if (this.game.ptosExp < 10)    posPtosX = 360;
        else if (this.game.ptosExp < 100)    posPtosX = 355;
        else if (this.game.ptosExp < 1000)    posPtosX = 340;
        else    posPtosX = 330;
        this.game.ptos = this.game.add.text(posPtosX, 50, this.game.ptosExp, { font: "40px Courier", fill: "#FFFFFF"});
    }
}