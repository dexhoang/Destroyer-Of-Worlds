class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'

        this.load.image('titleScreen', 'TitleScreen.png')

        this.load.spritesheet('playerIdle', 'player_idle.png', {
            frameWidth: 120,
            frameHeight: 160
        })

        this.load.spritesheet('playerRun', 'player_run.png', {
            frameWidth: 120,
            frameHeight: 160
        })
    }

    create() {
        this.anims.create({
            key: 'idle',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerIdle', {
                start: 0,
                end: 2
            })
        })

        this.anims.create({
            key: 'run',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerRun', {
                start: 0,
                end: 3
            })
        })

        this.scene.start('titleScene')
    }
}