class PlayerParkour extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // player specifications 
        this.body.setSize(this.width/2, this.height/2)
        this.body.setGravityY(1400)
        this.body.setSize(60, 123)
        this.body.setOffset(30, 22)
        this.body.setCollideWorldBounds(false)

        //initialize state machine
        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState1(),
            move: new MoveState1(),
            jump: new JumpState1(),
        }, [scene, this])
    }
}

// idle state
class IdleState1 extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('idle')
    }
    
    execute(scene, player) {
        const { left, right, up, space } = scene.keys

        // transition to jump
        if(Phaser.Input.Keyboard.JustDown(up) && player.body.onFloor()) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to move
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }        
    }
}

class MoveState1 extends State {
    execute(scene, player) {
        const { left, right, up, space } = scene.keys

        // transition to jump
        if(Phaser.Input.Keyboard.JustDown(up) && player.body.onFloor()) {
            this.stateMachine.transition('jump')
            return
        }5

        // transition to idle
        if(!(left.isDown || right.isDown || up.isDown || space.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
        
        // movement
        if(left.isDown) {
            player.setVelocityX(-200)
            player.setFlip(true, false)
            player.anims.play('run', true)
        } else if(right.isDown) {
            player.setVelocityX(200)
            player.resetFlip()
            player.anims.play('run', true)
        }
    }
}

class JumpState1 extends State {
    enter(scene, player) {
        player.setVelocityY(-600)
        player.anims.play('jump')
    }

    execute(scene, player) {
        const { left, right, up, space } = scene.keys

        // gives ability for player to move mid-jump
        if(left.isDown) {
            player.setVelocityX(-200)
            player.setFlip(true, false)
        } else if(right.isDown) {
            player.setVelocityX(200)
            player.resetFlip()
        }
        if(player.body.onFloor()) {
            this.stateMachine.transition('move')
        }
    }
}
