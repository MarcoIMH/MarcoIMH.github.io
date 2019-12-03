import GameObjectsGO from "./gameObjects.js";

export default class Torre extends GameObjectsGO {
    constructor(scene, x, y, level, type){ 
        super(scene, 10, x, y, 50, type);
        this.game = scene;
        scene.add.existing(this);
        this.setScale(0.85);
        this.setInteractive();
        this.mejora(x, y, level);

        //VARIABLES AUXILIARES
        this.rango = 450;
        this.costeTorreA = 50;
        this.level = level;
    }

    //MEJORA DE TORRES -- PRUEBA BASE, MOVER A HERENCIAS DE LA TORRE                  //*********//
    mejora(p, q) {
        this.on('pointerdown', pointer => {
            if (this.game.ptosExp >= this.costeTorreA) {
                this.game.mejoraTorre(p, q, this);
                this.game.ptosExp -= this.costeTorreA;
                //this.destroy();
                switch (this.level) {
                    case 'O':
                        this.game.mejoraTorre(p, q, this);
                        break;
                    case 'A':
                        console.log("Hello");
                        break;
                    case 'B':
                        break;
                    default:
                        break;
                }
                console.log("Puntos de experiencia: " + this.game.ptosExp);
                this.muestraPtos("Ptos Exp: " + this.game.ptosExp);
            }
            else { console.log("No dispone de los puntos de experiencia suficientes"); }
        });
    }

    //ATAQUE DE LA TORRE
    ataque(torre, enemigo) { 
        if (enemigo.active == true) super.ataque(torre, enemigo);

        //SI EL ENEMIGO SE QUEDA SIN VIDA LO DESTRUIMOS
        if (enemigo.vida <= 0) {
            enemigo.onDestroy(enemigo.unidad);
            enemigo.destroy();
        }
    }

    preUpdate() {
        this.game.children.bringToTop(this);
    }
}