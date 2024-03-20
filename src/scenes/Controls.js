class Controls extends Phaser.Scene {
    constructor() {
        super("controlScene")
    }

    create() {
        this.add.image(game.config.width/2, game.config.height/2, 'controls')
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.keys.left.isDown) {
            this.scene.start('titleScene')
        }
        
    }
}