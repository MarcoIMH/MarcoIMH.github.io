import GameObjectsGO from "./gameObjects.js";

export default class Torre extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 10, x, y, 50, type);
        scene.add.existing(this);
        this.setScale(0.85);
        this.setInteractive();

        //VARIABLES AUXILIARES
        this.rango = 450;
    }

    //ATAQUE DE LA TORRE
    ataque(torre, enemigo) { 
        if (enemigo.active == true) super.ataque(torre, enemigo);
    }
}