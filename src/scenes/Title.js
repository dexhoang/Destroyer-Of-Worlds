class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
   
    }

    update() {
        this.scene.start('playScene')
    }
}