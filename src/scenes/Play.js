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

        //player specifications
        this.player = this.physics.add.sprite(gameWidth/2, gameHeight/2, 'playerIdle', 0).setScale(0.7, 0.7)
        this.player.play('idle')
        this.player.setGravityY(1400)
        this.player.body.setSize(60, 123)
        this.player.body.setOffset(30, 22)
        this.player.setCollideWorldBounds(true)

        //add enemy
        this.boss = this.physics.add.sprite(gameWidth/4, gameHeight/2 + 80, 'boss')
        this.boss.body.setSize(360, 670)
        this.boss.body.setOffset(30, 60)
        this.boss.body.setImmovable(true)


        //create player keys
        cursors = this.input.keyboard.createCursorKeys()

        //adding tilemap
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)

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
    }

    update() {
        //checks keys for player movement
        if(cursors.left.isDown) {
            this.player.body.setVelocityX(-200)
            this.player.setFlip(true, false)
            this.player.anims.play('run', true)
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(200)
            this.player.resetFlip()
            this.player.anims.play('run', true)
        } else {
            this.player.body.setVelocityX(0)
            this.player.anims.play('idle', true)
        }

        //checks jump conditions
        if(!this.player.body.onFloor()) {
            this.player.anims.play('jump')
        }

        if(this.player.body.onFloor() && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.body.setVelocityY(-600)
        }
        
    }
}