class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        //adding title screen
        this.add.image(game.config.width/2, game.config.height/2, 'titleScreen').setScale(1.16, 1.16)

        //adding keyboard inputs
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        //bgMusic
        this.sound.stopAll()
        this.sound.play('titleMusic', {volume:0.8})
        
        //create keys for option picking and sets option at start
        this.keys = this.input.keyboard.createCursorKeys()
        this.optionIndex = 0
        this.displayOption(this.optionIndex)
    }

    displayOption(index) {
        //changes option blinking animation based on option index
        if (this.option) {
            this.option.destroy()
        }

        if (this.optionFlip) {
            this.optionFlip.destroy()
        }

        switch(index) {
            case 0:
                this.option = this.add.sprite(gameWidth/2 - 60, gameHeight/2 + 145, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip = this.add.sprite(gameWidth/2 + 68, gameHeight/2 + 145, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip.setFlip(true)
                this.option.play('optionBlinker')
                this.optionFlip.play('optionBlinker')
                break
            case 1:
                this.option = this.add.sprite(gameWidth/2 - 90, gameHeight/2 + 202, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip = this.add.sprite(gameWidth/2 + 102, gameHeight/2 + 202, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip.setFlip(true)
                this.option.play('optionBlinker')
                this.optionFlip.play('optionBlinker')
                break
            case 2:
                this.option = this.add.sprite(gameWidth/2 - 80, gameHeight/2 + 260, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip = this.add.sprite(gameWidth/2 + 90, gameHeight/2 + 260, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip.setFlip(true)
                this.option.play('optionBlinker')
                this.optionFlip.play('optionBlinker')
                break
        }
    }

    update() {
        //changes option index based on up and down arrow
        if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
            if (this.optionIndex > 0) {
                this.optionIndex = this.optionIndex - 1
                this.displayOption(this.optionIndex)
            }
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
            if (this.optionIndex < 2) {
                this.optionIndex = this.optionIndex + 1
                this.displayOption(this.optionIndex)
            }
        }

        //plays scene based on option index
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            if (this.optionIndex == 0) {
                this.sound.stopAll()
                this.scene.start('playScene')
            } else if (this.optionIndex == 1) {
                this.scene.start('controlScene')
            } else if (this.optionIndex == 2) {
                this.scene.start('creditScene')
            }
        }

    }
}