export default class UnitFactory{
	constructor(state, mapSel){
		this.st = state;
		this.mS = mapSel;
		this.unitSettings = [];
		this.unitType = 0;
		this.texture;
	}

	newRandomUnit(){
		this.unitType = Phaser.Math.Between(1, this.mS * 3);

		switch(this.unitType){
			case 1:{
				this.texture = "lightUnit1";
				break;
			}
			case 2:{
				this.texture = "middleUnit1";
				break;
			}
			case 3:{
				this.texture = "heavyUnit1";
				break;
			}
			case 4:{
				this.texture = "lightUnit2";
				break;
			}
			case 5:{
				this.texture = "middleUnit2";
				break;
			}
			case 6:{
				this.texture = "heavyUnit2";
				break;
			}
			case 7:{
				this.texture = "lightUnit3";
				break;
			}
			case 8:{
				this.texture = "middleUnit3";
				break;
			}
			case 9:{
				this.texture = "heavyUnit3";				
				break;
			}
		}
		return this.texture;
	}

	getUniConfig(){

		//Reset config array
		this.resetConfig = [];
		this.unitSettings = this.resetConfig;
		
		/*-----------------------------------------------------------------------------------------------------------
				Array Structure: HP / POISON ATTACK / ICE ATTACK / FIRE ATTACK / THUNDER ATTACK / TIME FAULT
		------------------------------------------------------------------------------------------------------------*/
		switch(this.unitType){
			case 1: {
				this.unitSettings = [125,7,0,0,0, 200];
				break;
			}
			case 2:{
				this.unitSettings = [220,0,0,14,0, 300];
				break;
			}
			case 3:{
				this.unitSettings = [310,25,10,0,0, 400];
				break;
			}
			case 4:{
				this.unitSettings = [155,0,0,18,0, 300];
				break;
			}
			case 5:{
				this.unitSettings = [250,0,0,23,0, 400];
				break;
			}
			case 6:{
				this.unitSettings = [600,0,0,35,0, 500];
				break;
			}
			case 7:{
				this.unitSettings = [220,0,16,0,0, 400];
				break;
			}
			case 8:{
				this.unitSettings = [410,0,0,0,25, 500];
				break;
			}
			case 9:{
				this.unitSettings = [900,0,35,0,0, 600];
				break;
			}	
		}
		return this.unitSettings;
	}
}