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
        this.n = y + Phaser.Math.Between(-50, 50);  //REPRESENTA LA POSICIÓN Y EN EL MAPA
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
        //TENEMOS QUE ASEGURARNOS QUE ATACARÁ (CADENCIA_AUX = 0)
        obj1.cadenciaAux = 0;
        super.ataque(obj1, obj2);
        obj1.destroy();
        //ACTUALIZAMOS LA BARRA DE VIDA DEL NÚCLEO
        obj2.barraSalud();
        if (obj2.vida <= 0) obj2.onDestroy();
    }

    //ACCIONES CORRESPONDIENTES TRAS LA ELIMINACIÓN DE UN ENEMIGO
    onDestroy(){
        if(this.unidad != undefined){
            this.unidad.pausa = false;
            this.unidad.enemigo = undefined;
            this.unidad.cadenciaAux = 0;
        }
        this.game.ptosExp += this.exp;  //SUMAMOS LOS PTOS DE EXP DEL ENEMIGO
        super.muestraPtos();    //ACTUALIZAMOS LOS PTOS DE EXP
    }

    preUpdate() {
        this.movEnem();
    }
}