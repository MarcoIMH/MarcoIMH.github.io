import GObject from "../gObject.js";
import Shots from "./shots.js";

export default class TowerInterface extends Phaser.GameObjects.Sprite{
	constructor(state, object, x, y){
		super(state, x, y);	
		this.st = state;
		this.element = object;	
		this.damage = 0;

		this.range;
		this.cadence;
		this.timeFromLastShot = 0;	

		this.xPos = x;
		this.yPos = y;
		this.xRelPos;
		this.yRelPos;

		this.shootingMode = true;
		this.towerShot;
		this.upgradeExp;
		this.upgradeOption;

		this.st.add.existing(this);
	}

	setUpgradeOption(opt){
		this.upgradeOption = opt;
	}

	checkUpgrade(){
		//Check exp for upgrade
		if(this.st.getAccumulatedExp() >= this.upgradeExp){
			this.shootingMode = false;

			//Destroy the last object if necessary
			if(this.element != undefined) this.element.destroy();

			//Subtract from total exp accumulated this upgraded exp consumed.
			this.st.subtractAccumulatedExp(this.upgradeExp);

			return true;
		}
		console.log("Need more experiencie to upgrade this structure!");
		return false;
	}

	preUpdate(){	
		this.st.bringTop(this);	
		if(this.shootingMode == true && this.range != 0 && this.towerShot != undefined && this.timeFromLastShot > this.cadence){			
			this.st.enemyGroup.children.iterate(enem=>{
				//Calculate absolute distance between enemy and this tower
				let xDist;
				if(this.xRelPos - enem.getXPos() > 0) xDist = this.xRelPos - enem.getXPos();
				else xDist = enem.getXPos() - this.xRelPos;

				let yDist;
				if(this.yRelPos - enem.getYPos() > 0) yDist = this.yRelPos - enem.getYPos();
				else yDist = enem.getYPos() - this.yRelPos;

				//Check distance vs range and attack if possible
				if(this.range > xDist && this.range > yDist && this.timeFromLastShot > this.cadence){						
					this.st.newShot(new Shots(this.st, this.xRelPos, this.yRelPos, ""+this.towerShot, this.damage, enem.getXPos(), enem.getYPos()));
					this.timeFromLastShot = 0;				
				}
			});
		}else this.timeFromLastShot++;				
	}


	getXPos(){
		return this.xRelPos;
	}

	getYPos(){
		return this.yRelPos;
	}
}