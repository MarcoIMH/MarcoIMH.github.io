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
	}
}