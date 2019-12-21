import GObject from "../gObject.js";

export default class Nexus extends GObject{
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.createNexus();
	}

	createNexus(){
		this.element = this.st.add.image(this.xPos, this.yPos, "nexus").setScale(0.2);
	}
}