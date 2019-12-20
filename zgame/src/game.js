import MapFactory from "./maps/mapFactory.js";
import TowerPoint from "./towers/towerPoint.js";
import TowerBase from "./towers/towerBase.js";
import TowerA from "./towers/towerA.js";
import TowerB from "./towers/towerB.js";
import Enemy from "./units/enemy.js";
import LightUnit from "./units/lightUnit.js";
import MiddleUnit from "./units/middleUnit.js";
import HeavyUnit from "./units/heavyUnit.js";
import {getMapSelector} from "./states/menuMap.js";

export default class Game extends Phaser.Scene {
	constructor(){
		super({ key: 'game'});
		this.stage;
		this.mapConfig;
		this.expAccumulated = 0;
		this.defaultTowerPoint;
	}

	preload(){
		this.load.image("bg1", "./assets/maps/mapa1.jpg");
		this.load.image("bg2", "./assets/maps/mapa2.jpg");
		this.load.image("bg3", "./assets/maps/mapa3.jpg");


		this.load.image("towerPoint1", "./assets/towers/towerPoint1.png");
		this.load.image("towerPoint2", "./assets/towers/towerPoint2.png");
	}

	create(){
		let pointer = this.input.activePointer;
		this.input.mouse.disableContextMenu();

		//Setting background depend of mapSelector
		console.log("Loading background. MapSelector: "+getMapSelector());
		this.add.image(0,0,"bg"+getMapSelector()).setOrigin(0);

		//Groups
		this.towerPointGroup = this.add.group();
		this.towerGroup = this.add.group();
		this.enemyGroup = this.add.group();
		this.unitGroup = this.add.group();

		//Arrays
		this.towerPointArray = [];

		//Map Settings depend of mapSelector
		this.mapSettings(getMapSelector());
	}

	mapSettings(mapSel){
		//Set stage lvl
		this.stage = mapSel;

		//Get map config from map factory
		this.mapConfig = new MapFactory(this, mapSel);	
		this.towerPointArray = this.mapConfig.getMapPointArray();

		//Places points in map adding each point in group as object
		for(let j = 0; j < this.towerPointArray.length; j++){
			console.log("Creating tower point at: "+this.towerPointArray[j].x + " " + this.towerPointArray[j].y);
			if(this.defaultTowerPoint!= undefined) this.defaultTowerPoint.destroy();
			this.towerPointGroup.add(new TowerPoint(this, this.defaultTowerPoint, this.towerPointArray[j].x, this.towerPointArray[j].y));
		} 
	}
}