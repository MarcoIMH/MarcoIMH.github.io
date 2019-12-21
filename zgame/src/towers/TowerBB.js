import TowerInterface from "./towerInterface.js";

export default class TowerBB extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 90;
		this.range = 16;
		this.cadence = 1.75;

		this.createTowerBB();	
	}

	createTowerBB(){
		console.log("Upgrading towerB to towerBB at: "+this.xPos+","+this.yPos);
		//Set image. This +100 / +25 its needed to places towerBase in the correct position.
		this.element = this.st.add.image(this.xPos + 100, this.yPos + 50, "towerBB").setScale(0.25).setInteractive();		
	}
}