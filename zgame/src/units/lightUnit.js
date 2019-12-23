import UnitBase from "./unitBase.js";

export default class LightUnit extends UnitBase {
	constructor(state, x, y, unitStats, texture){
		super(state, x, y, unitStats, texture, "lightUnitAnimation");
	} 
}