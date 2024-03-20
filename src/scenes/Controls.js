class Controls extends Phaser.Scene {
    constructor() {
        super("controlScene")
    }

    create() {
        // this.sound.stopAll()
        // this.sound.play('titleMusic', {volume:0.8})
        this.add.image(game.config.width/2, game.config.height/2, 'controls')
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.keys.left.isDown) {
            this.scene.start('titleScene')
        }
        
    }
}