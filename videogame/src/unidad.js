import GameObjectsGO from "./gameObjects.js";

export default class Unidad extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 15, x, y, 2000, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.1);
        
        //VARIABLES AUXILIARES
        this.t = 44;
        this.pausa = false;
        this.vida = 110;
        this.enemigo;
    }

    //MOVIMIENTO DE LA UNIDAD
    mov(){
        if (!this.pausa) {
            this.setPosition(this.t * 25, 350 + 150 * Math.sin(this.t/7));
            this.t -= 0.1;
        }
        if (this.t <= 10) { this.pausa = true; }
    }

    //ATAQUE DE LA UNIDAD (CADA UNIDAD ATACA A UN ENEMIGO DISTINTO)
    ataque(obj1, obj2){ 
        if (obj2.unidad == obj1 || obj2.unidad == undefined) {
            obj1.pausa = true;
            obj2.unidad = obj1;
    
            super.ataque(obj1, obj2);
        }
    }

    //ACCIONES CORRESPONDIENTES TRAS LA ELIMINACIÓN DE UNA UNIDAD
    onDestroy(){
        if(this.enemigo != undefined){
            this.enemigo.pausa = false;
        }
    }
}