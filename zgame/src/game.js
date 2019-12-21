import MapFactory from "./maps/mapFactory.js";
import Nexus from "./towers/nexus.js";
import TowerPoint from "./towers/towerPoint.js";
import TowerBase from "./towers/towerBase.js";
import TowerA from "./towers/towerA.js";
import TowerB from "./towers/towerB.js";
import Enemy from "./units/enemy.js";
import LightUnit from "./units/lightUnit.js";
import MiddleUnit from "./units/middleUnit.js";
import HeavyUnit from "./units/heavyUnit.js";
import {getMapSelector} from "./states/menuMap.js";

var pointer;

export default class Game extends Phaser.Scene {
	constructor(){
		super({ key: 'game'});this.stage;

		//These elements are declared here for greater visibility
		this.mapConfig;
		this.expAccumulated = 1000;
		this.expMarker;		
		this.wave = 0;	
		this.waveMarker;
		this.defaultTowerPoint;
	}

	preload(){
		//Backgrounds assets
		this.load.image("bg1", "./assets/maps/mapa1.jpg");
		this.load.image("bg2", "./assets/maps/mapa2.jpg");
		this.load.image("bg3", "./assets/maps/mapa3.jpg");

		//Towers assets		
		this.load.image("towerPoint1", "./assets/towers/towerPoint1.png");
		this.load.image("towerPoint2", "./assets/towers/towerPoint2.png");
		this.load.image("towerBase", "./assets/towers/towerBase.png");	
		this.load.image("towerA", "./assets/towers/towerA.png");
		this.load.image("towerAA", "./assets/towers/towerAA.png");	
		this.load.image("towerB", "./assets/towers/towerB.png");
		this.load.image("towerBB", "./assets/towers/towerBB.png");	

		this.load.image("nexus", "./assets/towers/nexus.png");
	}

	create(){	
		pointer = this.input.activePointer;	
		this.input.mouse.disableContextMenu();

		//Setting background depend of mapSelector
		console.log("Loading background. MapSelector: "+getMapSelector());
		this.add.image(0,0,"bg" + getMapSelector()).setOrigin(0);

		//Nexus
		this.nexus;

		//Groups
		this.towerGroup = this.add.group();
		this.enemyGroup = this.add.group();
		this.unitGroup = this.add.group();

		//Arrays
		this.towerPointArray = [];
		this.enemyPathArray = [];

		//Map Settings depend of mapSelector
		this.mapSettings(getMapSelector());
	}

	update(){
		this.markers();
	}

	mapSettings(mapSel){
		//Set stage lvl
		this.stage = mapSel;

		//Get map config from map factory
		this.mapConfig = new MapFactory(this, mapSel);	
		this.towerPointArray = this.mapConfig.getMapPointArray();

		//Places points in map adding each point in group as object
		for(let j = 0; j < this.towerPointArray.length; j++){
			if(this.defaultTowerPoint!= undefined) this.defaultTowerPoint.destroy();
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

	getAccumulatedExp(){
		return this.expAccumulated;
	}

	subtractAccumulatedExp(howMany){
		this.expAccumulated -= howMany;
	}

	addAccumulatedExp(howMany){
		this.expAccumulated += howMany;
	}

	markers(){
		if(this.expMarker!=undefined) this.expMarker.destroy();
		this.expMarker = this.add.text(40, 50, this.expAccumulated, {font: "50px Arial", fill: "#1C180E"});
		if(this.waveMarker!=undefined) this.waveMarker.destroy();
		this.waveMarker = this.add.text(900,50,this.wave, {font: "50px Arial", fill: "#1C180E"});
	}
}