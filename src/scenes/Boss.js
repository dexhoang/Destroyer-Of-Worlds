class Boss extends Phaser.Scene {
    constructor() {
        super("bossScene")
    }

    create() {
        //this.sky = this.add.tileSprite(0, 0, 1000, 800, 'sky').setOrigin(0,0)
        this.sky = this.add.tileSprite(gameWidth/2, gameHeight/2, 1500, 830, 'sky')
        this.sky.fixedToCamera = true
        const map = this.add.tilemap('tilemapJSON1')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 1)
        this.cameras.main.setZoom(0.85)
        

        this.spawn = map.findObject('Points', (obj) => obj.name === 'spawn')
        this.bossSpawn = map.findObject('Points', (obj) => obj.name === 'boss1')

        this.boss = this.physics.add.sprite(this.bossSpawn.x, this.bossSpawn.y, 'boss')
        this.boss.body.setSize(360, 670)
        this.boss.body.setOffset(15, 60)
        this.boss.body.setImmovable(true)

        this.keys = this.input.keyboard.createCursorKeys()
        this.player = new PlayerBoss(this, this.spawn.x, this.spawn.y, 'playerIdle', 0)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.boss)

        //create health/burger b1ar for player
        this.playerBar = this.createBar(this.player.x - 50, this.player.y - 100, 100, 20, 0x1A9534)
        this.playerHP = 100

        this.burgerBar = this.createBar(this.player.x - 50, this.player.y - 80, 100, 5, 0xf2ca5a)
        this.maxBurgers = 10

        //boss health bar
        this.bossBar = this.createBar(this.boss.x - 100, this.boss.y - 315, 360, 40, 0x7A1800)
        this.bossHP = 1000

        //sets time for burger reload
        this.timeSince = 0

        this.cameras.main.setBounds(100, -125, map.widthInPixels, map.heightInPixels)
        //this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

        bgLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, bgLayer)

        this.physics.world.bounds.width = 1205

        this.target = this.physics.add.sprite(gameWidth/2 - 300, gameHeight/2 - 20, 'target').setScale(4, 4)
        this.target2 = this.physics.add.sprite(gameWidth/2 - 230, gameHeight/2 + 135, 'target').setScale(4, 4)
        this.target2 = this.physics.add.sprite(gameWidth/2 - 220, gameHeight/2 - 165, 'target').setScale(4, 4)
        // this.target.setVisible(false)



        //'animate' boss movement
        this.bossTween = this.tweens.add({
            targets: this.boss,
            y: this.boss.y - 30,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        })

        this.bossBarTween = this.tweens.add({
            targets: this.bossBar,
            y: this.bossBar.y - 15,
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        })
    }

    toggleVisible () {

    }

    update(time, delta) {
        this.playerFSM.step()

        this.sky.tilePositionX += 5

        if(Phaser.Input.Keyboard.JustDown(this.keys.space) && this.maxBurgers > 0) {
            this.maxBurgers --
            this.shootBurger()
            this.setValue(this.burgerBar, this.maxBurgers, 10)
        }

        //checks if player has less than 10 burger, then reloads burgers every 1.5 seconds
        if(this.maxBurgers < 10) {
            this.timeSince += delta
            while(this.timeSince >= 1000) {
                this.maxBurgers ++
                this.setValue(this.burgerBar, this.maxBurgers, 10)
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
            this.sound.play('firing', {volume: 0.3})

            //collide burger with boss and callback to destroy burger
            this.physics.add.collider(this.burger, this.boss, this.destroyBurger)
            this.physics.add.collider(this.burgerEffect, this.boss, this.destroyEffect, () => {
                this.bossHP -= 20
                console.log(this.bossHP)
                this.setValue(this.bossBar, this.bossHP, 1000)
            })
        } else {
            this.burger = this.physics.add.sprite(this.player.x + 50, this.player.y, 'burger')
            this.burgerEffect = this.physics.add.sprite(this.player.x + 50, this.player.y, 'burgerEffect')
            this.burger.setVelocityX(500)
            this.burgerEffect.setVelocityX(500)

            this.sound.play('firing', {volume: 0.3})
            this.physics.add.collider(this.burger, this.boss, this.destroyBurger)
            this.physics.add.collider(this.burgerEffect, this.boss, this.destroyEffect, () => {
                this.bossHP -= 20
                console.log(this.bossHP)
                this.setValue(this.bossBar, this.bossHP, 1000)
            })
        }
    }
    
    //destroys burger and plays hit animation
    destroyBurger(burger, boss) {
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