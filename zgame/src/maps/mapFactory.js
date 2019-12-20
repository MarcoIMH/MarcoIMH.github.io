export default class MapFactory{
	constructor(state, mapSel){
		//super(state, array);
		this.st = state;	
		this.settingsArray = [];
		this.mapSelector = mapSel;
		this.setMapPoints();
	}

	setMapPoints(){
		console.log("Settings map points for map "+this.mapSelector);
		switch(this.mapSelector){
			case 1:{				
				this.addMapPointToArray(new Phaser.Geom.Point(100, 100));
				
				break;
			}
			case 2:{break;}			
			case 3:{break;}
			default:{console.log("Settings not found for that map selector");}
		}
	}

	addMapPointToArray(p){	
		this.settingsArray[this.settingsArray.length] = p;		
	}	

	getMapPointArray(){
		return this.settingsArray;
	}
}