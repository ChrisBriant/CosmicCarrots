import Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';
import SpriteEffect from '../effects/SpriteEffect';

class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key) {
        super(scene,x,y,key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 300;
        this.maxDistance = 150;
        this.travelDistance = 0;
        this.damage = 10;
        this.cooldown = 500;

        this.body.setSize(this.width - 13, this.height - 20);

        this.effectManger = new EffectManager(this.scene);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.travelDistance += this.body.deltaAbsX();

        if(this.isOutOfRange()) {
            this.body.reset(0,0);
            this.activateProjectile(false);
            this.travelDistance = 0;
        }
    }

    fire(x, y, anim) {
        this.activateProjectile(true);
        this.body.reset(x,y);
        this.setVelocityX(this.speed);
        anim && this.play(anim,true);
    }

    deliversHit(target) {
        this.activateProjectile(false);
        this.travelDistance = 0;
        const impactPoistion = {x:this.x, y:this.y};
        this.body.reset(0,0);
        //Effect manager will be responsible for creating an effect and displaying it.
        this.effectManger.playEffectOn('hit-effect', target, impactPoistion);
    }

    activateProjectile(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);
    }

    isOutOfRange() {
        return this.travelDistance && this.travelDistance >= this.maxDistance;
    }
}

export default Projectile;