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
    this.load.image("torreB", "./assets/torreB.png");
    this.load.image("enemigo", "./assets/favicon.png");
    this.load.image("unidad", "./assets/esqueleto.png");
    this.load.image("nucleo", "./assets/nucleo.png");
    this.load.image("background", "./assets/MapaV2.png");
  }

  Pool(scene, entities){
    this._group = scene.add.group();
    this._group.addMultiple(entities);
    this._group.children.iterate(c => {
      c.setAlive(false);
      c.setVisible(false);
    });

    Pool.prototype.spawn = function (x, y) {
      var entity = this._group.getFirstDead();
      if (entity) {
        entity.x = x;
        entity.y = y;
        entity.setAlive(true);
        entity.setVisible(true);
      }
      return entity;
    }
  }

  create() {
    let pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();

    this.ptosExp = 250; //PUNTOS ACTUALES DEL JUGADOR
    this.derrota = false;
    this.tiempoUltEnem; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoEnem = Phaser.Math.Between(10, 600); //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (CAMBIA DE MANERA ALEATORIA)
    this.unidCargada = true;  //MARCA SI SE PUEDE INVOCAR LA UNIDAD CORRESPONDIENTE O NO
    this.tiempoUltUnid; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoUnid;  //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (DEPENDERÁ SEGÚN EL ÚLTIMO ENEMIGO CREADO)
    this.opcionA;
    this.opcionB;
    console.log("Puntos de experiencia iniciales: " + this.ptosExp);

    this.add.image(0, 0, "background").setOrigin(0);

    //ARRAYS DE OBJETOS DEL JUEGO
    this.bases = this.add.group();
    this.torres = this.add.group();
    this.unidades = this.add.group();
    this.enemigos = this.add.group();

    //CREACIÓN DEL NÚCLEO
    this.nucleo = new Nucleo(this, 1250, 350, "nucleo");
    this.vidaNucleo = 1000;

    //POSICIONAMIENTO DE TODAS LAS this.BASES DEL NIVEL
    this.bases.add(new Base(this, 600, 450, "base"));
    this.bases.add(new Base(this, 250, 375, "base"));
    this.bases.add(new Base(this, 1000, 145, "base"));

    //CREACIÓN DE TORRES
    this.bases.children.iterate(item => {
      item.on('pointerdown', pointer => {
        if (this.ptosExp >= costeTorreBase) {
          this.torres.add(new Torre(this, item.x, item.y - 55, 'O', "torre"));
          this.ptosExp -= costeTorreBase;
          console.log("Puntos de experiencia: " + this.ptosExp);
          item.muestraPtos("Ptos Exp: " + this.ptosExp);
          //DESTRUIMOS LA BASE PARA QUE NO SIGA CREANDO TORRES
          item.destroy();
        }
        else { console.log("No dispone de los puntos de experiencia suficientes"); }
      });
    });

    // //MEJORA DE TORRES -- PRUEBA BASE, MOVER A HERENCIAS DE LA TORRE                  //*********//
    // this.torres.children.iterate(item => {
    //   item.on('pointerdown', pointer => {
    //     if (this.ptosExp >= costeTorreA) {
    //       this.torres.add(new Torre(this, item.x, item.y - 55, "torreA"));
    //       this.ptosExp -= costeTorreA;
    //       console.log("Puntos de experiencia: " + this.ptosExp);
    //       item.muestraPtos("Ptos Exp: " + this.ptosExp);
    //       //DESTRUIMOS LA TORRE ANTERIOR
    //       item.destroy();
    //     }
    //     else { console.log("No dispone de los puntos de experiencia suficientes"); }
    //   });
    // });

    //CREACIÓN DE UNIDADES
    this.nucleo.on('pointerdown', pointer => {
      if (this.unidCargada) {
        this.unidades.add(new Unidad(this, 1100, 350, "unidad"));
        this.tiempoUltUnid = 0;
        this.unidCargada = false;
      }
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

    //FONDO PTOS DE EXP
    graphics.fillStyle(0x696969, 1);
    graphics.fillRect(50, 50, 550, 80);
    this.add.text(75, 65, "Ptos Exp: " + this.ptosExp, { font: "60px Courier", fill: "#FFFFFF"});
  }

  update(time, delta) { 
    if (this.derrota == true) {
      this.scene.start("Derrota");
    }  

    //COLISIONES
    //SI HAY TORRES EN EL MAPA
    if (this.enemigos != undefined) {
      this.enemigos.children.iterate(enem => {    
        if (enem != undefined) { 
          //COLISIÓN CON NÚCLEO
          this.physics.add.collider(enem, this.nucleo, enem.ataqueNucleo, null, this);
          this.torres.children.iterate(item => {        
            //ATAQUE TORRE->ENEMIGO
            if (enem.x > item.x - item.rango && enem.x < item.x + item.rango && enem.y > item.y - item.rango && enem.y < item.y + item.rango) {
              item.ataque(item, enem);
            }
          });
          //SI HAY UNIDADES EN EL MAPA
          if (this.enemigos != undefined) {
            this.unidades.children.iterate(unid => {
              this.physics.add.collider(unid, enem, unid.ataque, null, this);
            });
          }
        }
        else { this.enemigos.remove(enem); }
      });
    }

    //GENERACIÓN DE ENEMIGOS
    if (this.tiempoUltEnem >= this.tiempoEnem) {
      this.enemigos.add(new Enemigo(this, 0, 350, "enemigo"));
      this.tiempoUltEnem = 0;
      this.tiempoEnem = Phaser.Math.Between(100, 3000);
    }
    else {  this.tiempoUltEnem += delta;  }
    //GENERACIÓN DE UNIDADES
    if (!this.unidCargada) {
      if (this.tiempoUltUnid >= this.tiempoUnid) {  this.unidCargada = true;  }
      else {  this.tiempoUltUnid += delta;  }
    }
  }
  mejoraTorre(p, q, object) {
    console.log("Mejora");
    switch (object.level) {
      case 'O':
          this.ops = this.add.image(p, q - 50, "opciones");
          this.opcionA = this.add.image(p - 70, q - 70, "torreA").setScale(0.5);
          this.opcionB = this.add.image(p + 70, q - 70, "torreB").setScale(0.3);
          this.opcionA.on('pointerdown', pointer => {
            this.torres.add(new Torre(this, p, q, 'A', "torreA"));
            this.torres.remove(object);
            object.destroy();
            this.ops.delete();
            this.opcionA.delete();
            this.opcionB.delete();
          });
          this.opcionB.on('pointerdown', pointer => {
            this.torres.add(new Torre(this, p, q, 'B', "torreB"));
            this.torres.remove(object);
            object.destroy();
            this.ops.delete();
            this.opcionA.delete();
            this.opcionB.delete();
          });
          setTimeout(() => {
            this.ops.delete();
            this.opcionA.delete();
            this.opcionB.delete();
          }, 2500);
          break;
      case 'A':
          this.torres.add(new Torre(this, p, q, 'AA', "torreAA"));
          this.torres.remove(object);
          object.destroy();
          break;
      case 'B':
          this.torres.add(new Torre(this, p, q, 'BB', "torreBB"));
          this.torres.remove(object);
          object.destroy();
          break;
    }
  }
}

// this.torres.children.iterate(item => {
//   //AUMENTO DE NIVEL DE LA TORRE BASE A TORRE_A
//   item.on('pointerdown', pointer => {
//     this.torres.add(new Torre(this, item.x, item.y, "torreA"));
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