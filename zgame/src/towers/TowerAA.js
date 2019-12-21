import TowerInterface from "./towerInterface.js";

export default class TowerAA extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 70;
		this.range = 25;
		this.cadence = 0.7;

		this.createTowerAA();	
	}

	createTowerAA(){
		console.log("Upgrading towerA to towerAA at: "+this.xPos+","+this.yPos);
		//Set image. This +100 / +50 its needed to places tower in the correct position.
		this.element = this.st.add.image(this.xPos + 100, this.yPos + 50, "towerAA").setScale(0.25).setInteractive();		
	}
}