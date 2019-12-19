import IconBase from "./iconBase.js";

export default class Selector extends IconBase{
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.createIconSelector();
	}

	createIconSelector(){
		this.element = this.st.add.image(this.xPos, this.yPos, "selector");
		console.log("Icon selector created at "+this.xPos + ","+this.yPos);
	}
}