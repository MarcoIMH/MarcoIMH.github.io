export default class Derrota extends Phaser.Scene {
    constructor() {
        super({ key: "Derrota" });
    }

    preload() {
        this.w = this.sys.game.config.width / 2;
        this.h = this.sys.game.config.height / 2;
    }

    create(){
        let pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();
        let graphics = this.add.graphics();
        graphics.fillStyle(0x008B8B, 1);
        graphics.fillRect(420, 280, 600, 200);
        this.boton = this.add.text(this.w - 200, this.h - 50, "Reiniciar", { font: "80px Courier", fill: "#000000"});
        this.boton.setInteractive();
        this.boton.on('pointerdown', pointer => { this.scene.start("main"); });
    }
}