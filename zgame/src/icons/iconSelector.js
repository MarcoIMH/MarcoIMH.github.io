import GObject from "../gObject.js";

export default class Selector extends GObject{
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.createIconSelector();
	}
	
	createIconSelector(){
		console.log("Icon selector created at "+this.xPos + ","+this.yPos);
		//This -1 / + 1 its needed to places selector in the correct position.
		this.element = this.st.add.image(this.xPos - 1 , this.yPos + 1, "selector");
	}

	clearSelector(){
		this.element.destroy();
	}
}