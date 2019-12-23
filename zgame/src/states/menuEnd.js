import {increaseUnlockedStages} from "./menuMap.js";
var victory = false;

export default class MenuEnd extends Phaser.Scene {
    constructor() {
        super({ key: "menuend" });             
    }

    preload(){
        this.load.image("bg", "./assets/states/bgmap.jpg");
		this.load.image("go", "./assets/states/gameover.png");
		this.load.image("vic", "./assets/states/victory.png");
		this.load.image("back", "./assets/buttons/buttonMap.png");
    }

    create(){
		let pointer = this.input.activePointer;	
		this.input.mouse.disableContextMenu();

        //Background
        this.add.image(0,0,"bg").setOrigin(0);

        //Set message
    	if(victory == true){
    		this.add.image(650, 200, "vic");
            increaseUnlockedStages();
    	}else{
    		this.add.image(650,200, "go");
    	}
    	
        //BUtton
    	this.button = this.add.image(700, 650, "back").setInteractive();
    	this.button.on('pointerdown', pointer=>{
    		this.scene.start('menumap');
    	});
    }
}

export function setVictoryFalse(){
	victory = false;
}

export function setVictoryTrue(){
	victory = true;
}