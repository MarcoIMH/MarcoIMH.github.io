export default class MapFactory extends Phaser.GameObjects.Sprite{
	constructor(state, array, mapSel){
		super(state, array);
		this.st = state;	
		this.settingsArray = this.st.add.group();	
		this.mapSelector = mapSel;
		var point;
		this.setMapPoints();
	}

	setMapPoints(){
		console.log("Settings map points for map "+this.mapSelector);
		switch(this.mapSelector){
			case 1:{	
				this.point[100, 100];			
				this.addMapPointToArray();	
				this.point[200, 200];
				this.addMapPointToArray();
				this.point[300, 300];
				this.addMapPointToArray();
				break;
			}

			case 2:{

				break;
			}

			case 3:{

				break;
			}

			default:{
				console.log("Settings not found for that map selector");
			}
		}
	}
	addMapPointToArray(){	
		this.settingsArray.add(point);	
	}	
	getMapPointArray(){
		return this.settingsArray;
	}
}