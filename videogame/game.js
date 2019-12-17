import Torre from './src/torre.js';
import Base from './src/base.js';
import Enemigo from './src/enemigo.js';
import Nucleo from './src/nucleo.js';
import Lelanto from './src/unidades/lelanto.js';
import UnidadLigera from "./src/unidades/unidadLigera.js";
import UnidadMedia from "./src/unidades/unidadMedia.js";
import UnidadPesada from "./src/unidades/unidadPesada.js";
import {getNivelActual} from './src/mapa.js';

//VARIABLES CONSTANTES
const costeTorreBase = 150;  //COSTE DE CREAR TORRE BASE
const costeTorreA = 180; //COSTE DE AUMENTAR A TORRE_A
const costeTorreB = 200; //COSTE DE AUMENTAR A TORRE_B
const costeTorreAA = 120; //COSTE DE MEJORAR LA TORRE_A
const costeTorreBB = 150; //COSTE DE MEJORAR LA TORRE_B

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.nivel = 1;
  }
  
  preload() {  
    this.load.on("complete", () => { this.scene.start("main"); });
    this.nivel = getNivelActual();
    this.load.image("base", "./assets/circulo_base.png");
    this.load.image("torre", "./assets/torreBase.png");
    this.load.image("torreA", "./assets/torreA.png");
    this.load.image("torreB", "./assets/torreB.png");
    this.load.image("opciones", "./assets/opciones.png");
    this.load.image("enemigo", "./assets/favicon.png");
    this.load.image("unidadL", "./assets/b1.png");
    this.load.image("unidadM", "./assets/b2.png");
    this.load.image("unidadP", "./assets/b3.png");
    this.load.image("nucleo", "./assets/nucleoColor.png");
    this.load.image("fondo1", "./assets/MapaV2.png");
    this.load.image("fondo2", "./assets/MapaV3.png");
    this.load.image("fondoCols", "./assets/FondoColumnas.png");
    this.load.image("barraExp", "./assets/BarraExp.png");    
    this.load.image("barraOleada", "./assets/BarraOleada.png");
    this.load.image("bala", "./assets/flecha.png");
    this.load.image("barraUnidades", "./assets/BarraUnid.png");    
    this.load.image("barraunidadLigera", "./assets/best1.png");
    this.load.image("barraUnidadMedia", "./assets/best2.png");
    this.load.image("barraUnidadPesada", "./assets/best3.png");

  }

  create() {
    let pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();

    this.ptosExp = 250; //PUNTOS ACTUALES DEL JUGADOR
    this.derrota = false;
    this.victoria = false;
    this.tiempoUltEnem = 0; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoEnem = Phaser.Math.Between(10, 600); //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (CAMBIA DE MANERA ALEATORIA)
    this.unidCargada = true;  //MARCA SI SE PUEDE INVOCAR LA UNIDAD CORRESPONDIENTE O NO
    this.tiempoUltUnid; //MARCA EL TIEMPO RELATIVO DESDE LA ÚLTIMA CREACIÓN
    this.tiempoUnid;  //TIEMPO PARA LA CREACIÓN DEL SIGUIENTE ENEMIGO (DEPENDERÁ SEGÚN EL ÚLTIMO ENEMIGO CREADO)
    this.panelOpciones = false;
    this.opcionA;
    this.opcionB;
    this.posXEnem;
    this.posYEnem;
    this.posXUnid;
    this.posYUnid;
    this.posRelativa;
    this.pausaOleada = false; //MARCA SI ESTAMOS ENTRE UNA OLEADA Y LA SIGUIENTE
    this.numEnems = 0;  //LLEVA EL RECUENTO DE LOS ENEMIGOS DE CADA OLEADA QUE VAN APARECIENDO
    this.numOleada = 1; //OLEADA ACTUAL
    this.vidaNucleo = 1000;

    //ARRAYS DE OBJETOS DEL JUEGO
    this.bases = this.add.group();
    this.torres = this.add.group();
    this.unidades = this.add.group();
    this.enemigos = this.add.group();
    //this.mapasCompletados = this.add.group();
    //this.mapasSinCompletar = this.add.group();

    this.cargaNivel();  //CARGA LOS DATOS SEGÚN EL NIVEL A JUGAR

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
    this.add.image(85, 710, "barraUnidades").setScale(1.3);
    this.add.image(220, 710, "barraUnidades").setScale(1.3);
    this.add.image(355, 710, "barraUnidades").setScale(1.3);
    graphics.fillRect(435, 638, 22, 145);

    this.barraUnidades();

    //SITUAMOS EL NÚCLEO DELANTE DEL TODO
    this.children.bringToTop(this.nucleo);

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
            //ATAQUE TORRE -> ENEMIGO
            if (enem.x > item.x - item.rango && enem.x < item.x + item.rango && enem.y > item.y - item.rango && enem.y < item.y + item.rango) {
              item.ataque(item, enem);
            }
          });
          //SI HAY UNIDADES EN EL MAPA
          if (this.unidades != undefined) {
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
        this.enemigos.add(new Enemigo(this, this.posXEnem, this.posYEnem, "enemigo"));
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
      this.barraTiempoUnid();
    }
  }

  //BARRA DE TIEMPO DE LAS UNIDADES
  barraTiempoUnid() {
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

  //GENERADOR DE UNIDADES ALEATORIAS PARA LA BARRA DE UNIDADES INICIAL  
  barraUnidades() {   
    //DISPONEMOS DE TRES CASILLAS
    for (let i = 0; i < 3; i++) {
      this.nuevaUnidad(i);
    }
  }

  //MÉTODO PARA CREAR UNA NUEVA UNIDAD EN UNA CASILLA DETERMINADA
  //TIPOS:  0: UNIDADLIGERA, 1: UNIDADMEDIA, 2: UNIDADPESADA
  nuevaUnidad(casilla){
   this.tipoUnidad = "";
    let tipo = Phaser.Math.Between(0, 2);     
      switch (tipo) {
        //CREACIÓN DE UNIDADES
        case 0:
          this.tipoUnidad = "unidadL";
          break;
        case 1:
         this.tipoUnidad = "unidadM";
          break;
        case 2:
          this.tipoUnidad = "unidadP";
          break;
      }
      this.setCasillaUnidad(casilla, this.tipoUnidad);
  }
    
  //CREA LA CASILLA DE LA UNIDAD DICHA
  setCasillaUnidad(casilla, tipo) {
    this.unid;
    switch (casilla) {      
      case 0:        
        this.unid = this.add.image(88, 698, tipo).setScale(0.2).setInteractive();        
        break;
      case 1:
        this.unid = this.add.image(223, 698, tipo).setScale(0.2).setInteractive();
        break;
      case 2:
        this.unid = this.add.image(358, 698, tipo).setScale(0.2).setInteractive();
        break;
    }
    this.invocarUnidad(this.unid, tipo, casilla);
  }
  
  //INVOCA UNA UNIDAD AL SELECCIONARLA EN LA BARRA DE UNIDADES SI ESTÁ CARGADA
  invocarUnidad(unidX, tipo, casilla) {
    unidX.on('pointerdown', pointer => {
      if (this.unidCargada) {
        switch (tipo) {
          case "unidadL":
            this.unidades.add(new UnidadLigera(this, this.posXUnid, this.posYUnid, this.posRelativa));     
            break;
          case "unidadM":
            this.unidades.add(new UnidadMedia(this, this.posXUnid, this.posYUnid, this.posRelativa));
            break;
          case "unidadP":
            this.unidades.add(new UnidadPesada(this, this.posXUnid, this.posYUnid, this.posRelativa));            
            break;
        }
        this.nuevaUnidad(casilla); 
        this.tiempoUltUnid = 0;
        this.unidCargada = false;
      }
    });
  }

  //MÉTODO PARA GENERAR LAS BALAS
  disparaBala(obj1, obj2) {
    let pos1X = obj1.x;
    let pos1Y = obj1.y;
    let pos2X = obj2.x;
    let pos2Y = obj2.y;
    //CALCULAMOS EL VECTOR DE MOVIMIENTO DE LA BALA
    let dirX = pos1X - pos2X;
    let dirY = pos1Y - pos2Y;
    //CREAMOS LA BALA
    this.bala = new Bala(this, pos1X, pos1Y, dirX, dirY, "bala");
    this.physics.add.collider(this.bala, obj2, () => {
        console.log("Colisión");
        this.bala.destroy();
        obj2.vida -= obj1.daño;
    });
  }

  //GESTIONA EL CAMBIO DE TORRE LLAMADO DESDE LA CLASE DE LA TORRE CORRESPONDIENTE
  mejoraTorre(p, q, object) {
    switch (object.level) {
      case 'O':
        let ops, opcionA, opcionB;
        if (!this.panelOpciones) {
          if (q > 200) {
            ops = this.add.image(p, q - 150, "opciones").setScale(1.5);
            opcionA = this.add.image(p - 50, q - 155, "torreA").setScale(0.35).setInteractive();
            opcionB = this.add.image(p + 50, q - 157, "torreB").setScale(0.17).setInteractive();
          }
          else {
            ops = this.add.image(p, q + 150, "opciones").setScale(1.5);
            ops.rotation = 3.14;
            opcionA = this.add.image(p - 50, q + 155, "torreA").setScale(0.35).setInteractive();
            opcionB = this.add.image(p + 50, q + 157, "torreB").setScale(0.17).setInteractive();
          }
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

  cargaNivel() {
    let graphics;
    switch (this.nivel) {
      case 1:
        this.posXEnem = 0;
        this.posYEnem = 350;
        this.posXUnid = 1100;
        this.posYUnid = 350;
        this.posRelativa = 44;
        this.oleada1 = 5;
        this.oleada2 = 8;
        this.oleada3 = 12;
        this.oleada4 = 18;
        
        this.add.image(0, 0, "fondo1").setOrigin(0);
        
        //POSICIONAMIENTO DE TODAS LAS this.BASES DEL NIVEL
        this.bases.add(new Base(this, 270, 375, "base"));
        this.bases.add(new Base(this, 600, 450, "base"));
        this.bases.add(new Base(this, 1000, 145, "base"));
        
        //CREACIÓN DEL NÚCLEO
        this.nucleo = new Nucleo(this, 1250, 350, "nucleo");
        
        graphics = this.add.graphics();
        //FONDO DE LA BARRA DE VIDA DEL NÚCLEO
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(1170, 180, 150, 20);
        break;
      case 2:
        this.posXEnem = 700;
        this.posYEnem = 300;
        this.posXUnid = 710;
        this.posYUnid = 300;
        this.posRelativa = 0;
        this.oleada1 = 10;
        this.oleada2 = 15;
        this.oleada3 = 20;
        this.oleada4 = 25;

        this.add.image(0, 0, "fondo2").setOrigin(0);
        
        //POSICIONAMIENTO DE TODAS LAS this.BASES DEL NIVEL
        this.bases.add(new Base(this, 220, 510, "base"));
        this.bases.add(new Base(this, 510, 320, "base"));
        this.bases.add(new Base(this, 700, 580, "base"));
        this.bases.add(new Base(this, 890, 320, "base"));
        this.bases.add(new Base(this, 1160, 510, "base"));

        //CREACIÓN DEL NÚCLEO
        this.nucleo = new Nucleo(this, 710, 190, "nucleo");
        
        graphics = this.add.graphics();
        //FONDO DE LA BARRA DE VIDA DEL NÚCLEO
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(620, 20, 150, 20);
        break;
    }
  }
}