import Torre from './src/torre.js';
import Base from './src/base.js';
import Enemigo from './src/enemigo.js';
import Nucleo from './src/nucleo.js';
import Unidad from './src/unidad.js';

//VARIABLES CONSTANTES
const costeTorreBase = 150;  //COSTE DE CREAR TORRE BASE
const costeTorreA = 180; //COSTE DE AUMENTAR A TORRE_A
const costeTorreB = 200; //COSTE DE AUMENTAR A TORRE_B
const costeTorreAA = 120; //COSTE DE MEJORAR LA TORRE_A
const costeTorreBB = 150; //COSTE DE MEJORAR LA TORRE_B

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {  
    this.load.on("complete", () => { this.scene.start("main"); });
    this.load.image("base", "./assets/circulo_base.png");
    this.load.image("torre", "./assets/torreBase.png");
    this.load.image("torreA", "./assets/torreA.png");
    this.load.image("torreB", "./assets/torreB.png");
    this.load.image("opciones", "./assets/opciones.png");
    this.load.image("enemigo", "./assets/favicon.png");
    this.load.image("unidad", "./assets/esqueleto.png");
    this.load.image("nucleo", "./assets/nucleoColor.png");
    this.load.image("background", "./assets/MapaV2.png");
    this.load.image("fondoCols", "./assets/FondoColumnas.png");
    this.load.image("barraExp", "./assets/BarraExp.png");
    this.load.image("barraOleada", "./assets/BarraOleada.png");
    this.load.image("barraUnidades", "./assets/BarraUnid.png");
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
    this.victoria = false;
    this.tiempoUltEnem; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoEnem = Phaser.Math.Between(10, 600); //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (CAMBIA DE MANERA ALEATORIA)
    this.unidCargada = true;  //MARCA SI SE PUEDE INVOCAR LA UNIDAD CORRESPONDIENTE O NO
    this.tiempoUltUnid; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoUnid;  //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (DEPENDERÁ SEGÚN EL ÚLTIMO ENEMIGO CREADO)
    this.panelOpciones = false;
    this.opcionA;
    this.opcionB;
    this.unid0;

    //MOVER A UNA CLASE DE NIVELES                //**********//
    this.pausaOleada = false;
    this.numEnems = 0;
    this.numOleada = 1;
    this.oleada1 = 10;
    this.oleada2 = 15;
    this.oleada3 = 20;
    this.oleada4 = 25;

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
    this.bases.add(new Base(this, 270, 375, "base"));
    this.bases.add(new Base(this, 600, 450, "base"));
    this.bases.add(new Base(this, 1000, 145, "base"));

    //CREACIÓN DE TORRES
    this.bases.children.iterate(item => {
      item.on('pointerdown', pointer => {
        if (this.ptosExp >= costeTorreBase) {
          this.torres.add(new Torre(this, item.x, item.y - 45, 'O', "torre"));
          this.ptosExp -= costeTorreBase;
          item.muestraPtos(this.ptosExp);
          //DESTRUIMOS LA BASE PARA QUE NO SIGA CREANDO TORRES
          item.destroy();
        }
        else { console.log("No dispone de los puntos de experiencia suficientes"); }
      });
    });
    
    let graphics = this.add.graphics();

    //BARRA DE UNIDADES
    graphics.fillStyle(0x668AD8, 1);
    this.add.image(85, 710, "barraUnidades").setScale(1.5);
    this.add.image(220, 710, "barraUnidades").setScale(1.5);
    this.add.image(355, 710, "barraUnidades").setScale(1.5);
    graphics.fillRect(435, 638, 22, 145);

    //CREACIÓN DE UNIDADES
    this.unid0 = this.add.image(88, 698, "unidad").setScale(0.12).setInteractive();
    this.unid0.on('pointerdown', pointer => {
      if (this.unidCargada) {
        this.unidades.add(new Unidad(this, 1100, 350, "unidad"));
        this.tiempoUltUnid = 0;
        this.unidCargada = false;
      }
    });

    //CREACIÓN DE UN PRIMER ENEMIGO
    this.enemigos.add(new Enemigo(this, 0, 350, "enemigo"));
    this.tiempoUltEnem = 0;
    this.numEnems++;

    //SITUAMOS EL NÚCLEO DELANTE DEL TODO
    this.children.bringToTop(this.nucleo);

    //FONDO DE LA BARRA DE VIDA DEL NÚCLEO
    graphics.fillStyle(0xFF0000, 1);
    graphics.fillRect(1170, 180, 150, 20);

    //PTOS DE EXP Y OLEADAS
    this.add.image(350, 65, "barraExp").setScale(1.2);
    this.ptos = this.add.text(340, 50, this.ptosExp, { font: "40px Courier", fill: "#FFFFFF"});
    this.add.image(120, 65, "barraOleada").setScale(1.15);
    this.oled = this.add.text(122, 50, this.numOleada + "/4", { font: "40px Courier", fill: "#FFFFFF"});
  }

  update(time, delta) { 
    if (this.derrota == true) {
      this.scene.start("Derrota");
    }  
    if (this.victoria == true) {
      this.scene.start("Victoria");
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
              //ATAQUE UNIDAD <-> ENEMIGO
              this.physics.add.collider(unid, enem, unid.ataque, null, this);
            });
          }
        }
        else { this.enemigos.remove(enem); }
      });
    }

    //GENERACIÓN DE ENEMIGOS
    if (this.tiempoUltEnem >= this.tiempoEnem && !this.pausaOleada) {
      let creaEnem = false;
      switch (this.numOleada)
      {
        case 1:
          if (this.numEnems < this.oleada1) creaEnem = true;
          else {
            this.pausaOleada = true;
            this.numOleada++;
            this.numEnems = 0;
            setTimeout(() => {
              this.pausaOleada = false;
              this.oled.destroy();
              this.oled = this.add.text(122, 50, this.numOleada + "/4", { font: "40px Courier", fill: "#FFFFFF"});
            }, 5000);
          }
          break;
        case 2:
            if (this.numEnems < this.oleada2) creaEnem = true;
            else {
              this.pausaOleada = true;
              this.numOleada++;
              this.numEnems = 0;
              setTimeout(() => {
                this.pausaOleada = false;
                this.oled.destroy();
                this.oled = this.add.text(122, 50, this.numOleada + "/4", { font: "40px Courier", fill: "#FFFFFF"});
              }, 5000);
            }
          break;
        case 3:
            if (this.numEnems < this.oleada3) creaEnem = true;
            else {
              this.pausaOleada = true;
              this.numOleada++;
              this.numEnems = 0;
              setTimeout(() => {
                this.pausaOleada = false;
                this.oled.destroy();
                this.oled = this.add.text(122, 50, this.numOleada + "/4", { font: "40px Courier", fill: "#FFFFFF"});
              }, 5000);
            }
          break;
        case 4:
            if (this.numEnems < this.oleada4) creaEnem = true;
            else this.victoria = true;  //FIN__VICTORIA
          break;
      }
      if (creaEnem) {
        this.enemigos.add(new Enemigo(this, 0, 350, "enemigo"));
        this.tiempoUltEnem = 0;
        this.numEnems++;
        this.tiempoEnem = Phaser.Math.Between(100, 3000);
      }
    }
    else {  this.tiempoUltEnem += delta;  }

    //GENERACIÓN DE UNIDADES
    if (!this.unidCargada) {
      if (this.tiempoUltUnid >= this.tiempoUnid) {  this.unidCargada = true;  }
      else {  this.tiempoUltUnid += delta;  }
      this.barraUnid();
    }
  }

  //BARRA DE TIEMPO DE LAS UNIDADES
  barraUnid() {
      //MISMA MECÁNICA QUE LA BARRA DE SALUD DEL NÚCLEO
      let graphics = this.add.graphics();
      graphics.fillStyle(0xA9A9A9, 1);
      graphics.fillRect(435, 638, 22, 145);
      graphics.fillStyle(0x668AD8, 1);
      if (this.tiempoUltUnid <= this.tiempoUnid) {
          let barra = (145 * this.tiempoUltUnid) / this.tiempoUnid;
          graphics.fillRect(435, 783, 22, -barra);
      }
      else graphics.fillRect(435, 783, 22, -145);
  }

  //GESTIONA EL CAMBIO DE TORRE LLAMADO DESDE LA CLASE DE LA TORRE CORRESPONDIENTE
  mejoraTorre(p, q, object) {
    switch (object.level) {
      case 'O':
        let ops, opcionA, opcionB;
        if (!this.panelOpciones) {
          ops = this.add.image(p, q - 150, "opciones").setScale(1.5);
          opcionA = this.add.image(p - 50, q - 155, "torreA").setScale(0.35).setInteractive();
          opcionB = this.add.image(p + 50, q - 157, "torreB").setScale(0.17).setInteractive();
          this.panelOpciones = true;
          opcionA.on('pointerdown', pointer => {
            ops.destroy();
            opcionA.destroy();
            opcionB.destroy();
            this.panelOpciones = false;
            if (this.ptosExp >= costeTorreA) {
              this.torres.remove(object);
              object.destroy();
              this.torres.add(new Torre(this, p, q, 'A', "torreA"));
              this.ptosExp -= costeTorreA;
              object.muestraPtos(this.ptosExp);
            }
            else { console.log("No dispone de los puntos de experiencia suficientes"); }
          });
          opcionB.on('pointerdown', pointer => {
            ops.destroy();
            opcionA.destroy();
            opcionB.destroy();
            this.panelOpciones = false;
            if (this.ptosExp >= costeTorreB){
              this.torres.remove(object);
              object.destroy();
              this.torres.add(new Torre(this, p, q, 'B', "torreB"));
              this.ptosExp -= costeTorreB;
              object.muestraPtos(this.ptosExp);
            }
            else { console.log("No dispone de los puntos de experiencia suficientes"); }
          });
          setTimeout(() => {
            ops.destroy();
            opcionA.destroy();
            opcionB.destroy();
            this.panelOpciones = false;
          }, 2000);
        }
        break;
      case 'A':
        if (this.ptosExp >= costeTorreAA){
          this.torres.remove(object);
          object.destroy();
          this.torres.add(new Torre(this, p, q, 'AA', "torreAA"));
          this.ptosExp -= costeTorreAA;
          object.muestraPtos(this.ptosExp);
        }
        else { console.log("No dispone de los puntos de experiencia suficientes"); }
        break;
      case 'B':
        if (this.ptosExp >= costeTorreBB){
          this.torres.remove(object);
          object.destroy();
          this.torres.add(new Torre(this, p, q, 'BB', "torreBB"));
          this.ptosExp -= costeTorreBB;
          object.muestraPtos(this.ptosExp);
        }
        else { console.log("No dispone de los puntos de experiencia suficientes"); }
        break;
    }
  }
}