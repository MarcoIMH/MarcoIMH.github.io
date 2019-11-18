import Torre from './src/torre.js';
import Base from './src/base.js';
import Enemigo from './src/enemigo.js';
import Nucleo from './src/nucleo.js';
import Unidad from './src/unidad.js';

//VARIABLES CONSTANTES
const costeTorreBase = 150;  //COSTE DE CREAR TORRE BASE
const costeTorreA = 150; //COSTE DE AUMENTAR A TORRE_A
const costeTorreB = 180; //COSTE DE AUMENTAR A TORRE_B
const costeTorreAA = 100; //COSTE DE MEJORAR LA TORRE_A
const costeTorreBB = 110; //COSTE DE MEJORAR LA TORRE_B

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.on("complete", () => { this.scene.start("main"); });
    this.load.image("base", "./assets/circulo_base.png");
    this.load.image("torre", "./assets/arquero1.png");
    this.load.image("torreA", "./assets/torreA.png");
    this.load.image("enemigo", "./assets/favicon.png");
    this.load.image("unidad", "./assets/esqueleto.png");
    this.load.image("nucleo", "./assets/nucleo.png");
  }

  Pool(scene, entities){
    this._group = scene.add.group();
    this._group.addMultiple(entities);
    this._group.children.iterate(c => {
      c.setAlive(false);
      c.setVisible(false);
    });
  }

  create() {
    let pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();

    this.ptosExp = 250; //PUNTOS ACTUALES DEL JUGADOR
    this.derrota = false;
    this.tiempoUltEnem; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoEnem = Phaser.Math.Between(10, 600); //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (CAMBIA DE MANERA ALEATORIA)
    console.log("Puntos de experiencia iniciales: " + this.ptosExp);

    //ARRAYS DE OBJETOS DEL JUEGO
    this.bases = this.add.group();
    this.torres = this.add.group();
    this.torresA = this.add.group();
    this.unidades = this.add.group();
    this.enemigos = this.add.group();

    //CREACIÓN DEL NÚCLEO
    this.nucleo = new Nucleo(this, 1250, 350, "nucleo");
    this.vidaNucleo = 1000;

    //POSICIONAMIENTO DE TODAS LAS this.BASES DEL NIVEL
    this.bases.add(new Base(this, 600, 450, "base"));
    this.bases.add(new Base(this, 250, 400, "base"));
    this.bases.add(new Base(this, 1000, 150, "base"));

    //CREACIÓN DE TORRES
    this.bases.children.iterate(item => {
      item.on('pointerdown', pointer => {
        if (this.ptosExp >= costeTorreBase) {
          this.torres.add(new Torre(this, item.x, item.y - 55, "torre"));
          this.ptosExp -= costeTorreBase;
          console.log("Puntos de experiencia: " + this.ptosExp);
          //DESTRUIMOS LA BASE PARA QUE NO SIGA CREANDO TORRES
          item.destroy();
        }
        else { console.log("No dispone de los puntos de experiencia suficientes"); }
      });
    });

    //CREACIÓN DE UNIDADES
    this.nucleo.on('pointerdown', pointer => {
      this.unidades.add(new Unidad(this, 1100, 350, "unidad"));
    });

    //CREACIÓN DE UN PRIMER ENEMIGO
    this.enemigos.add(new Enemigo(this, 0, 350, "enemigo"));
    this.tiempoUltEnem = 0;

    //SITUAMOS EL NÚCLEO DELANTE DEL TODO
    this.children.bringToTop(this.nucleo);

    //FONDO DE LA BARRA DE VIDA DEL NÚCLEO
    let graphics = this.add.graphics();
    graphics.fillStyle(0xFF0000, 1);
    graphics.fillRect(1170, 180, 150, 20);
  }

  update(time, delta) { 
    if (this.derrota == true) {
      this.scene.start("Derrota");
    }  

    //COLISIONES -- PROBAR A FUSIONAR LAS DOS CON UN ÚNICO RECORRIDO DE LOS ENEMIGOS         //********//
    //SI HAY TORRES EN EL MAPA
    if (this.enemigos != undefined && this.torres != undefined) {
      this.enemigos.children.iterate(enem => {    
        if (enem != undefined) { 
            this.torres.children.iterate(item => {        
              //ATAQUE TORRE->ENEMIGO
              if (enem.x > item.x - item.rango && enem.x < item.x + item.rango && enem.y > item.y - item.rango && enem.y < item.y + item.rango) {
                item.ataque(item, enem);
              }
            });
        }
        else { this.enemigos.remove(enem); }
      });
    }
    //SI HAY UNIDADES EN EL MAPA
    if (this.unidades != undefined && this.enemigos != undefined) {
      this.unidades.children.iterate(unid => {
        this.enemigos.children.iterate(enem => {
          this.physics.add.collider(unid, enem, unid.ataque, null, this);
        });
      });
    }

    //MOVIMIENTO
    if (this.enemigos != undefined) {
      this.enemigos.children.iterate(enem => {    
        if (enem != undefined) { 
          enem.movEnem();
          this.physics.add.collider(enem, this.nucleo, enem.ataqueNucleo, null, this);  //MOVER A COLISIONES CUANDO SE FUSIONEN         //********//
        }
      });
    }
    if (this.unidades != undefined) {
      this.unidades.children.iterate(item => {
        if (item != undefined) {
          item.mov();
        }
      });
    }

    //GENERACIÓN DE ENEMIGOS
    if (this.tiempoUltEnem >= this.tiempoEnem) {
      this.enemigos.add(new Enemigo(this, 0, 350, "enemigo"));
      this.tiempoUltEnem = 0;
      this.tiempoEnem = Phaser.Math.Between(10, 600);
    }
    else { this.tiempoUltEnem += 5; }
  }
}

// this.torres.children.iterate(item => {
//   //AUMENTO DE NIVEL DE LA TORRE BASE A TORRE_A
//   item.on('pointerdown', pointer => {
//     this.torresA.add(new Torre(this, item.x, item.y, "torreA"));
//     //Destruimos la torre anterior
//     item.destroy();
//   });
  
//   //ATAQUE TORRE->ENEMIGO
//   if (this.enem.x > item.x - item.rango && this.enem.x < item.x + item.rango && this.enem.y > item.y - item.rango && this.enem.y < item.y + item.rango) {
//     item.atTorre(this.enem, item);
//     //Si el enemigo se queda sin vida lo destruimos
//     if (this.enem.vida <= 0) { this.enem.destroy(); }
//   }
// });