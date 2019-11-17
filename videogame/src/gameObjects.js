export default class GameObjectsGO extends Phaser.GameObjects.Sprite {
    constructor(scene, daño, x, y, cad, type){
        super(scene, x, y, type);

        //VARIABLES
        this.daño = daño;
        // this.posicion = (x, y);
        this.cadencia = cad;
        this.cadenciaAux = 0;
        this.sprite = type;
    }

    //ATAQUE: OBJ1 -> OBJ2
    ataque(obj1, obj2){
        if (obj1.cadenciaAux <= 0){
            obj2.vida -= obj1.daño;
            console.log("Vida: " + obj2.vida);
            obj1.cadenciaAux = obj1.cadencia;
        }
        else {
            obj1.cadenciaAux -= 20;
        }
        //Si obj2 se queda sin vida lo destruimos
        if (obj2.vida <= 0) {
            obj2.onDestroy();
            obj2.destroy();
        }
    }
}