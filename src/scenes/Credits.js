class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        // this.sound.stopAll()
        // this.sound.play('titleMusic', {volume:0.8})
        this.add.image(0, 0, 'credits').setOrigin(0, 0)
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.keys.left.isDown) {
            this.scene.start('titleScene')
        }
    }
}