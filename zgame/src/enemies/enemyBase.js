import GObject from "../gObject.js";

export default class EnemyBase extends GObject {
	constructor(state, x, y, enemyStats, texture, animation){
		super(state, x, y, texture);
		this.damage;
		this.hp;

		this.animation = animation;

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
        //Setting stats
		this.damage = this.stats[0];
		this.hp = this.stats[1];
		this.poisonRes = this.stats[2];
		this.iceRes = this.stats[3];
		this.fireRes = this.stats[4];
		this.thunderRes = this.stats[5];
	}
	
	movement(){	
		this.xPos += this.velocity.x;	

		if(this!=undefined){
			this.setPosition(this.xPos, this.yPos);
		}
	}

	attack(other){
		other.substractHp(this.damage);		
		this.st.removeEnemy(this);
		this.destroy();
	}

	preUpdate(){		
		this.movement();
	}
}