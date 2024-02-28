class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.maxJumps = 1
    }

    create() {
        this.player = this.physics.add.sprite(gameWidth/2, gameHeight/2, 'playerIdle', 0).setScale(0.7, 0.7)
        this.player.play('idle')
        this.player.setGravityY(1000)
        this.player.body.setSize(60, 123)
        this.player.body.setOffset(30, 22)

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

        this.player.isGrounded = this.player.body.touching.down
        //checks conditions for jump
        if(this.player.isGrounded) {
            this.jump = this.maxJumps
            this.jumping = false
            console.log('there is a jump left')
        }

        this.jump = this.maxJumps

        if(cursors.up.isDown && this.jump > 0) {
            this.jump = this.maxJumps
            this.player.body.setVelocityY(-600)
            this.player.play('jump')
            this.jump--
        }

        if(this.physics.overlap(this.player, this.bgLayer)) {
            console.log('THEYRE TOUCHING')
        }
        
        
        // if(this.jumping) {
        //     console.log('jumping')
        //     this.jump -- 
        //     this.jumping = false
        // }
        
    }
}