export default class UnitFactory{
	constructor(state, mapSel){
		this.st = state;
		this.ms = mapSel;
	}

	getUniConfig(type){
		this.type = type;

		//Reset config array
		this.resetConfig = [];
		this.unitSettings = this.resetConfig;
		
		/*-----------------------------------------------------------------------------------------------------------
				Array Structure: HP / POISON ATTACK / ICE ATTACK / FIRE ATTACK / THUNDER ATTACK / TIME FAULT
		------------------------------------------------------------------------------------------------------------*/
		switch(this.ms){
			case 1: {
				if     (this.type == "light")	this.unitSettings = [125,7,0,0,0];
				else if(this.type == "middle")	this.unitSettings = [220,0,0,14,0];
				else if(this.type == "heavy")	this.unitSettings = [310,25,10,0,0];
				break;
			}
			case 2:{
				if     (this.type == "light")	this.unitSettings = [155,0,0,18,0];
				else if(this.type == "middle")	this.unitSettings = [250,0,0,23,0];
				else if(this.type == "heavy")	this.unitSettings = [600,0,0,35,0];
				break;
			} 			
			case 3: {
				if     (this.type == "light")	this.unitSettings = [220,0,16,0,0];
				else if(this.type == "middle")	this.unitSettings = [410,0,0,0,25];
				else if(this.type == "heavy")	this.unitSettings = [900,0,35,0,0];
				break;
			}
		}			
		return this.unitSettings;
	}
}