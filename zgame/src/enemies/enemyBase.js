import UnitBase from "../units/unitBase.js";

export default class EnemyBase extends UnitBase {
	constructor(state, object, x, y, enemyStats){
		super(state, object, x, y);
		this.stats = enemyStats;

		this.velocity = new Phaser.Geom.Point(10, 0)

		//Resistances
		this.poisonRes;	
		this.iceRes;	
		this.fireRes;
		this.thunderRes;

		this.enemyConfigCreation();
	}

	preUpdate(time, delta){		
		this.movement();
	}

	enemyConfigCreation(){	
		console.log(this.stats);
	}

	movement(){	
		this.xPos += 0.5;	
		this.element.setPosition(this.xPos, this.yPos);
	}
}