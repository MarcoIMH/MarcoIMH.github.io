import GObject from "../gObject.js";

export default class UnitBase extends GObject {
	constructor(state, x, y, unitStats, texture, animation){
		super(state, x, y, texture);		
		this.stats = unitStats;		
		this.velocity = new Phaser.Geom.Point(1, 0);

		//Enemy config
		this.hp;
		this.poisonAtt;	
		this.iceAtt;	
		this.fireAtt;
		this.thunderAtt;
		this.timeFault;

		this.animation = animation;

		this.unitConfigCreation();		
	}

	unitConfigCreation(){	
        //Setting stats
        console.log(this.stats);
		this.hp = this.stats[0];
		this.poisonAtt = this.stats[1];
		this.iceAtt = this.stats[2];
		this.fireAtt = this.stats[3];
		this.thunderAtt = this.stats[4];
		this.timeFault = this.stats[5];
	}
	
	movement(){	
		this.xPos -= this.velocity.x;	

		if(this != undefined){
			this.setPosition(this.xPos, this.yPos);
		}
	}

	attack(other){
		other.enemySubstractHpWithResisTances(this.poisonAtt, this.iceAtt, this.fireAtt, this.thunderAtt);		
		this.clearUnit();
	}

	unitSubstractHp(howMany){
		if(this.hp - howMany > 0){
			this.hp -= howMany;			
		}else this.clearUnit();		
	}

	clearUnit(){	
		this.st.removeUnit(this);
		this.destroy();
	}

	preUpdate(){
		this.st.objectMoveDown(this);	
		this.movement();
	}
}