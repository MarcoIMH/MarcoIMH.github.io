import {getMapSelector} from "./states/menuMap.js";
import {setVictoryFalse} from "./states/menuEnd.js";
import {setVictoryTrue} from "./states/menuEnd.js";
import MapFactory from "./maps/mapFactory.js";

import Nexus from "./towers/nexus.js";
import TowerPoint from "./towers/towerPoint.js";
import TowerBase from "./towers/towerBase.js";
import TowerA from "./towers/towerA.js";
import TowerB from "./towers/towerB.js";


import Shots from "./towers/shots.js";

import EnemyFactory from "./enemies/enemyFactory.js";
import LigthEnemy from "./enemies/lightEnemy.js";
import MiddleEnemy from "./enemies/middleEnemy.js";
import HeavyEnemy from "./enemies/heavyEnemy.js";

import UnitFactory from "./units/UnitFactory.js";
import LightUnit from "./units/lightUnit.js";
import MiddleUnit from "./units/middleUnit.js";
import HeavyUnit from "./units/heavyUnit.js";



var pointer;
let test = 0; //BORRAR VARIABLE, ES SOLO PARA TESTEAR!!!!

export default class Game extends Phaser.Scene {
	constructor(){
		super({ key: 'game'});

		/*--------------------------------------------------------
		  These elements are declared here for greater visibility
		---------------------------------------------------------*/
		this.background;
		this.endGame = false;
		this.stage;
		this.mapConfig;
		this.enemyConfig;

		//About Exp
		this.expAccumulated = 75;
		this.expMarker;	

		//About waves
		this.wave = 1;	
		this.unitsWave = 0;
		this.maxUnitsWave = 15;
		this.waveMarker;
		this.maxtimeToEnemySummon = 200;
		this.minTimeToEnemySummon = 100;
		this.randomTimeToEnemySummon;
		this.timeFromLastEnemy = 0;

		//About nexus
		this.nexus;

		//About units
		this.unitTimeLastSummon = 1;
		this.nextTimeUnitSummon = 0;
	}

	preload(){
		//Backgrounds assets
		this.load.image("bg1", "./assets/maps/map1.png");
		this.load.image("bg2", "./assets/maps/map2.png");
		this.load.image("bg3", "./assets/maps/map3.png");

		//Nexus asset
		this.load.image("nexus", "./assets/towers/nexus.png");

		//Towers assets	
		this.load.image("option", "./assets/towers/options.png");
		this.load.image("towerAicon", "./assets/towers/towerAicon.png");	
		this.load.image("towerBicon", "./assets/towers/towerBicon.png");
		this.load.image("towerPoint1", "./assets/towers/towerPoint1.png");
		this.load.image("towerPoint2", "./assets/towers/towerPoint2.png");
		this.load.image("towerBase", "./assets/towers/towerBase.png");	
		this.load.image("towerA", "./assets/towers/towerA.png");
		this.load.image("towerAA", "./assets/towers/towerAA.png");	
		this.load.image("towerB", "./assets/towers/towerB.png");
		this.load.image("towerBB", "./assets/towers/towerBB.png");

		//Shots assets
		this.load.image("shotBase", "./assets/shots/towerBase/keyframes/1.png");
		this.load.image("shotA", "./assets/shots/towerA/keyframes/1.png");
		this.load.image("shotB", "./assets/shots/towerB/keyframes/1.png");

		//Enemy assets
		this.load.spritesheet("lightEnemyPool", "./assets/enemy/ligthEnemy.png",   { frameWidth: 36.2, frameHeight: 35 });
		this.load.spritesheet("middleEnemyPool", "./assets/enemy/middleEnemy.png", { frameWidth: 36.2, frameHeight: 35 });
		this.load.spritesheet("heavyEnemyPool", "./assets/enemy/heavyEnemy.png",   { frameWidth: 36.2, frameHeight: 35 });

		this.load.image("lightEnemy", "./assets/enemy/ligthEnemyIndividual.png");
		this.load.image("middleEnemy", "./assets/enemy/middleEnemyIndividual.png");
		this.load.image("heavyEnemy", "./assets/enemy/heavyEnemyIndividual.png");

		//Units assets
		this.load.image("lightUnit1", "./assets/units/race1.png");
		this.load.image("lightUnit2", "./assets/units/race2.png");
		this.load.image("lightUnit3", "./assets/units/race3.png");
		this.load.image("middleUnit1", "./assets/units/race4.png");
		this.load.image("middleUnit2", "./assets/units/race5.png");
		this.load.image("middleUnit3", "./assets/units/race6.png");
		this.load.image("heavyUnit1", "./assets/units/race7.png");
		this.load.image("heavyUnit2", "./assets/units/race8.png");
		this.load.image("heavyUnit3", "./assets/units/race9.png");
	}

	create(){	
		pointer = this.input.activePointer;	
		this.input.mouse.disableContextMenu();

		//Get actual stage
		this.stage = getMapSelector();

		//Setting background depends of mapSelector
		console.log("Loading background. MapSelector: "+this.stage);
		this.background = this.add.image(0, 0, "bg" + this.stage).setOrigin(0);

		//Nexus
		this.nexus = new Nexus(this, 1250, 300);

		//Groups
		this.towerGroup = this.add.group();		
		this.unitGroup  = this.add.group();

		//Dynamic groups
		this.enemyGroup = this.physics.add.group();
		this.shotGroup  = this.physics.add.group();

		//Arrays
		this.towerPointArray = [];
		this.enemyPathArray = [];

		//Map Settings depends of stage
		this.mapSettings(this.stage);

		
		//Get enemy config from enemy factory
		this.enemyFactory = new EnemyFactory(this, this.stage);

		//Initial enemy summon time
		this.randomTimeToEnemySummon = Phaser.Math.Between(this.minTimeToEnemySummon, this.maxtimeToEnemySummon);

		//Enemy animations
	    //this.enemyAnimations();

	    //Get unit config from enemy factory
	    this.unitFact = new UnitFactory(this, this.stage);

	    //Summon units bar atributes
		this.thicknessBar = 25;
		this.maxBarSize = 135;		
		this.actualBarSize = 135;

	    //Initial units
	    this.newUnitPool(1);
	    this.newUnitPool(2);
	    this.newUnitPool(3);	    
	}

	update(){
		//New enemies
		this.newEnemy();	

		if(this.unitsWave == 10 && this.wave == 1){
			this.unitsWave = 0;
			this.wave++;
		}
		if(this.unitsWave == 15 && this.wave == 2){
			this.unitsWave = 0;
			this.wave++;
		}
		if(this.unitsWave == 20 && this.wave == 3){
			this.unitsWave = 0;
			this.wave++;
			this.endGame = true;
			setVictoryTrue();
		}


		//Collissions with anonymous function - Nexus / Enemies
		this.physics.add.collider(this.nexus, this.enemyGroup, (nex, enem) =>{enem.attack(nex);});

		//Collisions with anonymous function - Shots / Enemies
		this.physics.add.collider(this.shotGroup, this.enemyGroup, (shot, enem) =>{ shot.attack(enem);});

		//Collisions with anonymous function - Units / Enemies
		this.physics.add.collider(this.unitGroup, this.enemyGroup, (unit, enem) =>{ 
			unit.attack(enem); 
			enem.attackUnit(unit);
		});

		//Update markers
		this.markers();

		//Update summon time bar
		this.unitTimeBar();

		//Check endgame
		if(this.endGame == true) {
			setVictoryFalse();
			this.scene.start('menuend');
		}
	}


	/*--------------------------------------------------------------
		FUNCTION TO GENERATE THE INITIAL CONFIGURATION OF EACH MAP
	---------------------------------------------------------------*/
	mapSettings(mapSel){
		//Get map config from map factory
		this.mapConfig = new MapFactory(this, mapSel);	

		//Towers Points
		this.towerPointArray = this.mapConfig.getTowerPointArray();

		//Summon points
		this.enemyPathArray = this.mapConfig.getSummonPointArray();

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
		this.expMarker = this.add.text(160, 30, this.expAccumulated, {font: "45px Arial", fill: "#F4EBE5"});
		
		//Wave Marker
		if(this.waveMarker!=undefined) this.waveMarker.destroy();
		this.waveMarker = this.add.text(1230, 28, this.wave+ " / 3", {font: "45px Arial", fill: "#F4EBE5"});
	}

	/*-----------------------------------------------
			   INDEPENDENT OBJECT CREATION 
			      DEPENDS OF TYPE 
	------------------------------------------------*/
	newEnemy(){
		//Check time to enemy summon
		if(this.timeFromLastEnemy >= this.randomTimeToEnemySummon){	

			let enemyType = Phaser.Math.Between(0, this.wave);
			let summ = Phaser.Math.Between(0, this.enemyPathArray.length-1);

			let yVar = Phaser.Math.Between(-20, 15);
			
			switch(enemyType){
				case 0:{
					this.enemyGroup.add(new LigthEnemy(this, this.enemyPathArray[summ].x, this.enemyPathArray[summ].y + yVar, this.enemyFactory.getEnemyConfig("light")));
					break;
				}
				case 1:{
					this.enemyGroup.add(new MiddleEnemy(this, this.enemyPathArray[summ].x, this.enemyPathArray[summ].y + yVar, this.enemyFactory.getEnemyConfig("middle")));
					break;
				}
				case 2:{
					this.enemyGroup.add(new HeavyEnemy(this,  this.enemyPathArray[summ].x, this.enemyPathArray[summ].y + yVar, this.enemyFactory.getEnemyConfig("heavy")));	
					break;
				}
				case 3:{
					this.enemyGroup.add(new HeavyEnemy(this,  this.enemyPathArray[summ].x, this.enemyPathArray[summ].y + yVar, this.enemyFactory.getEnemyConfig("heavy")));	
					break;
				}
			}
			this.unitsWave++;
			this.timeFromLastEnemy = 0;
			this.randomTimeToEnemySummon = Phaser.Math.Between(this.minTimeToEnemySummon, this.maxtimeToEnemySummon);
		}else this.timeFromLastEnemy++;
	}

	newShot(object){
		this.shotGroup.add(object);
	}

	newUnitPool(slot){
		this.textureName = this.unitFact.newRandomUnit();
		console.log(this.textureName);
		if(slot == 1){
			if(this.unitBar1 != undefined) this.unitBar1.destroy();
			this.unitBar1 = this.add.image(155, 715, this.textureName).setScale(2).setInteractive();	
			this.unitAction(this.unitBar1, slot, this.textureName);						
		}else if(slot == 2){
			if(this.unitBar2 != undefined) this.unitBar2.destroy();
			this.unitBar2 = this.add.image(340, 715, this.textureName).setScale(2).setInteractive();	
			this.unitAction(this.unitBar2, slot, this.textureName);			
		}else{
			if(this.unitBar3 != undefined) this.unitBar3.destroy();
			this.unitBar3 = this.add.image(525, 715, this.textureName).setScale(2).setInteractive();
			this.unitAction(this.unitBar3, slot, this.textureName);			
		}			
	}	

	unitAction(object, slot, txt){
		this.unitConfig = this.unitFact.getUniConfig();

		object.on('pointerdown', pointer => {
			if(this.unitTimeLastSummon >= this.nextTimeUnitSummon){
				if(txt == "lightUnit1" || txt == "lightUnit2" || txt == "lightUnit3"){
					this.unitGroup.add(new LightUnit(this, 1100, 400, this.unitConfig, txt));
				}
				else if (txt == "middleUnit1" || txt == "middleUnit2" || txt == "middleUnit3"){	
					this.unitGroup.add(new MiddleUnit(this, 1100, 400, this.unitConfig, txt));
				}
				else{
					this.unitGroup.add(new HeavyUnit(this, 1100, 400, this.unitConfig, txt));
				}
				this.nextTimeUnitSummon = this.unitConfig[5];
				this.unitTimeLastSummon = 0;
				this.actualBarSize = this.maxBarSize;
				this.newUnitPool(slot);
			}	
	    });
	}

	/*-------------------------------------------------
					UNITS TIME BAR
	---------------------------------------------------*/
	unitTimeBar(){
		//Graphics
		this.graphics = this.add.graphics();	

		if(this.unitTimeLastSummon < this.nextTimeUnitSummon )
			this.unitTimeLastSummon++;

		//The percentage of secons that the summons has consumed
		let percentage = ((this.unitTimeLastSummon * 100) / this.nextTimeUnitSummon);	

		//Then applies to hp bar
		this.actualBarSize = ((this.maxBarSize * percentage) / 100);

		//Bottom hp bar
        this.graphics.fillStyle(0xF01316, 1);
        this.graphics.fillRect(675, 650, 25, this.maxBarSize);	

        //Top hp bar
        this.graphics.fillStyle(0xDF6A18, 1);	
        this.graphics.fillRect(675, 650, 25, this.actualBarSize);
	}

	/*-------------------------------------------------
					ANIMATIONS
	---------------------------------------------------*/
	enemyAnimations(){
		this.anims.create({
	       key: 'lightEnemyAnimation',
	       frameRate: 5,
	       repeat: -1,
	       frames: this.anims.generateFrameNumbers("lightEnemyPool", { start: 1, end: 4})	       
	    });
	}
	enemyAnimations(){
		this.anims.create({
	       key: 'middleEnemyAnimation',
	       frameRate: 5,
	       repeat: -1,
	       frames: this.anims.generateFrameNumbers("middleEnemyPool", { start: 1, end: 4})	       
	    });
	}
	enemyAnimations(){
		this.anims.create({
	       key: 'heavyEnemyAnimation',
	       frameRate: 5,
	       repeat: -1,
	       frames: this.anims.generateFrameNumbers("heavyEnemyPool", { start: 1, end: 4})	       
	    });
	}
	/*-------------------------------------------------
					REMOVE GROUPS ACTIONS
	---------------------------------------------------*/
	removeEnemy(enemy){
		this.enemyGroup.remove(enemy);
	}

	removeShot(shot){
		this.shotGroup.remove(shot);
	}

	removeUnit(unit){
		this.unitGroup.remove(unit);
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

	bringTop(object){
		this.children.bringToTop(object);
	}

	objectMoveDown(object){
		this.children.moveDown(object);
		this.children.moveDown(this.background);
	}
}