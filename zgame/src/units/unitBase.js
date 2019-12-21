import GObject from "../gObject.js";

export default class UnitBase extends GObject {
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.dps;
		this.hp;
	}

	movement(){

	}

	atack(){

	}
}