import EnemyBase from "./enemyBase.js";

export default class LightEnemy extends EnemyBase{
	constructor(state, x, y, enemyStats){
		super(state, x, y, enemyStats, "lightEnemy", "lightEnemyAnimation");
	}
}