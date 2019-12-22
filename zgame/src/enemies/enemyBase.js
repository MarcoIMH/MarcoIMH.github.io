import GObject from "../gObject.js";

export default class EnemyBase extends GObject {
	constructor(state, x, y, enemyStats, texture, animation){
		super(state, x, y, texture);
		this.damage;
		this.hp;
		this.stats = enemyStats;		
		this.velocity = new Phaser.Geom.Point(1, 0);

		//Enemy config
		this.poisonRes;	
		this.iceRes;	
		this.fireRes;
		this.thunderRes;
		this.exp;

		this.animation = animation;

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
		this.exp = this.stats[6];
	}
	
	movement(){	
		this.xPos += this.velocity.x;	

		if(this != undefined){
			this.setPosition(this.xPos, this.yPos);
		}
	}

	attack(other){
		other.substractHp(this.damage);		
		this.clearEnemy();
	}

	enemySubstractHp(howMany){
		if(this.hp - howMany > 0){
			this.hp -= howMany;			
		}else this.clearEnemy();		
	}

	clearEnemy(){
		console.log("Enemy killed. Adding exp: "+this.exp);		
		this.st.addAccumulatedExp(this.exp);
		this.st.removeEnemy(this);
		this.destroy();
	}

	preUpdate(){
		//this.st.children.moveDown(this);	
		this.st.objectMoveDown(this);	
		this.movement();
	}
}