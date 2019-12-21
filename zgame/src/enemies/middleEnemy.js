import EnemyBase from "./enemyBase.js";

export default class MiddleEnemy extends EnemyBase{
	constructor(state, object, x, y, enemyType, enemyStats){
		super(state, object, x, y, enemyType, enemyStats);

		this.createMiddleEnemy();
	}

	createMiddleEnemy(){
		this.element = this.st.add.image(this.xPos, this.yPos, "middleEnemy");
	}
}