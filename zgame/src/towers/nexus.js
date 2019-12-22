import GObject from "../gObject.js";

export default class Nexus extends GObject{
	constructor(state, object, x, y){
		super(state, object, x, y);		
		this.maxHp = 1500;
		this.hp = 1500;

		//Bar atributes
		this.thicknessBar = 25;
		this.maxSizeBar = 250;
		this.actualBarSize = 250;

		this.createNexus();
	}

	createNexus(){
		//Set config
		this.st.add.existing(this);
		this.st.physics.world.enable(this);	

		//Set image
		this.element = this.st.add.image(this.xPos, this.yPos, "nexus").setScale(0.2);

		//Graphics
		this.graphics = this.st.add.graphics();	
	}

	substractHp(howMany){
		this.hp -= howMany;
		
		if(this.hp <= 0) this.st.setEndGame(true);
		else this.updateHpBar();
	}

	updateHpBar(){

	}

	preUpdate(){ 
		//The percentage of life that the nexus has lost is calculated
		let percentage = ((this.hp * 100) / this.maxHp);	

		//Then applies to hp size bar
		this.actualBarSize = ((this.maxSizeBar * percentage) / 100);

		//Bottom hp bar
        this.graphics.fillStyle(0x1C180E, 1);
        this.graphics.fillRect(this.xPos - 125, this.yPos + 150, this.maxSizeBar, this.thicknessBar);	

        //Top hp bar
        this.graphics.fillStyle(0xDF6A18, 1);
        this.graphics.fillRect(this.xPos - 125, this.yPos + 150, this.actualBarSize, this.thicknessBar);
	}
}