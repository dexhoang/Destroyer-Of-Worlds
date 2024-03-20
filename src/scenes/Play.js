var score = 0
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
        this.lives = 3
        // this.score = 0
        this.cherried = false
        this.cherry = 0
        
        //add background
        this.sky = this.add.tileSprite(0, 0, 950, 800, 'sky').setOrigin(0, 0)
        this.sky.fixedToCamera = true

        //background music 
        this.sound.play('parkourMusic', {volume: 0.8})

        //add enemy
        this.boss = this.physics.add.sprite(-200, gameHeight/2 + 80, 'boss')
        this.boss.body.setSize(360, 670)
        this.boss.body.setOffset(30, 60)
        this.boss.body.setImmovable(true)

        this.bossTints = [0xffffff, 0x808080]
        this.originalTint = this.boss.tint
        this.grayTint = 0x808080

        this.bossTween = this.tweens.add({
            targets: this.boss,
            duration: 4000,
            yoyo: true,
            onStart: this.boss.setTint(0x808080),  
            onYoyo: this.boss.setTint(0xffffff),
        })

        // this.boss.setTint(0x808080)
        
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
        this.b1 = map.findObject('Points', (obj) => obj.name === 'boss1')
        this.b2 = map.findObject('Points', (obj) => obj.name === 'boss2')
        this.bigC = map.findObject('Points', (obj) => obj.name === 'special')

        this.bigCherry  = this.physics.add.sprite(this.bigC.x, this.bigC.y - 50, 'cherry').setCircle(32)
        this.bigCherry.body.setOffset(19)


        //create a group for cherries
        this.cherriesGroup = this.physics.add.group()

        //adding cherries
        map.filterObjects('Points', (obj) => obj.name.startsWith('c')).forEach(obj => {
            const cherry = this.cherriesGroup.create(obj.x, obj.y, 'cherry').setScale(0.6)
            cherry.body.setCircle(32)
            cherry.body.setOffset(19)

        });

        
        this.checkpoint1 = this.physics.add.sprite(this.point1.x + 5, this.point1.y + 85, 'redFlag')
        this.checkpoint2 = this.physics.add.sprite(this.point2.x, this.point2.y + 35, 'redFlag')
        this.endPoint = this.physics.add.sprite(this.pEnd.x, this.pEnd.y + 32, 'redFlag')

        //player 
        this.player = new PlayerParkour(this, this.spawn.x, this.spawn.y, 'playerIdle', 0).setScale(0.7, 0.7)

        //collision with map
        bgLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, bgLayer)


        //checks for player/checkpoint overlap -> changes flag sprite and plays sound indicator
        this.checkOneSound = false
        this.checkTwoSound = false
        this.endPointSound = false

        this.emitter = this.add.particles(0, 0, '5x5', {
            speed: 150,
            tint: [ 0xFFF800, 0xFFFFFF, 0xFFDB00 ],
            scale: 1,
            lifespan: 300
        })

        this.physics.add.overlap(this.player, this.checkpoint1, () => {
            if (this.checkOneSound == false) {
                this.sound.play('checkpointPing')
                this.checkpoint1.setTexture('greenFlag')
                this.checkOneSound = true
                
                this.emitter.setPosition(this.checkpoint1.x, this.checkpoint1.y)
                this.emitter.explode(20)
            }
        })

        this.physics.add.overlap(this.player, this.checkpoint2, () => {
            if (this.checkTwoSound == false) {
                this.sound.play('checkpointPing')
                this.checkpoint2.setTexture('greenFlag')
                this.checkTwoSound = true

                this.emitter.setPosition(this.checkpoint2.x, this.checkpoint2.y)
                this.emitter.explode(20)
            }
        })

        this.physics.add.overlap(this.player, this.endPoint, () => {
            if (this.endPointSound == false) {
                this.sound.play('checkpointPing')
                this.endPoint.setTexture('greenFlag')
                this.endPointSound = true

                this.emitter.setPosition(this.endPoint.x, this.endPoint.y)
                this.emitter.explode(20)
            }
        })

        //handle camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

        //handle world bounds
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //test key
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        //add score text
        let scoreConfig = {
            fontFamily: 'sans-serif',
            fontSize: '35px',
            align: 'left',
            color: '#000000'
        }

        this.scoreText = this.add.text(0, 0, 'SCORE:' + score, scoreConfig)
        this.scoreText.setScrollFactor(0)

        //lives
        this.lifehead = this.physics.add.sprite(858, 28, 'head')
        this.lifehead.setScrollFactor(0)
        this.livesLeft = this.add.text(885, 10, 'x ' + this.lives, scoreConfig)
        this.livesLeft.setScrollFactor(0)

    }

    update(time, delta) {
        //test key
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            //this.death = true
            console.log ('BOSS: ' + this.boss.x, this.boss.y)
            console.log ('PLAYER: ' + this.player.x, this.player.y)
            console.log ('CHECKPOINT1: ' + this.point1.x, this.point1.y)
            console.log ('CHECKPOINT2: ' + this.point2.x, this.point2.y)
            console.log ('SCORE: ' + score)
            this.sound.stopAll()
            this.scene.start('bossScene')
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

        //collision with cherries
        this.physics.world.overlap(this.player, this.cherriesGroup, this.handleCollision, null, this)

        this.physics.add.overlap(this.player, this.bigCherry, () => {
            this.bigCherry.destroy()
            this.cherry += 5000
            this.lives += 1
            this.livesLeft.setText('x ' + this.lives)
        })
        

        //prevents player from spawning behind enemy -> immediate game over
        if (this.player.x < this.boss.x) {
            this.gameOver = true
        }

        //check if player hits ground -> calls respawn & changes number of lives
        if (this.player.y > 754.5) {
            this.death = true
            this.lives -= 1
            this.livesLeft.setText('x ' + this.lives)
        }

        //checks remaining lives
        if (this.lives == 0) {
            this.gameOver = true
        }

        //check if got cherry
        if (score < this.cherry){
            if (this.cherried == true) {
                score += 20
                this.scoreText.setText('SCORE:' + score)
            }
            this.cherries = false
        }

        //call respawn
        if (this.death == true) {
            if (this.check2 == true) {
                this.player.setX(this.point2.x)
                this.player.setY(this.point2.y - 20)
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
        if (!this.gameOver && !this.pDone) {
            if (this.player.x - this.boss.x > 700) {
                this.boss.x += 2
            }
            else if (this.player.x - this.boss.x > 500) {
                this.boss.x += 1
            }
            else if (this.player.x - this.boss.x < 300) {
                this.boss.x += 0.25
            }
            else {
                this.boss.x += 0.5
            }
        }

        //plays game over screen
        if (this.gameOver == true) {
            this.sound.stopAll()
            this.scene.start('endScene')
        }


        if (this.pDone == true) {
            const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.fightScreen)
            this.physics.moveTo(this.player, this.fightScreen.x, this.fightScreen.y, 200)
            if (this.player.body.speed > 0) {
                if (distance < 4) {
                    this.player.body.reset(this.fightScreen.x, this.fightScreen.y)
                } 
            }
            this.physics.moveTo(this.boss, this.b1.x, this.b1.y, 550)
            const distance1 = Phaser.Math.Distance.BetweenPoints(this.boss, this.b1)
            if(this.boss.body.speed > 0) {
                if (distance1 < 4) {
                    this.boss.body.reset(this.b1.x, this.b1.y)
                    this.hit = this.physics.add.sprite(this.b1.x, this.b1.y, 'target').setScale(3, 3)
                }
            }
            this.sound.stopAll()
            this.scene.start('bossScene')
        }
        
    }
    checkpointPing() {
        this.sound.play('checkpointPing')
    }

    handleCollision(player, cherry) {
        cherry.destroy()
        this.cherried = true
        this.cherry += 1000
        this.sound.play('cherryPing')
    }

}