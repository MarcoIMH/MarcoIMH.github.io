import GObject from "../gObject.js";

export default class Icon extends GObject{
	constructor(state, object, x, y, iconNumber){
		super(state, object, x, y);	
		this.p = iconNumber;
		this.createIcon();
	}

	createIcon(){
		this.img = "icon"+this.p;
		console.log("Creating "+this.img);
		this.element = this.st.add.image(this.xPos, this.yPos, this.img).setInteractive();
		this.element.on('pointerdown', pointer=>{				
			this.st.createSelector(this.p); //Set mapSelector && create selector in menuMap, its needed to knows wich map will be launch	
		});		
	}

	getIconNumber(){
		return this.p;
	}
}