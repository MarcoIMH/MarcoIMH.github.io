import GObject from "../gObject.js";

export default class Nexus extends GObject{
	constructor(state, x, y){
		super(state, x, y, "nexus");		
		this.maxHp = 1500;
		this.hp = 1500;

		//Bar atributes
		this.thicknessBar = 25;
		this.maxBarSize = 250;		
		this.actualBarSize = 250;

		this.createNexus();
	}

	createNexus(){

		//Graphics
		this.graphics = this.st.add.graphics();	

		this.setScale(0.2);
		
		this.updateHpBar();
	}

	substractHp(howMany){
		if(this.hp - howMany > 0) {			
			this.hp -= howMany;			
			this.updateHpBar();
			console.log("Nexus attacked!! Hp left: "+this.hp);
		}else{
			this.hp = 0;
			this.st.setEndGame(true);
		}
	}

	updateHpBar(){
		//The percentage of life that the nexus has lost is calculated
		let percentage = ((this.hp * 100) / this.maxHp);	

		//Then applies to hp size bar
		this.actualBarSize = ((this.maxBarSize * percentage) / 100);

		//Bottom hp bar
        this.graphics.fillStyle(0x1C180E, 1);
        this.graphics.fillRect(this.xPos - 125, this.yPos + 150, this.maxBarSize, this.thicknessBar);	

        //Top hp bar
        this.graphics.fillStyle(0xDF6A18, 1);
        this.graphics.fillRect(this.xPos - 125, this.yPos + 150, this.actualBarSize, this.thicknessBar);		
	}
}