import Torre from './src/torre.js';
import Base from './src/base.js';

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.on("complete", () => { this.scene.start("main"); });
    this.load.image("base", "./assets/circulo_base.png");
    this.load.image("torre", "./assets/arquero1.png");
    this.load.image("torreA", "./assets/torreA.png");
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
    let bases = this.add.group();
    let torres = this.add.group();
    let torresA = this.add.group();

    this.input.mouse.disableContextMenu();
    //this.sprite = this.add.sprite(600, 400, "base").setInteractive();
    //this.base = new Base(this, 800, 400, "base");

    //POSICIONAMIENTO DE TODAS LAS BASES DEL NIVEL
    bases.add(new Base(this, 400, 500, "base"));
    bases.add(new Base(this, 600, 200, "base"));
    bases.add(new Base(this, 1200, 600, "base"));
    //console.log(bases.getChildren());

    //CREACIÓN DE TORRES
    bases.children.iterate(item => {
      item.on('pointerdown', pointer => {
        torres.add(new Torre(this, item.x, item.y - 55, "torre"));
        //console.log(torres.getChildren());
      });
    });

    //AUMENTO DE NIVEL DE LA TORRE BASE -- NO FUNCIONA
    torres.children.iterate(item => {
      item.on('pointerdown', pointer => {
        torresA.add(new Torre(this, item.x, item.y, "torreA"));
        //console.log(torresA.getChildren());
      });
    });
  }
  update(time, delta) {    

  }
}