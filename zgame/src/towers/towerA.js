import TowerInterface from "./towerInterface.js";
import TowerAA from "./towerAA.js";

export default class TowerA extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);		

		this.damage = 55;
		this.range = 250;
		this.cadence = 45;

		this.upgradeExp = 120;	

		this.createTowerA();	
	}

	createTowerA(){
		console.log("Upgrading towerBase to towerA");

		//This +90 / +35 its needed to places tower in the correct position.
		this.xRelPos = this.xPos + 90;
		this.yRelPos = this.yPos + 35;

		this.element = this.st.add.image(this.xRelPos, this.yRelPos, "towerA").setScale(0.1).setInteractive();

		//Set shot type
		this.towerShot = "shotA";
		
		//Set action
		this.element.on('pointerdown', pointer=>{			
			//Check that the tower can be improved
			if(this.checkUpgrade() == true) this.element = new TowerAA(this.st, this.element, this.xPos, this.yPos);					
		});
	}
}