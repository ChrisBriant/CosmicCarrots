import SpriteEffect from "./SpriteEffect";

class EffectManager {
    constructor(scene) {
        this.scene = scene;
    }

    playEffectOn(effectName, target, impactPoistion) {
        const effect = new SpriteEffect(this.scene,0,0,effectName, impactPoistion);
        effect.playOn(target);
    }

}

export default EffectManager;