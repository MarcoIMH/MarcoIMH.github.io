import GObject from "../gObject.js";
import Shots from "./shots.js";

export default class TowerInterface extends Phaser.GameObjects.Sprite{
	constructor(state, object, x, y){
		super(state, x, y);	
		this.st = state;
		this.element = object;	
		this.damage = 0;

		this.range = 150;
		this.cadence = 70;
		this.timeFromLastShot = 0;	

		this.xPos = x;
		this.yPos = y;
		this.xRelPos;
		this.yRelPos;

		this.towerShot;
		this.upgradeExp;
		this.upgradeOption;

		this.st.add.existing(this);
	}

	//state, x, y, texture, damage, xEnemyPoint, yEnemyPoint
	preUpdate(){		
		if(this.towerShot != undefined && this.timeFromLastShot > this.cadence){			
			this.st.enemyGroup.children.iterate(enem=>{
				if(this.xPos + this.range < enem.getXPos() && this.yPos + this.range < enem.getYPos() && this.timeFromLastShot > this.cadence){									
					this.st.newShot(new Shots(this.st, this.xRelPos, this.yRelPos, ""+this.towerShot, this.damage, enem.getXPos(), enem.getYPos()));
					this.timeFromLastShot = 0;				
				}
			});
		}else this.timeFromLastShot++;				
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