//NAMES: Alan Lu, Dexter Hoang
//TITLE: Destroyer of Worlds
//MAJOR COMPONENTS USED:
    // -physics systems
    // -cameras
    // -particle effects
    // -text objects
    // -animation manager
    // -tween manager
    // -tilemaps
    // -timers
    // -FSMs

//FOR GRADER - if parkour is too difficult, press key "C" in order to directly skip parkour and enter boss fight

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
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    render: {
        pixelArt: true
    },
    scene: [ Load, Title, Controls, Credit, Play, Boss, Dead , Win]
}

let game = new Phaser.Game(config)

//game variables
let gameHeight = game.config.height
let gameWidth = game.config.width

//game keys
let keySpace, keyC
