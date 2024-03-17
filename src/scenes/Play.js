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

        //background music 
        this.sound.add('playMusic')
        //this.sound.play('playMusic', {volume: 0.3})

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

        //add score text
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '35px',
            align: 'left',
            color: '#000000'
        }
        
        this.scoreText = this.add.text(950, 650, 'SCORE:', scoreConfig)

        //create health/burger b1ar for player
        this.playerBar = this.createBar(this.player.x - 50, this.player.y - 100, 100, 20, 0x1A9534)

        this.burgerBar = this.createBar(this.player.x - 50, this.player.y - 80, 100, 5, 0xf2ca5a)
        this.maxBurgers = 10

        //sets time for burger reload
        this.timeSince = 0

    }

    update(time, delta) {
        //deplete burger bar and play shoot animation
        if(Phaser.Input.Keyboard.JustDown(this.keys.space) && this.maxBurgers > 0) {
            //console.log(this.maxBurgers)
            this.maxBurgers --
            this.shootBurger()
            this.setValue(this.burgerBar, this.maxBurgers)
        }

        //checks if player has less than 10 burger, then reloads burgers every 1.5 seconds
        if(this.maxBurgers < 10) {
            this.timeSince += delta
            while(this.timeSince >= 1500) {
                this.maxBurgers ++
                this.setValue(this.burgerBar, this.maxBurgers)
                this.timeSince = 0
            }
        } else {
            this.timeSince = 0
        }

        //move bars alongside player
        this.playerBar.x = this.player.x - 50
        this.playerBar.y = this.player.y - 100

        this.burgerBar.x = this.player.x - 50
        this.burgerBar.y = this.player.y - 80

        //test key
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            //this.death = true
            console.log ('BOSS: ' + this.boss.x, this.boss.y)
            console.log ('PLAYER: ' + this.player.x, this.player.y)
            console.log ('CHECKPOINT1: ' + this.point1.x, this.point1.y)
            console.log ('CHECKPOINT2: ' + this.point2.x, this.point2.y)
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
            if (this.player.x - this.boss.x > 600) {
                this.boss.x += 3
            }
            else if (this.player.x - this.boss.x > 400) {
                this.boss.x += 2
            }
            else if (this.player.x - this.boss.x < 200) {
                this.boss.x += 0.75
            }
            else {
                this.boss.x += 1
            }
        }

        //plays game over screen
        if (this.gameOver == true) {
            this.sound.stopAll()
            this.scene.start('endScene')
        }

        //moves score along with camera
        this.scoreText.x = this.cameras.main.scrollX
        this.scoreText.y = this.cameras.main.scrollY

        if (this.pDone == true) {
            // this.player.setX(this.fightScreen.x)
            // this.player.setY(this.fightScreen.y)

            moveTo(this.player, this.fightScreen.x, this.fightScreen.y,)
        }
    }

    //function to create bar
    createBar(x, y, width, height, color) {
        let bar = this.add.graphics() 
        bar.lineStyle(width, color, 1)
        bar.fillStyle(color, 1)
        bar.fillRect(0, 0, width, height)
        bar.x = x
        bar.y = y

        return bar
    }

    //function to chnage bar value
    setValue(bar, percent) {
        bar.scaleX = percent/10
    }

    //shoots burger, adds collider with burger and boss then calls function destroyBurger
    shootBurger() {
        if(this.player.flipX) {
            this.burger = this.physics.add.sprite(this.player.x - 50, this.player.y, 'burger')
            this.burger.setVelocityX(-500) 
            this.sound.play('firing', {volume: 0.3})
            this.physics.add.collider(this.burger, this.boss, this.destroyBurger)
        } else {
            this.burger = this.physics.add.sprite(this.player.x + 50, this.player.y, 'burger')
            this.burger.setVelocityX(500)
            this.sound.play('firing', {volume: 0.3})
            this.physics.add.collider(this.burger, this.boss, this.destroyBurger)
        }
    }
    
    //destroys burger and plays hit animation
    destroyBurger(burger, boss) {
        burger.play('burgerHit', true)
        burger.once('animationcomplete', () => {
            burger.destroy()
        })
    }
}