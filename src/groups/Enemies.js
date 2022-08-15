import Phaser from "phaser";
import collidable from "../mixins/collidable";

class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, collidable);
    }

    // addCollider(otherGameObject, callback, context) {
    //     this.scene.physics.add.collider(this, otherGameObject, callback,null,context || this);
    //     return this;
    // }
    //Make the enemies visible
    setVisible() {
        console.log('Enabling Enemies',this);
        this.getChildren().forEach((enemy) => { enemy.visible = true; })
    }

    // getProjectiles() {
    //     const projectiles = new Phaser.GameObjects.Group();
    //     this.getChildren().forEach(enemy => {
    //         enemy.projectiles && projectiles.addMultiple(enemy.projectiles.getChildren());
    //     });

    //     return projectiles;
    // }

}

export default Enemies;