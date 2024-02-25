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
    scene: [ Load, Title, Credit, Play, Boss ]
}

let game = new Phaser.Game(config)

//game variables
let gameHeight = game.config.height
let gameWidth = game.config.width

//game keys
let keySpace, keyC
