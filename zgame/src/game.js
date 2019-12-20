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
	}

	preload(){
		this.load.image("bg1", "./assets/maps/mapa1.jpg");
		this.load.image("bg2", "./assets/maps/mapa2.jpg");
		this.load.image("bg3", "./assets/maps/mapa3.jpg");
	}

	create(){
		let pointer = this.input.activePointer;
		this.input.mouse.disableContextMenu();

		console.log("Loading background. MapSelector: "+getMapSelector());
		this.add.image(0,0,"bg"+getMapSelector()).setOrigin(0);

		this.towerPointArray = this.add.group();
		this.towerArray = this.add.group();
		this.enemyArray = this.add.group();
		this.unitArray = this.add.group();

		this.mapSettings(getMapSelector());
	}

	mapSettings(mapSel){
		this.mapConfig = new MapFactory(this, this.mapConfig, mapSel);
		this.towerPointArray = this.mapConfig.getMapPointArray();
		this.towerPointArray.children.iterate(elem=>{
			if(elem!= undefined) console.log(elem[0]+ " " + elem[1]);
		});
	}
}