import TowerInterface from "./towerInterface.js";
import TowerA from "./towerA.js";
import TowerB from "./towerB.js";

export default class TowerBase extends TowerInterface {
	constructor(state, object, x, y){
		super(state, object, x, y);

		this.damage = 90;
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
			//PONER CÓDIGO AQUÍ PARA MOSTRAR LAS DOS OPCIONES DE MEJORA DE TORRE	

			//Check that the tower can be improved, in this case do it
			this.upgradeOption = "towerB";
			if(this.checkUpgrade() == true){
				if(this.upgradeOption == "towerA") this.element = new TowerA(this.st, this.element, this.xPos, this.yPos);
				else this.element = new TowerB(this.st, this.element, this.xPos, this.yPos);
			}			
		});
	}
}