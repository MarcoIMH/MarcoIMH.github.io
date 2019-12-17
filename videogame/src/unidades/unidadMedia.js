import Unidad from "./unidad.js";

export default class UnidadMedia extends Unidad {
    constructor(scene, x, y, pR){ 
        super(scene, 15, x, y, pR, 20000, "unidadM");
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.1);
        
        //VARIABLES AUXILIARES
        this.vida = 100;
        this.game.tiempoUnid = 5000; 
    }
}