import TowerInterface from "./towerInterface.js";
import TowerBase from "./towerBase.js";

//let pointer;

export default class TowerPoint extends TowerInterface{
	constructor(state, x, y){
		super(state, x, y);
		this.upgradeExp = 50;
		this.createTowerPoint();		
	}

	createTowerPoint(){
		console.log("Creating towerPoint at: "+this.xPos + "," + this.yPos);
		//Set image in this object
		this.element = this.st.add.image(this.xPos + 100, this.yPos +100, "towerPoint1").setScale(0.2).setInteractive(); 

		//Set action
		this.element.on('pointerdown', pointer=>{			
			//Check that the tower can be improved
			if(this.checkUpgrade() == true) {
				this.element = new TowerBase(this.st, this.element, this.xPos, this.yPos);
			}				
		});
	}
}