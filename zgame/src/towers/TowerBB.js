import TowerInterface from "./towerInterface.js";

export default class TowerBB extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 90;
		this.range = 170;
		this.cadence = 65;

		this.createTowerBB();	
	}

	createTowerBB(){
		console.log("Upgrading towerB to towerBB");

		//This +100 / +50 its needed to places tower in the correct position.
		this.xRelPos = this.xPos + 100;
		this.yRelPos = this.yPos + 50;

		this.element = this.st.add.image(this.xRelPos, this.yRelPos, "towerBB").setScale(0.25).setInteractive();	

		//Set shot type
		this.towerShot = "shotB";
	}
}