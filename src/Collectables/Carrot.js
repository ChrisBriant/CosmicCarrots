import Phaser from "phaser";

class Carrot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key) {
        super(scene,x,y,key);
        console.log('KEY', key);
        this.setOrigin(0,1);
        this.setTexture(`carrot-${key}`);
        this.color = key;
    }
}

export default Carrot;