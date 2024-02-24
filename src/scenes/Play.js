class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.player = this.physics.add.sprite(gameWidth/2, gameHeight/2, 'playerIdle', 0)
        this.player.play('idle')
    }

    update() {
        
    }
}