import MenuButton from "./button.js";

export default class Menu extends Phaser.Scene {
  	constructor() {
  		super({ key: 'menumain' });  		
    }

    preload(){
        this.load.image("buttonNewGameOut", "./assets/buttons/buttonNewGameOut.png");
    	this.load.image("buttonNewGameIn", "./assets/buttons/buttonNewGameIn.png");    	
        this.load.image("buttonInfoOut","./assets/buttons/buttonInfoOut.png");
        this.load.image("buttonInfoIn","./assets/buttons/buttonInfoIn.png");
    }

    create(){
    	let pointer = this.input.activePointer;
    	this.input.mouse.disableContextMenu();
    	
        //this.buttonPlay = new MenuButton(this, "Game", 700, 300, "buttonPlayOut", "buttonPlayIn");
        this.buttonPlay = this.add.image(700, 300, "buttonNewGameOut").setInteractive();
        this.buttonInfo = this.add.image(700,450, "buttonInfoOut").setInteractive();
    }

    update(){
        this.buttonPlay.on('pointerover', pointer=>{            
            this.buttonPlay.destroy();
            this.buttonPlay = this.add.image(700,300,"buttonNewGameIn").setInteractive();
            this.buttonPlay.on('pointerdown', pointer=>{
                this.scene.start("menumap");
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