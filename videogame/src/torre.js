import GameObjectsGO from "./gameObjects.js";

export default class Torre extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 10, x, y, 50, type);
        this.game = scene;
        scene.add.existing(this);
        this.setScale(0.85);
        this.setInteractive();

        //VARIABLES AUXILIARES
        this.rango = 450;
        this.costeTorreA = 150;
    }

    //MEJORA DE TORRES -- PRUEBA BASE, MOVER A HERENCIAS DE LA TORRE                  //*********//
    mejora() {
        this.on('pointerdown', pointer => {
          if (this.game.ptosExp >= this.costeTorreA) {
        //     this.game.torresA.add(new Torre(this, item.x, item.y - 55, "torreA"));
        //     this.game.ptosExp -= this.costeTorreA;
        //     console.log("Puntos de experiencia: " + this.game.ptosExp);
        //     this.muestraPtos("Ptos Exp: " + this.game.ptosExp);
        //     //DESTRUIMOS LA TORRE ANTERIOR
        //     this.destroy();
        //   }
        //   else { console.log("No dispone de los puntos de experiencia suficientes"); }
        }
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