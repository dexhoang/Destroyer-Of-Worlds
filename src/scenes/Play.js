class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.player = this.physics.add.sprite(gameWidth/2, gameHeight/2, 'playerIdle', 0).setScale(0.7, 0.7)
        this.player.play('idle')

        //create player keys
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        //checks keys for player movement
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-200)
            this.player.setFlip(true, false)
            this.player.play('run', true)
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(200)
            this.player.resetFlip()
            this.player.play('run', true)
        } else {
            this.player.body.setVelocityX(0)
            this.player.play('idle')
        }
        
    }
}