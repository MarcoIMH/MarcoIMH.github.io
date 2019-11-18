import GameObjectsGO from "./gameObjects.js";

export default class Unidad extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 15, x, y, 20000, type);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.1);
        
        //VARIABLES AUXILIARES
        this.t = x / 25;    //REPRESENTA LA POSICIÓN RELATIVA X EN EL MAPA
        this.n = y + Phaser.Math.Between(-60, 60);  //REPRESENTA LA POSICIÓN Y EN EL MAPA
        this.pausa = false;
        this.vida = 110;
        this.enemigo = undefined;

        scene.children.moveDown(this);
    }

    //MOVIMIENTO DE LA UNIDAD
    mov(){
        if (!this.pausa) {
            this.setPosition(this.t * 25, this.n + 150 * Math.sin(this.t/7));
            this.t -= 0.1;
        }
        if (this.t <= 10) { this.pausa = true; }
    }

    //ATAQUE UNIDAD <-> ENEMIGO (SÓLO COGE LA COLISIÓN UNA VEZ, NO SE PUEDE HACER EN LAS DOS CLASES)
    //OBJ1 == UNIDAD    OBJ2 == ENEMIGO
    ataque(obj1, obj2){ 
        if (obj1.enemigo == undefined && obj2.unidad == undefined) {    //AMBOS HAN DE ESTAR UNDEFINED PARA SABER QUE NO ESTÁN YA ATACANDO A ALGUIEN
            obj1.pausa = true;
            obj2.pausa = true;
            obj1.enemigo = obj2;
            obj2.unidad = obj1;
        }   //FALTARÍA AJUSTAR EL ATAQUE PQ ASÍ ATACAN A LOS QUE PASAN A SUS LADOS TB         //********//
        super.ataque(obj1, obj2);
        super.ataque(obj2, obj1);
    }

    //ACCIONES CORRESPONDIENTES TRAS LA ELIMINACIÓN DE UNA UNIDAD
    onDestroy(enem){
        if(enem != undefined){
            enem.pausa = false;
            enem.unidad = undefined;
            enem.cadenciaAux = 0;
        }
    }
}