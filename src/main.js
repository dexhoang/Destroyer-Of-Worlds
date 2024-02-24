//Names: Alan Lu, Dexter Hoang
//Title: Destroyer of Worlds

'use strict'

let config = {
    parent: 'game',
    type: Phaser.AUTO,
    width: 950,
    height: 650,
    autoCenter: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    render: {
        pixelArt: true
    },
    scene: [ Title, Credit, Load, Play, Boss ]
}

let game = new Phaser.Game(config)

