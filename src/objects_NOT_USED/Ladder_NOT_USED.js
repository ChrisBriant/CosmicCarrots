import Phaser from "phaser";

class Ladder extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,w,h,key) {
        const posX = x+w / 2;
        const posY = y+h / 2;
        super(scene,posX,posY,key);

        scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        //console.log(this);
        //this.setSize(w,h);
    }
}

export default Ladder;