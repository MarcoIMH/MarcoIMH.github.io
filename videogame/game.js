import Torre from './src/torre.js';
import Base from './src/base.js';
import Enemigo from './src/enemigo.js';
import Nucleo from './src/nucleo.js';

//const c = this.matter.world.nextCategory();

//Por alguna extraña razón no me coge las colisiones, ni con arcade ni con matter :'(
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
    this.bases = this.add.group();
    this.torres = this.add.group();
    this.torresA = this.add.group();

    this.input.mouse.disableContextMenu();
    //this.sprite = this.add.sprite(600, 400, "base").setInteractive();
    //this.base = new Base(this, 800, 400, "base");

    //CREACIÓN DEL NÚCLEO
    this.nucleo = new Nucleo(this, 1250, 350, "nucleo");
    this.vidaNucleo = 1000;

    //POSICIONAMIENTO DE TODAS LAS this.BASES DEL NIVEL
    this.bases.add(new Base(this, 600, 450, "base"));
    this.bases.add(new Base(this, 250, 400, "base"));
    this.bases.add(new Base(this, 1000, 150, "base"));
    //console.log(this.bases.getChildren());

    //CREACIÓN DE TORRES
    this.bases.children.iterate(item => {
      item.on('pointerdown', pointer => {
        this.torres.add(new Torre(this, item.x, item.y - 55, "torre"));
        //Destruimos la base para que no pueda seguir creando torres
        item.destroy();
      });
    });

    //CREACIÓN ENEMIGO
    this.enem = new Enemigo(this, 100, 100, "enemigo");

    //SITUAMOS EL NÚCLEO DELANTE DEL TODO
    this.children.bringToTop(this.nucleo);

    //COLISIONES -- EL PRIMER OBJETO RECIBE EL DAÑO DEL SEGUNDO
    this.physics.add.collider(this.nucleo, this.enem, this.enem.atEnem, null, this);
  }
  update(time, delta) {   
    this.enem.movEnem();

    if (this.torres != undefined) {
      this.torres.children.iterate(item => {
        //AUMENTO DE NIVEL DE LA TORRE BASE A TORRE_A
        item.on('pointerdown', pointer => {
          this.torresA.add(new Torre(this, item.x, item.y, "torreA"));
          //Destruimos la torre anterior
          item.destroy();
        });
        
        //ATAQUE TORRE->ENEMIGO
        if (this.enem.x > item.x - item.rango && this.enem.x < item.x + item.rango && this.enem.y > item.y - item.rango && this.enem.y < item.y + item.rango) {
          item.atTorre(this.enem, item);
          //Si el enemigo se queda sin vida lo destruimos
          if (this.enem.vida <= 0) { this.enem.destroy(); }
        }
      });
    }
  }
}