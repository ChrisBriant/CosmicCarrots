import Phaser from "phaser";
import EventEmitter from '../events/Emitter';

class Collectable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key) {
        super(scene,x,y,key);
        this.name = key;
        this.event = null;
        this.setOrigin(0.25,1);
        scene.add.existing(this);
        this.opened = false;
        this.visible = true;
        EventEmitter.on('YELLOW_EVENT', () => {
            this.visible = true;
            this.setAlpha(1);
        });
        // this.score = 1;
        

        // scene.tweens.add({
        //     targets: this,
        //     y: this.y - 3,
        //     duration: Phaser.Math.Between(1500,2000),
        //     repeat: -1,
        //     ease: 'linear',
        //     yoyo : true,
        // });
    }

    performEvent() {
        //Only fire the event if the collectable is visible
        if(this.visible) {
            switch (this.name) {
                case 'key':
                    this.setActive(false).setVisible(false);
                    break;
                case 'cage':
                    break;
                default:
                    break;
            }
            EventEmitter.emit(this.event);
        }
    }

    openCage(scene) {
        if(!this.opened) {
            //Animate the cage moving upwards
            this.opened = true;
            const startPos = this.y;
            const endPos = startPos - 64;
            scene.tweens.add({
                targets: this,
                y : endPos,
                duration: 500,
                repeat: 0,
                ease: 'linear',
                onComplete: () => { EventEmitter.emit('UNLOCK_CARROT')},
            });
            // .setCallback('onComplete',() => {
            //     console.log('I have finished');
            // });
        }
    }

}

export default Collectable;