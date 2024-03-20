class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        this.add.image(0, 0, 'credits').setOrigin(0, 0)
        this.keys = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.keys.left.isDown) {
            this.scene.start('titleScene')
        }
    }
}