import GObject from "../gObject.js";

export default class TowerInterface extends Phaser.GameObjects.Sprite{
	constructor(state, object, x, y){
		super(state, x, y);	
		this.st = state;
		this.element = object;	
		this.damage;
		this.range;
		this.cadence;	

		this.xPos = x;
		this.yPos = y;

		this.upgradeExp;
		this.upgradeOption;
	}

	preUpdate(){

	}

	setUpgradeOption(opt){
		this.upgradeOption = opt;
	}

	checkUpgrade(){
		//Check exp for upgrade
		if(this.st.getAccumulatedExp() >= this.upgradeExp){
			
			//Destroy the last object if necessary
			if(this.element != undefined) this.element.destroy();

			//Subtract from total exp accumulated this upgraded exp consumed.
			this.st.subtractAccumulatedExp(this.upgradeExp);

			return true;
		}
		console.log("Need more experiencie to upgrade this structure!");
		return false;
	}

	getXPos(){
		return this.xPos;
	}

	getYPos(){
		return this.yPos;
	}
}