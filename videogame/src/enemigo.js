import GameObjectsGO from "./gameObjects.js";

export default class Enemigo extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 20, x, y, 2000, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1.5);
        
        //VARIABLES AUXILIARES
        this.t = 0;
        this.pausa = false;
        this.vida = 100;
        this.unidad;
    }

    //MOVIMIENTO DEL ENEMIGO
    movEnem(){
        if (!this.pausa) {
            this.setPosition(this.t * 25, 350 + 150 * Math.sin(this.t/7));
            this.t += 0.1;
        }
    }

    //ATAQUE DEL ENEMIGO (CADA ENEMIGO ATACA A UNA UNIDAD DISTINTA)
    ataque(obj1, obj2) { 
        if (obj2.enemigo == obj1 || obj2.enemigo == undefined) {
            obj1.pausa = true;
            obj2.enemigo = obj1;

            super.ataque(obj1, obj2);
        }
    }

    onDestroy(){
        if(this.unidad != undefined){
            this.unidad.pausa = false;
        }
    }
}