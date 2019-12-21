import EnemyBase from "./enemyBase.js";

export default class LightEnemy extends EnemyBase{
	constructor(state, object, x, y, enemyType, enemyStats){
		super(state, object, x, y, enemyType, enemyStats);

		this.createLightEnemy();
	}

	createLightEnemy(){
		this.element = this.st.add.image(this.xPos, this.yPos, "lightEnemy");
	}
}