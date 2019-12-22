import GObject from "../gObject.js";

export default class Shots extends GObject{
	constructor(state, x, y, texture, damage, xEnemyPoint, yEnemyPoint){
		super(state, x, y, texture);
		this.dmg = damage;
		this.isImpacted = false;

		//Set rotation
		this.rotation = Phaser.Math.Angle.Between(this.x, this.y, xEnemyPoint, yEnemyPoint);

		//Calculate direction vector and save it
		this.velocity = new Phaser.Geom.Point(15, 15);
		this.direction = new Phaser.Geom.Point((this.x - xEnemyPoint) / this.velocity.x, (this.y - yEnemyPoint) / this.velocity.y);
	}

	movement(){			
		if(this != undefined){
			this.setPosition(this.x - this.direction.x, this.y - this.direction.y);
		}
	}

	attack(enemy){
		if(this.isImpacted == false){
			this.isImpacted = true;
			enemy.enemySubstractHp(this.dmg);
		}
		this.clearShot();		
	}

	clearShot(){
		this.st.removeShot(this);
		this.destroy();	
	}

	preUpdate(){				
		this.movement();
	}	
}