export default class Info extends Phaser.Scene {
	constructor(){
		super({ key: 'info'});
	}

	preload(){
		this.load.image("backgroundInfo", "./assets/states/info.jpg");
		this.load.image("buttonBackIn", "./assets/buttons/buttonBackIn.png");
		this.load.image("buttonBackOut","./assets/buttons/buttonBackOut.png");
	}

	create(){
		let pointer = this.input.activePointer;
		this.input.mouse.disableContextMenu();

		this.add.image(0,0, "backgroundInfo").setOrigin(0);
		this.buttonBack = this.add.image(1100,700, "buttonBackOut").setScale(0.5).setInteractive();
	}

	update(){
		this.buttonBack.on('pointerover', pointer=>{
			this.buttonBack.destroy();
			this.buttonBack = this.add.image(1100,700, "buttonBackIn").setScale(0.5).setInteractive();
			this.buttonBack.on('pointerdown', pointer=>{
				this.scene.start('menumain');
			})				
		});
	}
}