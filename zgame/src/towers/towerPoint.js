import GObject from "../gObject.js";

export default class TowerPoint extends GObject{
	constructor(){
		super(state, object, x, y);
	}

	preload(){
		this.st.load.image("towerPoint1", "./assets/towers/towerPoint1.png");
		this.st.load.image("towerPoint2", "./assets/towers/towerPoint2.png");
	}

	create(){
		this.st.add.image(this.xPos, this.yPos, "towerPoint1").setInteractive();
		this.st.add.image(this.xPos + 100, this.yPos +100, "towerPoint2").setInteractive(); //LINEA PARA TESTEAR CUAL ME GUSTA MÁS, BORRAR ANTES DE ENTREGAR
	}
}