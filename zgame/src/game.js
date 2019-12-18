import TowerA from "./towers/towerA.js";
import TowerB from "./towers/towerB.js";
import Enemy from "./units/enemy.js";
import LightUnit from "./units/lightUnit.js";
import MiddleUnit from "./units/middleUnit.js";
import HeavyUnit from "./units/heavyUnit.js";

export default class Game extends Phaser.Scene {
	constructor(){
		super({ key: 'game'});
		this.stage;
	}
	preload(){
		console.log("entra en preload");
	}
	create(){
		let pointer = this.input.activePointer;
		this.input.mouse.disableContextMenu();
	}
}