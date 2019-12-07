import Unidad from "./unidad.js";

export default class Lelanto extends Unidad {
    constructor(scene, x, y){ 
        super(scene, 15, x, y, 20000, "unidad");
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.1);
        
        //VARIABLES AUXILIARES
        this.vida = 110;
        this.game.tiempoUnid = 5000;    //ACTUALIZAMOS EL VALOR EN GAME.JS
    }
}