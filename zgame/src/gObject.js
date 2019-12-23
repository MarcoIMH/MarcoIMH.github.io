export default class GObject extends Phaser.Physics.Arcade.Sprite{
	constructor(state, x, y, texture){
		super(state, x, y, texture);		
		this.st = state;

		this.st.add.existing(this);
		this.st.physics.add.existing(this);

		this.xPos = x;
		this.yPos = y;		
	}
	
	getXPos(){
		return this.x;
	}

	getYPos(){
		return this.y;
	}
}