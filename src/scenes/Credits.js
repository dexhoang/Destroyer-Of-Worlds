class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.keys.left.isDown) {
            this.scene.start('titleScene')
        }
    }
}