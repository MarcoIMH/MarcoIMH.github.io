import UnitBase from "./unitBase.js";

export default class MiddleUnit extends UnitBase {
	constructor(state, x, y, unitStats, texture){
		super(state, x, y, unitStats, texture, "middleUnitAnimation");
	} 
}