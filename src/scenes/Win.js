class Win extends Phaser.Scene {
    constructor() {
        super("winScene")
    }

    create() {
        //add image
        this.add.image(0, 0, 'winScreen').setOrigin(0, 0)

        score
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '35px',
            align: 'left',
            color: '#024300'
        }

        this.scoreText = this.add.text(gameWidth/2- 100, gameHeight/2 + 200, 'SCORE:' + score, scoreConfig).setOrigin(0, 0)

        //adding keyboard inputs
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        //bgMusic
        this.sound.stopAll()
        this.sound.play('winMusic', {volume:0.8})
        
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
                this.option = this.add.sprite(gameWidth/2 - 90, gameHeight/2 - 55, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip = this.add.sprite(gameWidth/2 + 85, gameHeight/2 - 55, 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip.setFlip(true)
                this.option.play('optionBlinker')
                this.optionFlip.play('optionBlinker')
                break
            case 1:
                this.option = this.add.sprite(gameWidth/2 - 130, gameHeight/2 + 55 , 'optionBlinker').setScale(1.5, 1.5)
                this.optionFlip = this.add.sprite(gameWidth/2 + 135, gameHeight/2 + 55, 'optionBlinker').setScale(1.5, 1.5)
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
            if (this.optionIndex < 1) {
                this.optionIndex = this.optionIndex + 1
                this.displayOption(this.optionIndex)
            }
        }

        //plays scene based on option index
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            if (this.optionIndex == 0) {
                this.sound.stopAll()
                this.scene.start('titleScene')
            } else if (this.optionIndex == 1) {
                this.scene.start('playScene')
            }
        }
        
    }
}