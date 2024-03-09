class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        //adding title screen
        this.add.image(game.config.width/2, game.config.height/2, 'titleScreen').setScale(0.75, 0.75)

        //adding keyboard inputs
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        //bgMusic
        this.sound.add('bgMusic', { volume: 0.7, loop: true });

    }

    update() {
        //controls - space to play and C for credits
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditScene')
        }
    }
}