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

	attackUnit(other){
		other.unitSubstractHp(this.damage);	
	}

	enemySubstractHp(howMany){
		if(this.hp - howMany > 0){
			this.hp -= howMany;			
		}else this.clearEnemy();		
	}

	enemySubstractHpWithResisTances(pAt, iAt, fAt, tAt){
		if(this.poisonRes < pAt)  this.hp -= (pAt - this.poisonRes);
		if(this.iceRes < iAt)  this.hp -= (iAt - this.iceRes);
		if(this.fireRes < fAt)  this.hp -= (fAt - this.fireRes);
		if(this.thunderRes < tAt)  this.hp -= (tAt - this.thunderRes);

		console.log(this.hp);
		if(this.hp < 0) this.clearEnemy();
	}

	clearEnemy(){
		console.log("Enemy killed. Adding exp: "+this.exp);		
		this.st.addAccumulatedExp(this.exp);
		this.st.removeEnemy(this);
		this.destroy();
	}

	preUpdate(){
		this.st.objectMoveDown(this);	
		this.movement();
	}
}