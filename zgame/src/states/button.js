export default class MenuButton extends Phaser.GameObjects.Sprite{
	constructor(state, object, nextState, x, y, imgOut, imgIn){
		super(state, object, nextState, x, y, imgOut, imgIn);
		this.st = state;
		this.button = object;
		this.ns = nextState;
		this.xPos = x;
		this.yPos = y;
		this.imageOut = imgOut;
		this.imageIn = imgIn;	
		this.createButton();
	}

	createButton(){
		this.button = this.st.add.image(this.xPos, this.yPos, this.imageOut).setInteractive();
	}

	preUpdate(){
		console.log("Button preUpdate");
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