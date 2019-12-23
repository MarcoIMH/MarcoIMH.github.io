import TowerInterface from "./towerInterface.js";
import TowerA from "./towerA.js";
import TowerB from "./towerB.js";

export default class TowerBase extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.opt;
		this.optA;
		this.optB;

		this.damage = 35;
		this.range = 150;
		this.cadence = 50;
		this.upgradeExp = 80;	

		this.createTowerBase();			
	}

	createTowerBase(){
		//This +100 / +60 its needed to places tower in the correct position.
		this.xRelPos = this.xPos + 100;
		this.yRelPos = this.yPos + 60;

		console.log("Upgrading towerPoint to towerBase");

		//Set shot type
		this.towerShot = "shotBase";

		//Set image
		this.element = this.st.add.image(this.xRelPos, this.yRelPos, "towerBase").setScale(0.2).setInteractive();

		//Set action
		this.element.on('pointerdown', pointer=>{	
			//Check that the tower can be improved, in this case open options panel
			this.openOptions();
		});
	}

	openOptions(){
		//Tower user option
		this.opt = this.st.add.image(this.xRelPos, this.yRelPos - 100, "option");

		this.optA = this.st.add.image(this.xRelPos - 35, this.yRelPos - 105, "towerAicon").setScale(0.5).setInteractive();
		this.optA.on('pointerdown', pointer=>{			
			if(this.checkUpgrade() == true) {
				console.log("entra en A");
				this.clearOptions();
				this.element = new TowerA(this.st, this.element, this.xPos, this.yPos);	
			}
			else this.clearOptions();
		});
		
		this.optB = this.st.add.image(this.xRelPos + 35, this.yRelPos - 105, "towerBicon").setScale(0.5).setInteractive();
		this.optB.on('pointerdown', pointer=>{
			if(this.checkUpgrade() == true) {
				console.log("entra en B");
				this.clearOptions();
				this.element = new TowerB(this.st, this.element, this.xPos, this.yPos);
			}
			else this.clearOptions();
		});
	}

	clearOptions(){
		this.opt.destroy();
		this.optA.destroy();
		this.optB.destroy();
	}
		
}