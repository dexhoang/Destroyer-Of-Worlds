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

        //control scene
        this.load.image('controls', 'controls.png')

        //credits
        this.load.image('credits', 'credits.png')

        //cherry
        this.load.image('cherry', 'cherry.png')

        //background
        this.load.image('sky', 'sky.png')

        //end screen
        this.load.image('endScreen', 'gameover_screen.png')

        //win screen
        this.load.image('winScreen', 'win.png')

        //load sound
        this.load.audio('titleMusic', 'title_music.mp3')
        this.load.audio('parkourMusic', 'parkour_music.mp3')
        this.load.audio('bossMusic', 'boss_music.mp3')
        this.load.audio('firing', 'firing2.wav')
        this.load.audio('checkpointPing', 'checkpoint_ping.wav')
        this.load.audio('cherryPing', 'pickup_cherry.wav')
        this.load.audio('fireballSound', 'fireball_sound.wav')
        this.load.audio('fireballHit', 'fireball_hit.wav')
        this.load.audio('jumpSound', 'jump.wav')
        this.load.audio('burgerHit', 'burger_hit.wav')
        this.load.audio('winMusic', 'winMusic.mp3')

        //small lemon
        this.load.image('head', 'miniLemon.png')
        this.load.image('burgerParticle', 'burger_particle.png')

        //target
        this.load.image('target', 'target.png')

        //checkpoint flag
        this.load.image('redFlag', 'red_flag.png')
        this.load.image('greenFlag', 'green_flag.png')
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
        this.load.image('burgerEffect', 'burger_effect.png')

        this.load.spritesheet('burgerHit', 'burger_hit.png', {
            frameWidth: 37,
            frameHeight: 37
        })

        //fireball for boss
        this.load.image('fireball', 'fireball.png')
        
        //load tileset and tilemap json
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'overworld.json')

        this.load.tilemapTiledJSON('tilemapJSON1', 'bossworld.json')
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