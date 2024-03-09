class Dead extends Phaser.Scene {
    constructor() {
        super("endScene")
    }

    create() {

        //adding end screen
        this.add.image(game.config.width/2, game.config.height/2, 'endScreen').setScale(0.75, 0.75)

        //adding keyboard inputs
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)        

    }

    update() {
        //controls - space to play and C for credits
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('titleScene')
        }
    }
}