import TowerInterface from "./towerInterface.js";
import TowerBB from "./towerBB.js";

export default class TowerB extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 190;
		this.range = 160;
		this.cadence = 60;

		this.upgradeExp = 120;

		this.creatTowerB();	
	}

	creatTowerB(){
		console.log("Upgrading towerBase to towerB");

		//This +105 / +35 its needed to places tower in the correct position.
		this.xRelPos = this.xPos + 105;
		this.yRelPos = this.yPos + 35;

		this.element = this.st.add.image(this.xRelPos, this.yRelPos, "towerB").setScale(0.15).setInteractive();

		//Set shot type
		this.towerShot = "shotB";

		//Set action
		this.element.on('pointerdown', pointer=>{			
			//Check that the tower can be improved
			if(this.checkUpgrade() == true) this.element = new TowerBB(this.st, this.element, this.xPos, this.yPos);					
		});
	}
}