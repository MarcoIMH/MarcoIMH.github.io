import EnemyBase from "./enemyBase.js";

export default class HeavyEnemy extends EnemyBase{
	constructor(state, object, x, y, enemyType, enemyStats){
		super(state, object, x, y, enemyType, enemyStats);

		this.createHeavyEnemy();
	}

	createHeavyEnemy(){
		this.element = this.st.add.image(this.xPos, this.yPos, "heavyEnemy");

		this.st.add.existing(this);
        this.st.physics.world.enable(this);		
	}
}