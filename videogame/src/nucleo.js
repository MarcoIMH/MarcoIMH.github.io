const vidaTotal = 100;

export default class Nucleo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.setScale(3);
        this.setInteractive();
        this.vida = vidaTotal;
    }

    onDestroy() {
        this.game.derrota = true;
    }

    //BARRA QUE REPRESENTA LA SALUD DEL NÚCLEO
    barraSalud() {
        //CALCULAMOS LA VIDA PROPORCIONAL PARA SABER LA LONGITUD DE LA BARRA DE SALUD
        let barra = (this.vida * 150) / this.vidaTotal;
        let graphics = this.add.graphics();
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(1170, 180, barra, 20);
    }
}