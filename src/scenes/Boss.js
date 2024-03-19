class Boss extends Phaser.Scene {
    constructor() {
        super("bossScene")
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 1000, 800, 'sky').setOrigin(0,0)
        this.sky.fixedToCamera = true
        const map = this.add.tilemap('tilemapJSON1')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 1)
        this.cameras.main.setZoom(1)

        this.spawn = map.findObject('Points', (obj) => obj.name === 'spawn')

        this.boss = this.physics.add.sprite(-200, gameHeight/2 + 80, 'boss')
        this.boss.body.setSize(360, 670)
        this.boss.body.setOffset(30, 60)
        this.boss.body.setImmovable(true)

        this.keys = this.input.keyboard.createCursorKeys()
        this.player = new Player(this, this.spawn.x, this.spawn.y, 'playerIdle', 0)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)

        bgLayer.setCollisionByProperty({collides: true})
        this.physics.add.collider(this.player, bgLayer)
    }

    update() {
        
    }
}