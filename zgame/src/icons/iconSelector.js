import GObject from "../gObject.js";

export default class Selector extends GObject{
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.createIconSelector();
	}

	createIconSelector(){
		this.element = this.st.add.image(this.xPos, this.yPos, "selector");
		console.log("Icon selector created at "+this.xPos + ","+this.yPos);
	}
}