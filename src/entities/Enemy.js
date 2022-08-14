
import Phaser from 'phaser';

import collidable from '../mixins/collidable';
import anims from '../mixins/anims';
import initAnims from './anims/enemyAnims';


class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.config = scene.config;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    //Mixins
    Object.assign(this,collidable);
    Object.assign(this,anims);

    initAnims(scene.anims);
    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.speed = 75;
    // this.timeFromLastTurn = 0;
    // this.health = 20;
    // this.maxPatrolDistance = 100;
    // this.currentPatrolDistance = 0;
    this.rayGraphics = this.scene.add.graphics({lineStyle: {width:2, color:0xaa00aa}});

    this.damage =  20;

    // this.setImmovable(true);
    this.setOrigin(0.5,1);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setVelocityX(this.speed);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time) {

    this.play('alien-walk', true);
 
    // if(this.getBounds().bottom > 600) {
    //     this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
    //     this.setActive(false);
    //     this.rayGraphics.clear();
    //     this.destroy();
    //     return;
    // }

    // this.patrol(time);
  }

  // patrol(time) {
  //   if(!this.body || !this.body.onFloor()) { return; }
  //   this.currentPatrolDistance += Math.abs(this.body.deltaX());
    
  //   const {ray, hasHit} = this.raycast(this.body, this.platformCollidersLayer,{raylength : 30,precision : 1, steepness : 0.3 });

  //   if((!hasHit || this.currentPatrolDistance >= this.maxPatrolDistance) && this.timeFromLastTurn + 100 < time) {
  //       this.setFlipX(!this.flipX);
  //       this.setVelocityX(this.speed = -this.speed);
  //       this.timeFromLastTurn = time;
  //       this.currentPatrolDistance = 0;
  //   }

  //   if(this.config.debug && ray) {
  //       this.rayGraphics.clear();
  //       this.rayGraphics.strokeLineShape(ray);
  //   }

  // }

  setPlatformColliders(platformCollidersLayer) {
    this.platformCollidersLayer = platformCollidersLayer;
  }

  setEnemyColliders(enemyCollidersLayer) {
    this.enemyCollidersLayer = enemyCollidersLayer;
  }

  //For turning the enemy back when they collide with the end of a platform
  reverse() {
    // console.log('ENEMY IS FACING RIGHT',this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT);
    // console.log('ENEMY IS FACING LEFT',this.body.facing === Phaser.Physics.Arcade.FACING_LEFT);
    if(this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setVelocityX(this.speed * -1);
    } else {
      this.setVelocityX(this.speed);
    }
    
  }


  //Blank function to handle player damage when enemy is source
  deliversHit() {}

  // takesHit(source) {
  //   source.deliversHit(this);
  //   this.health -= source.damage;

  //   if(this.health <= 0) {
  //       this.setTint(0xff0000);
  //       this.setVelocity(0,-200);
  //       this.body.checkCollision.none = true;
  //       this.setCollideWorldBounds(false);
  //   }
  // }

}


export default Enemy;
