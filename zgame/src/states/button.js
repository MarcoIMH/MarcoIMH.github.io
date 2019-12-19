export default class MenuButton extends Phaser.GameObjects.Sprite{
	constructor(state, nextState, x, y, imgOut, imgIn){
		super(state, x, y);
		this.st = state;
		this.ns = nextState;
		this.xPos = x;
		this.yPos = y;
		this.imageOut = imgOut;
		this.imageIn = imgIn;		
		this.button;
		this.createButton();
	}

	createButton(){
		this.button = this.st.add.image(this.xPos, this.yPos, this.imageOut).setInteractive();
	}

	buttonIn(){
		this.button.destroy();
		this.button = this.add.image(this.xPos, this.yPos, this.imageIn).setInteractive();
	}

	buttonDown(){
		this.button.destroy();
		this.button = this.add.image(this.xPos, this.yPos, this.imageOut).setInteractive();
		this.st.start(this.nS);
	}
}