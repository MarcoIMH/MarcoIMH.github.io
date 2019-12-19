import MenuButton from "./button.js";

export default class Menu extends Phaser.Scene {
  	constructor() {
  		super({ key: 'menu' });  		
    }

    preload(){
    	this.load.image("buttonPlayIn", "./assets/buttons/buttonPlayIn.png");
    	this.load.image("buttonPlayOut", "./assets/buttons/buttonPlayOut.png");
        this.load.image("buttonInfoOut","./assets/buttons/buttonInfoOut.png");
        this.load.image("buttonInfoIn","./assets/buttons/buttonInfoIn.png");
    }

    create(){
    	let pointer = this.input.activePointer;
    	this.input.mouse.disableContextMenu();
    	
        //this.buttonPlay = new MenuButton(this, "Game", 700, 300, "buttonPlayOut", "buttonPlayIn");
        this.buttonPlay = this.add.image(700, 300, "buttonPlayOut").setInteractive();
        this.buttonInfo = this.add.image(700,450, "buttonInfoOut").setInteractive();
    }

    update(){
        this.buttonPlay.on('pointerover', pointer=>{            
            this.buttonPlay.destroy();
            this.buttonPlay = this.add.image(700,300,"buttonPlayIn").setInteractive();
            this.buttonPlay.on('pointerdown', pointer=>{
                this.scene.start("game");
            });
        }); 

        this.buttonInfo.on('pointerover', pointer=>{
            this.buttonInfo.destroy();
            this.buttonInfo = this.add.image(700,450, "buttonInfoIn").setInteractive();
            this.buttonInfo.on('pointerdown', pointer=>{
                this.scene.start("info");
            });
        });


        /*this.buttonPlay.on('pointerover', pointer=>{            
            this.buttonPlay.buttonIn();
            this.button.on('pointerdown', pointer=>{
               this.buttonPlay.buttonOut();
            });
        });*/ 
    }
}