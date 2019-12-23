import GObject from "../gObject.js";

export default class Selector extends Phaser.GameObjects.Sprite{
	constructor(state, object, x, y, iconNumber){
		super(state, object, x, y);	
		this.st = state;
		this.element = object;	
		this.xPos = x;
		this.yPos = y;	
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