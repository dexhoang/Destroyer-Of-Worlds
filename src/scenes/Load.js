class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'

        //title scene
        this.load.image('titleScreen', 'title.png')

        //title option blinker
        this.load.spritesheet('optionBlinker', 'menu_blinker.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        //background
        this.load.image('sky', 'sky.png')

        //end screen
        this.load.image('endScreen', 'gameEnd.png')

        //load sound
        this.load.audio('bgMusic', 'bgMusic.mp3')
        this.load.audio('playMusic', 'playMusic.mp3')
        this.load.audio('firing', 'firing.wav')

        //small lemon
        this.load.image('head', 'miniLemon.png')
        this.load.image('5x5', '5x5_white.png')

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

        this.load.spritesheet('playerIdleShoot', 'player_stand_shoot.png', {
            frameWidth: 120,
            frameHeight: 160
        })

        this.load.spritesheet('playerRunShoot', 'player_run_shoot.png', {
            frameWidth: 120,
            frameHeight: 160
        })

        this.load.image('miniLemon', 'miniLemon.png')

        //boss
        this.load.image('boss', 'Boss1.png')

        //burger
        this.load.image('burger', 'burger.png')

        this.load.spritesheet('burgerHit', 'burger_hit.png', {
            frameWidth: 37,
            frameHeight: 37
        })
        
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
            key: 'idleShoot',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerIdleShoot', {
                start: 0,
                end: 1
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
            key: 'runShoot',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('playerRunShoot', {
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

        this.anims.create({
            key: 'burgerHit',
            frameRate: 16,
            frames: this.anims.generateFrameNumbers('burgerHit', {
                start: 0,
                end: 4
            })
        })

        this.anims.create({
            key: 'optionBlinker',
            frameRate: 3,
            repeat: -1,
            frames:this.anims.generateFrameNumbers('optionBlinker', {
                start: 0,
                end: 2
            })
        })

        this.scene.start('titleScene')
    }
}