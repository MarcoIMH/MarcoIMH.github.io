import EnemyBase from "./enemyBase.js";

export default class MiddleEnemy extends EnemyBase{
	constructor(state, x, y, enemyStats){
		super(state, x, y, enemyStats, "middleEnemy", "middleEnemyAnimation");
	}
}