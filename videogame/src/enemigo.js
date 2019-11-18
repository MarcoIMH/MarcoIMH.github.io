import GameObjectsGO from './gameObjects.js';

export default class Enemigo extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 20, x, y, 20000, type);
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1.5);
        
        //VARIABLES AUXILIARES
        this.t = x;    //REPRESENTA LA POSICIÓN RELATIVA X EN EL MAPA
        this.n = y + Phaser.Math.Between(-60, 60);  //REPRESENTA LA POSICIÓN Y EN EL MAPA
        this.pausa = false;
        this.vida = 100;
        this.unidad = undefined;
        this.exp = 50;

        scene.children.moveDown(this);
    }

    //MOVIMIENTO DEL ENEMIGO
    movEnem(){
        if (!this.pausa) {
            this.setPosition(this.t * 25, this.n + 150 * Math.sin(this.t/7));
            this.t += 0.1;
        }
    }

    //ATAQUE DEL ENEMIGO AL NÚCLEO, ATACA UNA VEZ Y SE DESTRUYE
    ataqueNucleo(obj1, obj2) {
        super.ataque(obj1, obj2);
        obj1.destroy();
    }

    //ACCIONES CORRESPONDIENTES TRAS LA ELIMINACIÓN DE UN ENEMIGO
    onDestroy(unid){
        if(unid != undefined){
            unid.pausa = false;
            unid.enemigo = undefined;
            unid.cadenciaAux = 0;
        }
        this.game.ptosExp += this.exp;
        console.log("Puntos de experiencia: " + this.game.ptosExp);
    }
}