class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {

    }

    create() {
        //game status
        this.gameStart = false
        this.gameOver = false
        this.death = false
        this.check1 = false
        this.check2 = false
        this.pDone = false

        //add background
        this.sky = this.add.tileSprite(0, 0, 950, 800, 'sky').setOrigin(0, 0)
        this.sky.fixedToCamera = true

        //add enemy
        this.boss = this.physics.add.sprite(-200, gameHeight/2 + 80, 'boss')
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
        this.point2 = map.findObject('Points', (obj) => obj.name === 'spawn3')
        this.pEnd = map.findObject('Points', (obj) => obj.name === 'pEnd')
        this.fightScreen = map.findObject('Points', (obj) => obj.name === 'fightScreen')   
        this.zone1 = map.findObject('Points', (obj) => obj.name === 'zone1') 
        console.log(this.zone1)
        
        this.checkpoint1 = this.physics.add.sprite(this.point1.x, this.point1.y, 'head')
        this.checkpoint2 = this.physics.add.sprite(this.point2.x, this.point2.y, 'head')
        this.endPoint = this.physics.add.sprite(this.pEnd.x, this.pEnd.y, 'head')

        //player 
        this.player = new Player(this, this.spawn.x, this.spawn.y, 'playerIdle', 0).setScale(0.7, 0.7)

        //collision with map
        bgLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, bgLayer)

        //handle camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

        //handle world bounds
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //collision with enemy
        //this.physics.add.collider(this.player, this.boss)

        //test key
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        //call shootBurger function when player presses SPACE
        this.keys.space.on('down', this.shootBurger, this)

        //add score text
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '35px',
            align: 'left',
            color: '#000000'
        }
        
        this.scoreText = this.add.text(950, 650, 'SCORE:', scoreConfig)

    }

    //shoots burger, adds collider with burger and boss then calls function destroyBurger
    shootBurger() {
        if(this.player.flipX) {
            this.burger = this.physics.add.sprite(this.player.x - 50, this.player.y, 'burger')
            this.burger.setVelocityX(-500)
            this.sound.play('firing', {volume: 1})
            this.physics.add.collider(this.burger, this.boss, this.destroyBurger)
        } else {
            this.burger = this.physics.add.sprite(this.player.x + 50, this.player.y, 'burger')
            this.burger.setVelocityX(500)
            this.sound.play('firing', {volume: 1})
            this.physics.add.collider(this.burger, this.boss, this.destroyBurger)
        }
    }

    //destroys burger and plays hit animation
    destroyBurger(burger, boss) {
        burger.play('burgerHit', true)
        burger.once('animationcomplete', () => {
            burger.destroy()
        })
        // boss.setTint(0x757575)
        // this.time.delayedCall(1000, () => {
        //     boss.clearTint()
        // }, null, this)
    }

    update() {
        //test key
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            //this.death = true
            console.log (this.boss.x)
        }

        //update player FSM
        this.playerFSM.step()
        
        //sky background config
        this.sky.setPosition.X = this.game.fixedToCamera
        this.sky.setScrollFactor(0)
        this.sky.tilePositionX += 1  

        //checkpoint system
        this.physics.add.overlap(this.player, this.checkpoint1, () => {
            this.check1 = true
        })
        this.physics.add.overlap(this.player, this.checkpoint2, () => {
            this.check2 = true
        })
        this.physics.add.overlap(this.player, this.endPoint, () => {
            this.pDone = true
        })

        //boss player collision
        this.physics.add.overlap(this.player, this.boss, () => {
            this.gameOver = true
        })


        //call respawn
        if (this.death == true) {
            if (this.check2 == true) {
                this.player.setX(this.point2.x)
                this.player.setY(this.point2.y)
                this.death = false
            }
            else if (this.check1 == true) {
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
        if (!this.gameOver) {
            if (this.player.x - this.boss.x > 500) {
                this.boss.x += 3
            }
            else if (this.player.x - this.boss.x > 300) {
                this.boss.x += 2
            }
            else if (this.player.x - this.boss.x < 100) {
                this.boss.x += 0.75
            }
            else {
                this.boss.x += 1
            }
        }

        if (this.gameOver == true) {
            this.scene.start('endScene')
        }

        //moves score along with camera
        this.scoreText.x = this.cameras.main.scrollX
        this.scoreText.y = this.cameras.main.scrollY

        if (this.pDone == true) {
            this.player.setX(this.fightScreen.x)
            this.player.setY(this.fightScreen.y)
        }
    }
    
}