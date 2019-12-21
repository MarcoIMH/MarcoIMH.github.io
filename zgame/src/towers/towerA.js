import TowerInterface from "./towerInterface.js";
import TowerAA from "./towerAA.js";

export default class TowerA extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);
		this.upgradeExp = 0;		
		this.createTowerA();	
	}

	createTowerA(){
		console.log("Upgrading towerBase to towerA at: "+this.xPos+","+this.yPos);
		//Set image. This +90 / +35 its needed to places tower in the correct position.
		this.element = this.st.add.image(this.xPos + 90, this.yPos + 35, "towerA").setScale(0.1).setInteractive();

		//Set action
		this.element.on('pointerdown', pointer=>{			
			//Check that the tower can be improved
			if(this.checkUpgrade() == true) this.element = new TowerAA(this.st, this.element, this.xPos, this.yPos);					
		});
	}
}