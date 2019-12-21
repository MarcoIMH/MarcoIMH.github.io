export default class EnemyFactory{
	constructor(state, mapSel){
		this.st = state;
		this.ms = mapSel;
		this.enemySettings = [];			
		this.type;
	}

	getEnemyConfig(type){
		this.type = type;

		//Reset config array
		this.resetConfig = [];
		this.enemySettings = this.resetConfig;
		
		/*----------------------------------------------------------------------------------
				Array Structure: DPS / HP / POISON RES / ICE RES / FIRE RES / LIGHT RES
		------------------------------------------------------------------------------------*/
		switch(this.ms){
			case 1: {
				if     (this.type == "light")	this.enemySettings = [[1],[100],[0],[0],[0],[0]];
				else if(this.type == "middle")	this.enemySettings = [[2],[250],[5],[0],[0],[10]];
				else if(this.type == "heavy")	this.enemySettings = [[4],[500],[10],[0],[0],[20]];
				break;
			}
			case 2:{
				if     (this.type == "light")	this.enemySettings = [[2],[150],[5],[0],[0],[10]];
				else if(this.type == "middle")	this.enemySettings = [[4],[350],[10],[0],[0],[20]];
				else if(this.type == "heavy")	this.enemySettings = [[8],[800],[15],[0],[0],[30]];
				break;
			} 			
			case 3: {
				if     (this.type == "light")	this.enemySettings = [[4],[200],[10],[0],[0],[20]];
				else if(this.type == "middle")	this.enemySettings = [[8],[400],[15],[0],[0],[30]];
				else if(this.type == "heavy")	this.enemySettings = [[16],[820],[20],[0],[0],[40]];
				break;
			}
		}			
		return this.enemySettings;
	}
}