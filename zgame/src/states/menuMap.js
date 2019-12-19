import Selector from "../others/selector.js";
import Icon from "../others/icon.js";

var ms;

export default class MenuMap extends Phaser.Scene {
	constructor(){
		super({ key: 'menumap'});
		this.currentStage = 1;
		this.maxStage = 3;	
		this.unlockedStages = 3;
		this.mapSelector = 0;	
		this.iconSelector;
	}

	preload(){
		//Background
		this.load.image("backgroundMap", "./assets/states/backgroundMap.jpg");

		//Buttons
		this.load.image("buttonBackIn", "./assets/buttons/buttonBackIn.png");
		this.load.image("buttonBackOut","./assets/buttons/buttonBackOut.png");
		this.load.image("buttonPlayIn", "./assets/buttons/buttonPlayIn.png");
		this.load.image("buttonPlayOut","./assets/buttons/buttonPlayOut.png");

		//Icons for map selector
		this.load.image("selector", "./assets/maps/icons/iconSelector.png");
		this.load.image("icon1", "./assets/maps/icons/icon1.png");
		this.load.image("icon2", "./assets/maps/icons/icon2.png");
		this.load.image("icon3", "./assets/maps/icons/icon3.png");
	}

	create(){
		let pointer = this.input.activePointer;
		this.input.mouse.disableContextMenu();

		//Background
		this.add.image(0,0, "backgroundMap").setOrigin(0);

		//Buttons
		this.buttonBack = this.add.image(1200,750, "buttonBackOut").setScale(0.5).setInteractive();
		this.buttonPlay = this.add.image(170, 750, "buttonPlayOut").setScale(0.5).setInteractive();
		
		this.iconArray = this.add.group();
		this.createIcons();			
	}

	update(){
		this.buttonBack.on('pointerover', pointer=>{
			this.buttonBack.destroy();
			this.buttonBack = this.add.image(1200,750, "buttonBackIn").setScale(0.5).setInteractive();
			this.buttonBack.on('pointerdown', pointer=>{
				this.scene.start('menumain');
			});			
		});

		this.buttonPlay.on('pointerover', pointer=>{
			this.buttonPlay.destroy();
			this.buttonPlay = this.add.image(170, 750, "buttonPlayIn").setScale(0.5).setInteractive();
			this.buttonPlay.on('pointerdown', pointer=>{
				if(this.mapSelector!=0){
					this.mapSelector = 0;					
					this.scene.start('game');
				}
			});
		});	
	}

	//Crate icons based on unlockstage
	createIcons(){
		console.log("Unlocked stages: "+this.unlockedStages);
		for(let x=1;x<=this.unlockedStages && x<=this.maxStage;x++){	
			let newIcon;		
			switch(x){
				case 1:{
					newIcon = new Icon(this, this.defaultIcon, 80, 550, x);
					break;
				}
				case 2:{
					newIcon = new Icon(this, this.defaultIcon, 150, 70, x);
					break;
				}
				case 3:{
					newIcon = new Icon(this, this.defaultIcon, 620, 300, x);
					break;
				}
			}				
			this.iconArray.add(newIcon);
		}
	}

	createSelector(x){
		this.mapSelector = x;
		this.iconArray.children.iterate(elem=>{
			if(elem.getIconNumber() == this.mapSelector){
				ms = this.mapSelector;
				if(this.selector != undefined) {
					console.log("Selector is not undefined");
					this.selector.destroy(); //PREGUNTAR A CARLOS POR QUÉ NO DESTRUYE ESTE OBJETO. SE MULTIPLICAN LOS SELECTORES!!!!!
				}
				this.selector = new Selector(this, this.selector, elem.getXPos(), elem.getYPos());
			}
		});
	}
}

export function getMapSelector(){
	return ms;
}