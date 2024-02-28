class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'

        //title scene
        this.load.image('titleScreen', 'TitleScreen.png')

        //lemonhead
        this.load.spritesheet('playerJump', 'player_jump.png', {
            frameWidth: 120,
            frameHeight: 160
        })

        this.load.spritesheet('playerIdle', 'player_idle.png', {
            frameWidth: 120,
            frameHeight: 160
        })

        this.load.spritesheet('playerRun', 'player_run.png', {
            frameWidth: 120,
            frameHeight: 160
        })

        //boss
        this.load.image('boss', 'Boss1.png')
        
        //load tileset and tilemap json
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')
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

        this.anims.create({
            key: 'jump',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerJump', {
                start: 0,
                end: 0
            })
        })

        this.scene.start('titleScene')
    }
}