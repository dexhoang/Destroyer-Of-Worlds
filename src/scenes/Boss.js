class Boss extends Phaser.Scene {
    constructor() {
        super("bossScene")
    }

    create() {
        //variables
        this.defeat = false
        this.targetHP = 0
        this.targetup = false
        this.timeSince = 0

        //background music 
        this.sound.stopAll()
        this.sound.play('bossMusic', {volume: 0.8})

        //add background/set up camera
        this.sky = this.add.tileSprite(gameWidth/2, gameHeight/2, 1500, 830, 'sky')
        this.sky.fixedToCamera = true
        this.sky.setScrollFactor(0)
        this.sky.setPosition.X = this.game.fixedToCamera
        const map = this.add.tilemap('tilemapJSON1')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 1)
        this.cameras.main.setZoom(0.85)
        this.cameras.main.setScroll(0, 250)
        this.physics.world.setBounds(0, 0, 1200, map.heightInPixels)
        this.cameras.main.setBounds(100, 0, map.widthInPixels, map.heightInPixels)
        
        //sets player/boss spawn
        this.spawn = map.findObject('Points', (obj) => obj.name === 'spawn')
        this.bossSpawn = map.findObject('Points', (obj) => obj.name === 'boss1')

        //boss configs
        this.boss = this.physics.add.sprite(this.bossSpawn.x, this.bossSpawn.y, 'boss')
        this.boss.body.setSize(360, 670)
        this.boss.body.setOffset(15, 60)
        this.boss.body.setImmovable(true)

        //add player
        this.player = new PlayerBoss(this, this.spawn.x, this.spawn.y, 'playerIdle', 0)
        this.player.setCollideWorldBounds(true)

        //create health/burger bar for player
        this.playerBar = this.createBar(this.player.x - 50, this.player.y - 100, 100, 20, 0x1A9534)
        this.playerHP = 100

        this.burgerBar = this.createBar(this.player.x - 50, this.player.y - 80, 100, 5, 0xf2ca5a)
        this.maxBurgers = 3

        //boss health bar
        this.bossBar = this.createBar(this.boss.x - 100, this.boss.y - 315, 360, 40, 0x7A1800)
        this.bossHP = 1000

        //makes collision between player and tilemap
        bgLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, bgLayer)

        //adds target, sets visual configs
        this.target = this.physics.add.sprite(gameWidth/2 - 300, gameHeight/2 - 20, 'target').setScale(7).setCircle(11.75).setOffset(5.75, 5.7)
        this.target2 = this.physics.add.sprite(gameWidth/2 - 230, gameHeight/2 + 135, 'target').setScale(4).setCircle(11.75).setOffset(6, 5.6)
        this.target3 = this.physics.add.sprite(gameWidth/2 - 220, gameHeight/2 - 165, 'target').setScale(4).setCircle(11.5).setOffset(6, 5.6)
        this.target.preFX.addGlow(0xffffff, 2, 0, false, 0.1, 1)
        this.target2.preFX.addGlow(0xffffff, 2, 0, false, 0.1, 1)
        this.target3.preFX.addGlow(0xffffff, 2, 0, false, 0.1, 1)

        this.target.visible = false
        this.target2.visible = false
        this.target3.visible = false

        //shoots fireballs at player
        function shootFireball() {
            this.fireball = this.physics.add.sprite(this.boss.x - 55, this.boss.y - 50, 'fireball').setScale(2, 2).setSize(0.5, 0.5)
            this.fireballAngle = Phaser.Math.Angle.BetweenPoints(this.fireball, this.player)
            this.convertAngle = Phaser.Math.RadToDeg(this.fireballAngle)
            this.physics.moveTo(this.fireball, this.player.x, this.player.y, 500)
            this.fireball.setRotation(this.fireballAngle)
            this.physics.add.overlap(this.fireball, this.player, (fireball, player) => {
                fireball.destroy()
                this.sound.play('fireballHit')
                this.playerHP -= 5
                this.setValue(this.playerBar, this.playerHP, 100)
            })

            if (this.fireball.x > 1000) {
                this.fireball.destroy()
            }

            this.sound.play('fireballSound', {volume: 0.3})
        }

        function shootFireball2() {
            this.fireball = this.physics.add.sprite(this.boss.x + 55, this.boss.y - 50, 'fireball').setScale(2, 2).setSize(0.5, 0.5)
            this.fireballAngle = Phaser.Math.Angle.BetweenPoints(this.fireball, this.player)
            this.convertAngle = Phaser.Math.RadToDeg(this.fireballAngle)
            this.physics.moveTo(this.fireball, this.player.x, this.player.y, 500)
            this.fireball.setRotation(this.fireballAngle)
            this.physics.add.overlap(this.fireball, this.player, (fireball, player) => {
                fireball.destroy()
                this.sound.play('fireballHit')
                this.playerHP -= 5
                this.setValue(this.playerBar, this.playerHP, 100)
            })

            if (this.fireball.x > 1000) {
                this.fireball.destroy()
            }

            this.sound.play('fireballSound', {volume: 0.3})
        }

        //sets timed fireball attacks
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: shootFireball,
            callbackScope: this,
            loop: true
        })

        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: shootFireball2,
            callbackScope: this,
            loop: true
        })


        //'animate' boss movement
        this.bossTween = this.tweens.add({
            targets: this.boss,
            y: this.boss.y - 30,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        })

        // //target tween
        // this.targetTween = this.tweens.add({
        //     targets: this.target,
        //     duration: 1000,
        //     angle: 90,
        //     scale: 5,

            
        // })

        // this.targetTween2 = this.tweens.add({
        //     targets: this.target2,
        //     duration: 500,
        //     angle: 90,
        //     scale: 3
            
        // })

        // this.targetTween3 = this.tweens.add({
        //     targets: this.target3,
        //     duration: 500,
        //     angle: 90,
        //     scale: 3
            
        // })

        //'animate' boss HP bar
        this.bossBarTween = this.tweens.add({
            targets: this.bossBar,
            y: this.bossBar.y - 15,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        })

        //create cursor keys
        this.keys = this.input.keyboard.createCursorKeys()
    }


    update(time, delta) {
        //starts win screen when boss is defeated
        if (this.bossHP == 0) {
            this.defeat = true
            this.scene.start('winScene')
        }

        if (this.playerHP == 0) {
            this.scene.start('endScene')
        }

        if (!this.defeat && !this.targetup) {
            this.rando = Math.floor(Math.random() * 3) + 1
            if (this.rando == 1) {
                this.target.visible = true
                this.targetTween = this.tweens.add({
                    targets: this.target,
                    duration: 1000,
                    angle: 90,
                    scale: 5,
                })
                this.targetTween.restart
                this.targetup = true
                this.targetHP = Math.floor(Math.random() * 4) + 1
            }
            else if (this.rando == 2) {
                this.target2.visible = true
                this.targetTween2 = this.tweens.add({
                    targets: this.target2,
                    duration: 1000,
                    angle: 90,
                    scale: 5,
                })
                this.targetTween2.restart
                this.targetup = true
                this.targetHP = Math.floor(Math.random() * 4) + 1
            }
            else if (this.rando == 3) {
                this.target3.visible = true
                this.targetTween3 = this.tweens.add({
                    targets: this.target3,
                    duration: 1000, 
                    angle: 90,
                    scale: 5,
                })
                this.targetTween3.restart
                this.targetup = true
                this.targetHP = Math.floor(Math.random() * 4) + 1
            }
        } 

        //updates player FSM
        this.playerFSM.step()

        //moves sky background
        this.sky.tilePositionX += 5

        //depletes burger bar 
        if(Phaser.Input.Keyboard.JustDown(this.keys.space) && this.maxBurgers > 0) {
            this.maxBurgers --
            this.shootBurger()
            this.setValue(this.burgerBar, this.maxBurgers, 3)
        }

        //checks if player has less than 10 burger, then reloads burgers every 1.5 seconds
        if(this.maxBurgers < 3) {
            this.timeSince += delta
            while(this.timeSince >= 1000) {
                this.maxBurgers ++
                this.setValue(this.burgerBar, this.maxBurgers, 3)
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

        //position targets
        this.target.setX(this.boss.x + 25)
        this.target.setY(this.boss.y + 100)

        this.target2.setX(this.boss.x + 70)
        this.target2.setY(this.boss.y - 70)

        this.target3.setX(this.boss.x + 150)
        this.target3.setY(this.boss.y + 300)

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
    setValue(bar, percent, total) {
        bar.scaleX = percent/total
    }

    //shoots burger, adds collider with burger and boss then calls function destroyBurger
    shootBurger() {
        if(this.player.flipX) {
            //add moving burger
            this.burger = this.physics.add.sprite(this.player.x - 50, this.player.y, 'burger')
            this.burgerEffect = this.physics.add.sprite(this.player.x - 50, this.player.y, 'burgerEffect')
            this.burgerEffect.setFlip(true)
            this.burger.setVelocityX(-500) 
            this.burgerEffect.setVelocityX(-500)

            //audio cue
            this.sound.play('firing', {volume: 0.8})

            //collide burger with boss and callback to destroy burger
            if (this.target.visible == true) {
                this.physics.add.overlap(this.burger, this.target, this.destroyBurger)
                this.physics.add.overlap(this.burgerEffect, this.target, this.destroyEffect, () => {
                    this.bossHP -= 20
                    this.targetHP -= 1
                    console.log(this.targetHP)
                    console.log(this.bossHP)
                    this.setValue(this.bossBar, this.bossHP, 1000)
                    if (this.targetHP == 0){
                        this.target.visible = false
                        this.targetup = false
                    }

                    this.sound.play('burgerHit')
                })
            }
            if (this.target2.visible == true) {
                this.physics.add.overlap(this.burger, this.target2, this.destroyBurger)
                this.physics.add.overlap(this.burgerEffect, this.target2, this.destroyEffect, () => {
                    this.bossHP -= 20
                    this.targetHP -= 1
                    console.log(this.targetHP)
                    console.log(this.bossHP)
                    this.setValue(this.bossBar, this.bossHP, 1000)
                    if (this.targetHP == 0){
                        this.target2.visible = false
                        this.targetup = false
                    }

                    this.sound.play('burgerHit')
                })
            }
            if (this.target3.visible == true) {
                this.physics.add.overlap(this.burger, this.target3, this.destroyBurger)
                this.physics.add.overlap(this.burgerEffect, this.target3, this.destroyEffect, () => {
                    this.bossHP -= 20
                    this.targetHP -= 1
                    console.log(this.targetHP)
                    console.log(this.bossHP)
                    this.setValue(this.bossBar, this.bossHP, 1000)
                    if (this.targetHP == 0){
                        this.target3.visible = false
                        this.targetup = false
                    }

                    this.sound.play('burgerHit')
                })
            }

        } else {
            this.burger = this.physics.add.sprite(this.player.x + 50, this.player.y, 'burger')
            this.burgerEffect = this.physics.add.sprite(this.player.x + 50, this.player.y, 'burgerEffect')
            this.burger.setVelocityX(500)
            this.burgerEffect.setVelocityX(500)

            this.sound.play('firing', {volume: 0.8})
        }
    }
    
    //destroys burger and plays hit animation
    destroyBurger(burger, boss) {
        burger.setVelocityX(0)
        burger.play('burgerHit', true)
        burger.once('animationcomplete', () => {
            burger.destroy()
        })
    }

    //destroys burger effect
    destroyEffect(effect, boss) {
        effect.destroy()
    }

}