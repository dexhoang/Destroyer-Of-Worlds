class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.maxJumps = 1
    }

    create() {
        //game status
        this.gameStart = false
        this.gameOver = false
        this.death = false
        this.check1 = false

        //add background
        this.sky = this.add.tileSprite(0, 0, 950, 800, 'sky').setOrigin(0, 0)
        this.sky.fixedToCamera = true

        //player 
        this.player = new Player(this, 200, 150, 'playerIdle', 0).setScale(0.7, 0.7)

        //add enemy
        this.boss = this.physics.add.sprite(gameWidth/4, gameHeight/2 + 80, 'boss')
        this.boss.body.setSize(360, 670)
        this.boss.body.setOffset(30, 60)
        this.boss.body.setImmovable(true)


        //create player keys
        this.keys = this.input.keyboard.createCursorKeys()

        //adding tilemap
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)

        //spawn and checkpoints
        this.spawn = map.findObject('Points', (obj) => obj.name === 'spawn1')

        this.point1 = map.findObject('Points', (obj) => obj.name === 'spawn2')   

        //collision with map
        bgLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, bgLayer)

        //handle camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

        //handle world bounds
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //collision with enemy
        this.physics.add.collider(this.player, this.boss)

        //test key
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

    }

    update() {
        //test key
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.death = true
        }

        //update player FSM
        this.playerFSM.step()
        
        //sky background config
        this.sky.setPosition.X = this.game.fixedToCamera
        this.sky.setScrollFactor(0)
        this.sky.tilePositionX += 1  

        //checkpoint system
        this.physics.add.overlap(this.player, this.point1, () => {
            this.check1 = true
        })

        //call respawn
        if (this.death == true) {
            if (this.check1 == true) {
                this.player.setX(this.point1.x)
                this.player.setY(this.point1.y)
                this.death = false
            }
            else {
                this.player.setX(this.spawn.x)
                this.player.setY(this.spawn.y)
                this.death = false
            }
        }
    }
    
}