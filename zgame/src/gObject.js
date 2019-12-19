export default class GObject extends Phaser.GameObjects.Sprite{
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.st = state;
		this.element = object;
		this.xPos = x;
		this.yPos = y;		
	}
	
	getXPos(){
		return this.xPos;
	}

	getYPos(){
		return this.yPos;
	}
}