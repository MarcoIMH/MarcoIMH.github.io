import UnitBase from "../units/unitBase.js";

export default class EnemyBase extends UnitBase {
	constructor(state, object, x, y, enemyStats){
		super(state, object, x, y);
		this.stats = enemyStats;

		//Resistances
		this.poisonRes;	
		this.iceRes;	
		this.fireRes;
		this.thunderRes;

		this.enemyConfigCreation();
	}

	enemyConfigCreation(){	
		console.log(this.stats);
	}
}