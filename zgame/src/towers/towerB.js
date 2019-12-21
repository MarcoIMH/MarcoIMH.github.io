import TowerInterface from "./towerInterface.js";
import TowerBB from "./towerBB.js";

export default class TowerB extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 65;
		this.range = 14;
		this.cadence = 1.5;
		this.upgradeExp = 120;

		this.creatTowerB();	
	}

	creatTowerB(){
		console.log("Upgrading towerBase to towerB at: "+this.xPos+","+this.yPos);
		//Set image. This +105 / +35 its needed to places tower in the correct position.
		this.element = this.st.add.image(this.xPos + 105, this.yPos + 35, "towerB").setScale(0.15).setInteractive();

		//Set action
		this.element.on('pointerdown', pointer=>{			
			//Check that the tower can be improved
			if(this.checkUpgrade() == true) this.element = new TowerBB(this.st, this.element, this.xPos, this.yPos);					
		});
	}
}