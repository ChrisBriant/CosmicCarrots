import Phaser from "phaser";
import EventEmitter from '../events/Emitter';

class Key extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key,initEvent) {
        super(scene,x,y,key);
        this.setOrigin(0,1);
        this.setTexture('key');
        this.initEvent = initEvent;
    }

}