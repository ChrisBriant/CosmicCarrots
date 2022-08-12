import Phaser from "phaser";
import EventEmitter from '../events/Emitter';

class Collectable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key) {
        super(scene,x,y,key);
        this.name = key;
        this.event = null;
        this.setOrigin(0.25,1);
        scene.add.existing(this);
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

    openCage() {
        console.log('Open the cage');
    }
}

export default Collectable;