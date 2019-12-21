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

		/*----------------------------------------------------
		These elements are declared here for greater visibility
		-------------------------------------------------------*/
		this.stage;
		this.mapConfig;
		this.enemyConfig;

		//About Exp
		this.expAccumulated = 0;
		this.expMarker;	

		//About waves
		this.wave = 0;	
		this.waveMarker;

		//About towers
		this.defaultTowerPoint;

		//About enemies
		this.defaultEnemy;
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
		this.load.image("lightEnemy", "./assets/enemy/ligthEnemy.png");
		this.load.image("middleEnemy", "./assets/enemy/middleEnemy.png");
		this.load.image("heavyEnemy", "./assets/enemy/heavyEnemy.png");	
	}

	create(){	
		pointer = this.input.activePointer;	
		this.input.mouse.disableContextMenu();

		//Get actual stage
		this.stage = getMapSelector();

		//Setting background depends of mapSelector
		console.log("Loading background. MapSelector: "+this.stage);
		this.add.image(0,0,"bg" + this.stage).setOrigin(0);

		//Nexus
		this.nexus;

		//Groups
		this.towerGroup = this.add.group();
		this.enemyGroup = this.add.group();
		this.unitGroup = this.add.group();

		//Arrays
		this.towerPointArray = [];
		this.enemyPathArray = [];

		//Map Settings depends of stage
		this.mapSettings(this.stage);

		
		//Get enemy config from enemy factory
		this.enemyFactory = new EnemyFactory(this, this.stage);

		//Enemy summon
		this.newEnemy(this.stage);
	}

	update(){
		this.markers();
	}

	/*--------------------------------------------------------------
		FUNCTION TO GENERATE THE INITIAL CONFIGURATION OF EACH MAP
	---------------------------------------------------------------*/
	mapSettings(mapSel){
		//Get map config from map factory
		this.mapConfig = new MapFactory(this, mapSel);	
		this.towerPointArray = this.mapConfig.getMapPointArray();

		//Places points in map adding each point in group as object
		for(let j = 0; j < this.towerPointArray.length; j++){
			//Release the default tower if necessary
			if(this.defaultTowerPoint!= undefined) this.defaultTowerPoint.destroy();

			//New tower structure. It is managed autonomously
			this.towerGroup.add(new TowerPoint(this, this.defaultTowerPoint, this.towerPointArray[j].x, this.towerPointArray[j].y));	
		}

		this.towerGroup.children.iterate(elem=>{
			console.log(elem);
		});

		//Nexus
		this.nexus = new Nexus(this, this.nexus, 1250, 300);

		//Markers
		this.markers();
	}

	/*-----------------------------------------------
					MARKER'S UPDATE
	------------------------------------------------*/
	markers(){
		//Esperiencie marker
		if(this.expMarker!=undefined) this.expMarker.destroy();
		this.expMarker = this.add.text(40, 50, this.expAccumulated, {font: "50px Arial", fill: "#1C180E"});
		
		//Wave Marker
		if(this.waveMarker!=undefined) this.waveMarker.destroy();
		this.waveMarker = this.add.text(900,50,this.wave, {font: "50px Arial", fill: "#1C180E"});
	}

	/*-----------------------------------------------
					ENEMY CREATION 
			DEPENDS OF TYPE AND STAGE
	------------------------------------------------*/
	newEnemy(mapSel){
		//Clear enemy creator container if necessary
		if(this.defaultEnemy != undefined) this.defaultEnemy.destroy();		

		let enemyType = Phaser.Math.Between(0, 2); 

		switch(enemyType){
			case 0:{
				this.enemyGroup.add(new LigthEnemy(this, this.defaultEnemy, 0, 400, this.enemyFactory.getEnemyConfig("light")));
				break;
			}
			case 1:{
				this.enemyGroup.add(new MiddleEnemy(this, this.defaultEnemy, 0, 400, this.enemyFactory.getEnemyConfig("middle")));
				break;
			}
			case 2:{
				this.enemyGroup.add(new HeavyEnemy(this, this.defaultEnemy, 0, 400, this.enemyFactory.getEnemyConfig("heavy")));	
				break;
			}
		}

		this.enemyGroup.children.iterate(elem=>{
			console.log(elem);
		});
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
}