export default class Menu extends Phaser.Scene {
  	constructor() {
  		super({ key: 'menu' });  		
    }

    preload(){
    	this.load.image("buttonPlayIn", "./assets/buttons/buttonPlayIn.png");
    	this.load.image("buttonPlayOut", "./assets/buttons/buttonPlayOut.png");
    }

    create(){
    	let pointer = this.input.activePointer;
    	this.input.mouse.disableContextMenu();

    	this.buttonPlay = this.add.image(700,300,"buttonPlayIn").setInteractive();	
    }

    update(){
    	this.buttonPlay.on('pointerover', pointer=>{
    		//this.scene.start('game');
    		this.buttonPlay.destroy();
    		this.buttonPlay = this.add.image(700,300,"buttonPlayOut").setInteractive();
    		this.buttonPlay.on('pointerdown', pointer=>{
    			this.scene.start('game');
    		});
    	});
    	this.buttonPlay.on('pointerup', pointer=>{
    		this.buttonPlay.destroy();
    		this.buttonPlay = this.add.image(700,300,"buttonPlayIn").setInteractive();	
    	})
    }
}