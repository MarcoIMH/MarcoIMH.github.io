let botonPausaVolver;
let botonPausaMenu;

export default class MenuPausa extends Phaser.GameObjects.Sprite {
    constructor(escene) {  
        super(escene);      
        this.game = escene;     
        this.createMenu();
    }

    createMenu() {      
        this.game.add.image(0, 0, "fondoCols").setOrigin(0);
        botonPausaMenu  = this.game.add.image(515, 380, "reiniciar0").setScale(0.7).setInteractive();
        botonPausaVolver = this.game.add.image(885, 380, "volver0").setScale(0.7).setInteractive();        
    }  
    onDestroy(){
        botonPauseMenu.destroy();
        botonPausaVolver.destroy();
    }
}
export function getBotonMenu(){    
    return botonPausaMenu;
}
export function getBotonVolver(){
    return botonPausaVolver;
}