import GObject from "../gObject.js";

export default class TowerPoint extends GObject{
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.createTowerPoint();
	}
	preload(){
		this.load.image("towerPoint1", "./assets/towers/towerPoint1.png");
		this.load.image("towerPoint2", "./assets/towers/towerPoint2.png");
	}
	createTowerPoint(){
		this.element = this.st.add.image(this.xPos, this.yPos, "towerPoint1").setScale(0.2).setInteractive();
		this.element = this.st.add.image(this.xPos + 100, this.yPos +100, "towerPoint2").setScale(0.2).setInteractive(); //LINEA PARA TESTEAR CUAL ME GUSTA MÁS, BORRAR ANTES DE ENTREGAR
	}
}