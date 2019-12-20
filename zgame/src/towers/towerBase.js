import GObject from "../gObject.js";

export default class TowerBase extends GObject {
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.requiredExp = 0;		
	}

	preload(){
		this.st.load.image("towerBase", "./assets/towers/towerBase.png");
	}

	create(){
		this.st.add.image(this.xPos, this.yPos, "towerBase").setInteractive();
	}
}