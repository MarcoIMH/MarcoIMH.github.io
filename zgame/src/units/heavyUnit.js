import UnitBase from "./unitBase.js";

export default class HeavyUnit extends UnitBase {
	constructor(state, x, y, unitStats, texture){
		super(state, x, y, unitStats, texture, "heavyUnitAnimation");
	} 
}