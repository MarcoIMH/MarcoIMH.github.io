export default class MapFactory{
	constructor(state, mapSel){
		//super(state, array);
		this.st = state;
		this.mapSelector = mapSel;

		//Setting points for towers
		this.settingsArray = [];
		this.setMapPoints();

		//Setting points for summon enemy events
		this.summonPointsArray = [];
		this.setSummonPoints();
	}

	setMapPoints(){
		console.log("Settings map points for map "+this.mapSelector);
		switch(this.mapSelector){
			case 1:{				
				this.addMapPointToArray(new Phaser.Geom.Point(215, 375));
				this.addMapPointToArray(new Phaser.Geom.Point(570, 225));
				this.addMapPointToArray(new Phaser.Geom.Point(900, 375));
				break;
			}
			case 2:{
				this.addMapPointToArray(new Phaser.Geom.Point(250, 180));
				this.addMapPointToArray(new Phaser.Geom.Point(260, 570));
				this.addMapPointToArray(new Phaser.Geom.Point(550, 385));
				this.addMapPointToArray(new Phaser.Geom.Point(865, 190));
				this.addMapPointToArray(new Phaser.Geom.Point(865, 570));
				break;
			}			
			case 3:{
				this.addMapPointToArray(new Phaser.Geom.Point(290, 490));
				this.addMapPointToArray(new Phaser.Geom.Point(520, 490));
				this.addMapPointToArray(new Phaser.Geom.Point(760, 560));
				this.addMapPointToArray(new Phaser.Geom.Point(1025, 515));
				this.addMapPointToArray(new Phaser.Geom.Point(1260, 550));
				this.addMapPointToArray(new Phaser.Geom.Point(1170, 430));
				this.addMapPointToArray(new Phaser.Geom.Point(1125, 250));
				this.addMapPointToArray(new Phaser.Geom.Point(810, 185));
				this.addMapPointToArray(new Phaser.Geom.Point(625, 240));
				this.addMapPointToArray(new Phaser.Geom.Point(335, 170));
				break;
			}
			default:{console.log("Settings not found for that map selector");}
		}
	}

	setSummonPoints(){
		console.log("Settings summon points for map "+this.mapSelector);
		switch(this.mapSelector){
			case 1:{				
				this.addSummonPointArray(new Phaser.Geom.Point(15,400));
				break;
			}
			case 2:{
				this.addSummonPointArray(new Phaser.Geom.Point(30, 258));
				this.addSummonPointArray(new Phaser.Geom.Point(25, 485));
				break;
			}			
			case 3:{
				this.addSummonPointArray(new Phaser.Geom.Point(80, 462));
				this.addSummonPointArray(new Phaser.Geom.Point(355, 350));
				this.addSummonPointArray(new Phaser.Geom.Point(118, 245));
				break;
			}
			default:{console.log("Settings not found for that map selector");}
		}		
	}

	addMapPointToArray(p){	
		this.settingsArray[this.settingsArray.length] = p;		
	}	

	addSummonPointArray(p){
		this.summonPointsArray[this.summonPointsArray.length] = p;
	}

	getTowerPointArray(){
		return this.settingsArray;
	}

	getSummonPointArray(){
		return this.summonPointsArray;
	}
}