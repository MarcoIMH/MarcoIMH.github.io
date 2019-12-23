import TowerInterface from "./towerInterface.js";

export default class TowerAA extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 70;
		this.range = 300;
		this.cadence = 35;

		this.createTowerAA();	
	}

	createTowerAA(){
		console.log("Upgrading towerA to towerAA");

		//This +100 / +50 its needed to places tower in the correct position.
		this.xRelPos = this.xPos + 100;
		this.yRelPos = this.yPos + 50;
		
		this.element = this.st.add.image(this.xRelPos, this.yRelPos, "towerAA").setScale(0.25).setInteractive();

		//Set shot type
		this.towerShot = "shotA";	
	}
}