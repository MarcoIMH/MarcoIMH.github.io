import UnitBase from "../units/unitBase.js";

export default class EnemyBase extends UnitBase {
	constructor(state, object, x, y, enemyStats){
		super(state, object, x, y);
		this.stats = enemyStats;

		this.velocity = new Phaser.Geom.Point(1, 0)

		//Resistances
		this.poisonRes;	
		this.iceRes;	
		this.fireRes;
		this.thunderRes;

		this.enemyConfigCreation();
	}

	enemyConfigCreation(){	
		//Settings scene configuration
		this.st.add.existing(this);
        this.st.physics.world.enable(this);	

        //Setting stats
		this.dps = this.stats[0];
		this.hp = this.stats[1];
		this.poisonRes = this.stats[2];
		this.iceRes = this.stats[3];
		this.fireRes = this.stats[4];
		this.thunderRes = this.stats[5];
	}
	
	movement(){	
		this.xPos += this.velocity.x;	
		this.element.setPosition(this.xPos, this.yPos);
	}

	preUpdate(){		
		this.movement();
	}
}