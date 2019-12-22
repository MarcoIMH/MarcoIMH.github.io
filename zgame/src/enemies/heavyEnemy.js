import EnemyBase from "./enemyBase.js";

export default class HeavyEnemy extends EnemyBase{
	constructor(state, x, y, enemyStats){
		super(state, x, y, enemyStats, "heavyEnemy", "heavyEnemyAnimation");
	}
}