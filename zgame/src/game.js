import {getMapSelector} from "./states/menuMap.js";
import MapFactory from "./maps/mapFactory.js";

import Nexus from "./towers/nexus.js";
import TowerPoint from "./towers/towerPoint.js";
import TowerBase from "./towers/towerBase.js";
import TowerA from "./towers/towerA.js";
import TowerB from "./towers/towerB.js";

import EnemyFactory from "./enemies/enemyFactory.js";
import LigthEnemy from "./enemies/lightEnemy.js";
import MiddleEnemy from "./enemies/middleEnemy.js";
import HeavyEnemy from "./enemies/heavyEnemy.js";

import LightUnit from "./units/lightUnit.js";
import MiddleUnit from "./units/middleUnit.js";
import HeavyUnit from "./units/heavyUnit.js";



var pointer;

export default class Game extends Phaser.Scene {
	constructor(){
		super({ key: 'game'});this.stage;

		/*--------------------------------------------------------
		  These elements are declared here for greater visibility
		---------------------------------------------------------*/
		this.endGame = false;
		this.stage;
		this.mapConfig;
		this.enemyConfig;

		//About Exp
		this.expAccumulated = 1150;
		this.expMarker;	

		//About waves
		this.wave = 0;	
		this.waveMarker;
		this.maxtimeToEnemySummon = 200;
		this.minTimeToEnemySummon = 100;
		this.randomTimeToEnemySummon;
		this.timeFromLastEnemy = 0;

		//About nexus
		this.nexus;
	}

	preload(){
		//Backgrounds assets
		this.load.image("bg1", "./assets/maps/mapa1.jpg");
		this.load.image("bg2", "./assets/maps/mapa2.jpg");
		this.load.image("bg3", "./assets/maps/mapa3.jpg");

		//Nexus asset
		this.load.image("nexus", "./assets/towers/nexus.png");

		//Towers assets		
		this.load.image("towerPoint1", "./assets/towers/towerPoint1.png");
		this.load.image("towerPoint2", "./assets/towers/towerPoint2.png");
		this.load.image("towerBase", "./assets/towers/towerBase.png");	
		this.load.image("towerA", "./assets/towers/towerA.png");
		this.load.image("towerAA", "./assets/towers/towerAA.png");	
		this.load.image("towerB", "./assets/towers/towerB.png");
		this.load.image("towerBB", "./assets/towers/towerBB.png");

		//Enemy assets
		this.load.image("lightEnemyPool", "./assets/enemy/ligthEnemy.png", 	 { frameWidth: 36.2, frameHeight: 35 });
		this.load.image("middleEnemyPool", "./assets/enemy/middleEnemy.png", { frameWidth: 36.2, frameHeight: 35 });
		this.load.image("heavyEnemyPool", "./assets/enemy/heavyEnemy.png", 	 { frameWidth: 36.2, frameHeight: 35 });

		this.load.image("lightEnemy", "./assets/enemy/ligthEnemyIndividual.png");
		this.load.image("middleEnemy", "./assets/enemy/middleEnemyIndividual.png");
		this.load.image("heavyEnemy", "./assets/enemy/heavyEnemyIndividual.png");
	}

	create(){	
		pointer = this.input.activePointer;	
		this.input.mouse.disableContextMenu();

		//Get actual stage
		this.stage = getMapSelector();

		//Setting background depends of mapSelector
		console.log("Loading background. MapSelector: "+this.stage);
		this.add.image(0, 0, "bg" + this.stage).setOrigin(0);

		//Nexus
		this.nexus = new Nexus(this, 1250, 300);

		//Groups
		this.towerGroup = this.add.group();		
		this.unitGroup = this.add.group();
		this.enemyGroup = this.physics.add.group();

		//Arrays
		this.towerPointArray = [];
		this.enemyPathArray = [];

		//Map Settings depends of stage
		this.mapSettings(this.stage);

		
		//Get enemy config from enemy factory
		this.enemyFactory = new EnemyFactory(this, this.stage);

		//Set enemy summon time
		this.randomTimeToEnemySummon = Phaser.Math.Between(this.minTimeToEnemySummon, this.maxtimeToEnemySummon);

		//Enemy animations
	    //this.enemyAnimations();
	}

	update(){
		this.newEnemy(this.stage);		

		//Collissions - Nexus / Enemies
		this.physics.add.collider(this.nexus, this.enemyGroup, (nex, enem) =>{enem.attack(nex);});

		//Update markers
		this.markers();

		//Check endgame
		if(this.endGame == true) this.scene.start('menuend')
	}


	/*--------------------------------------------------------------
		FUNCTION TO GENERATE THE INITIAL CONFIGURATION OF EACH MAP
	---------------------------------------------------------------*/
	mapSettings(mapSel){
		//Get map config from map factory
		this.mapConfig = new MapFactory(this, mapSel);	

		//Towers Points
		this.towerPointArray = this.mapConfig.getMapPointArray();

		//Places points in map adding each point in group as object
		for(let j = 0; j < this.towerPointArray.length; j++){
			//New tower structure. It is managed autonomously
			this.towerGroup.add(new TowerPoint(this, null, this.towerPointArray[j].x, this.towerPointArray[j].y));	
		}

		//Create Markers
		this.markers();
	}


	/*-----------------------------------------------
					MARKER'S UPDATE
	------------------------------------------------*/
	markers(){
		//Experiencie marker
		if(this.expMarker!=undefined) this.expMarker.destroy();
		this.expMarker = this.add.text(40, 50, this.expAccumulated, {font: "50px Arial", fill: "#1C180E"});
		
		//Wave Marker
		if(this.waveMarker!=undefined) this.waveMarker.destroy();
		this.waveMarker = this.add.text(900, 50, this.wave, {font: "50px Arial", fill: "#1C180E"});
	}

	/*-----------------------------------------------
					ENEMY CREATION 
			    DEPENDS OF TYPE AND STAGE
	------------------------------------------------*/
	newEnemy(mapSel){
		//Check time to enemy summon
		if(this.timeFromLastEnemy >= this.randomTimeToEnemySummon){	

			let enemyType = Phaser.Math.Between(0, 2);
			
			switch(enemyType){
				case 0:{
					this.enemyGroup.add(new LigthEnemy(this, 0, 400, this.enemyFactory.getEnemyConfig("light")));
					break;
				}
				case 1:{
					this.enemyGroup.add(new MiddleEnemy(this, 0, 400, this.enemyFactory.getEnemyConfig("middle")));
					break;
				}
				case 2:{
					this.enemyGroup.add(new HeavyEnemy(this,  0, 400, this.enemyFactory.getEnemyConfig("heavy")));	
					break;
				}
			}
			this.timeFromLastEnemy = 0;
			this.randomTimeToEnemySummon = Phaser.Math.Between(this.minTimeToEnemySummon, this.maxtimeToEnemySummon);
		}else this.timeFromLastEnemy++;
	}

	/*-------------------------------------------------
					ANIMATIONS
	---------------------------------------------------*/
	enemyAnimations(){
		this.anims.create({
	       key: 'middleEnemyAnimation',
	       frameRate: 5,
	       repeat: -1,
	       frames: this.anims.generateFrameNumbers("middleEnemy", { start: 1, end: 4})	       
	    });
	}

	/*-------------------------------------------------
					REMOVE GROUPS ACTIONS
	---------------------------------------------------*/
	removeEnemy(enemy){
		this.enemyGroup.remove(enemy);
	}

	/*--------------------------------------------
		GETTERS, SETTERS && OTHERS AUXILIAR FUNCTIONS 
		THAT DON'T NEED ADDITIONAL EXPLANATIONS
	----------------------------------------------*/
	getAccumulatedExp(){
		return this.expAccumulated;
	}

	subtractAccumulatedExp(howMany){
		this.expAccumulated -= howMany;
	}

	addAccumulatedExp(howMany){
		this.expAccumulated += howMany;
	}

	setEndGame(bool){
		this.endGame = bool;
	}	
}