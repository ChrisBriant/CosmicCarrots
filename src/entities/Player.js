
import Phaser from 'phaser';
import initAnimations from './anims/playerAnims';
// import HealthBar  from '../hud/healthBar';
import collidable from '../mixins/collidable';
// import Projectiles from '../attacks/Projectiles';
import anims from '../mixins/anims';
// import MeleeWeapon from '../attacks/MeleeWeapon';
import { getTimeStamp } from '../utils/functions';
import EventEmitter from '../events/Emitter';


class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    //Mixins
    Object.assign(this,collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
  }

  init() {
    this.gravity = 500;
    this.playerSpeed = 150;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.climbing = false;
    this.justClimbed = false;
    // this.hasBeenHit = false;
    // this.bounceVelocity = 150;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    // this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    // this.projectiles = new Projectiles(this.scene,'iceball-1');
    // this.meleeWeapon = new MeleeWeapon(this.scene,0,0,'sword-default');
    // this.timeFromLastSwing = null;
    // this.isSliding = false;




    this.setOrigin(0.5,1);
    //this.setSize(20,36);
    this.health = 100;

    // this.hp = new HealthBar(
    //   this.scene,
    //   this.scene.config.leftTopCorner.x + 5,
    //   this.scene.config.leftTopCorner.y + 5,
    //   2,
    //   this.health
    // )

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims);
    this.setScale(1.5);

    // this.handleAttacks();
    // this.handleMovements();

  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if(this.hasBeenHit || !this.body) {return;}

  //   if(this.getBounds().top > this.scene.config.height) {
  //     EventEmitter.emit('PLAYER_LOOSE');
  //   }
    const { left, right, space, up, down } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }
    
    this.handleClimbing(up,down);

  //   //Jumping
    if(isSpaceJustDown || isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps ) && !this.climbing && !this.justClimbed) {
      this.setVelocityY(-this.playerSpeed*3);
      this.jumpCount++
    }

  //   if(onFloor) {
  //     this.jumpCount = 0;
  //   }

  //   if(this.isPlayingAnims('throw') || this.isPlayingAnims('slide')) {
  //     return;
  //   }
  //   // dont play it again if it's already playing
  //   // second value -> ignoreIfPlaying

    //Play the climbing animation and exit before playing others
    if(this.climbing && !up.isDown && !down.isDown) {
      //On ladder, but not moving
      this.play('climb-idle', true);
      return;
    }
    if(this.climbing && (up.isDown || down.isDown)) {
      //On ladder and moving
      this.play('climb', true);
      return;
    }

    onFloor
    ? this.body.velocity.x !== 0 ? this.play('walk', true) : this.play('idle', true)
    : this.play('jump', true);
  // }

  // handleAttacks() {
  //   this.scene.input.keyboard.on('keydown-Q', () => {
  //     this.projectileSound.play();
  //     this.play('throw', true);
  //     this.projectiles.fireProjectile(this, 'iceball');
  //   });

  //   this.scene.input.keyboard.on('keydown-E', () => {
  //     if(this.timeFromLastSwing &&
  //         this.timeFromLastSwing + this.meleeWeapon.attackSpeed > getTimeStamp()) {return;}
      
  //     this.swipeSound.play();
  //     this.play('throw', true);
  //     this.meleeWeapon.swing(this);
  //     this.timeFromLastSwing = getTimeStamp();
  //   });
  // }

  // handleMovements() {
  //   this.scene.input.keyboard.on('keydown-DOWN', () => {
  //     if(!this.body.onFloor()) {return;}
  //     this.body.setSize(this.width,this.height / 2);
  //     this.setOffset(0, this.height / 2);
  //     this.setVelocityX(0);
  //     this.play('slide', true);
  //     this.isSliding = true;
  //   });

  //   this.scene.input.keyboard.on('keyup-DOWN', () => {
  //     this.body.setSize(this.width, 38);
  //     this.setOffset(0,0);
  //     this.isSliding = false;
  //   });
  // }

  // playDamageTween() {
  //   return this.scene.tweens.add({
  //     targets: this,
  //     duration: 100,
  //     repeat: -1,
  //     tint : 0xffffff
  //   })
  // }

  // bounceOff(source) {
  //   if(source.body) {
  //     this.body.touching.right 
  //     ? this.setVelocityX(-this.bounceVelocity)
  //     : this.setVelocityX(this.bounceVelocity);
  //   } else {
  //     this.body.blocked.right 
  //     ? this.setVelocityX(-this.bounceVelocity)
  //     : this.setVelocityX(this.bounceVelocity);
  //   }



  //   setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0);
  }

  takesHit(source) {
    if(this.hasBeenHit) {return;}

    this.health -= source.damage || source.properties.damage || 0;
    if(this.health <= 0) {
      EventEmitter.emit('PLAYER_LOOSE');
      return;
    }

    this.hasBeenHit = true;
    this.bounceOff(source);
    const hitAnim = this.playDamageTween();
    this.hp.decrease(this.health);

    source.deliversHit && source.deliversHit(this);

    this.scene.time.delayedCall(1000, () => {
      this.hasBeenHit =false;
      hitAnim.stop();
      this.clearTint();
    });
  }

  //Stops the player from jumping at the top of the ladder
  setJustClimbedCoolDown() {
    this.justClimbed = true;
    setTimeout(()=>{
      this.justClimbed = false;
    }, 200);
  }

  handleClimbing(up,down) {
      //Player up down movement
      if(this.climbing && up.isDown) {
        this.body.setGravityY(0);
        this.setVelocityY(this.playerSpeed*-1);
      }
      if(this.climbing && down.isDown) {
        this.body.setGravityY(this.gravity);
        this.setVelocityY(this.playerSpeed);
      }
      //Enables player to stick to ladder
      if(this.climbing && !up.isDown && !down.isDown) {
        this.body.setGravityY(0);
        this.setVelocityY(0);
      }
  
      if(!this.climbing) {
        this.body.setGravityY(this.gravity);
      }
      //Enables player to pop off the lader
      if(this.justClimbed) {
        this.setVelocityY(-50);
      }
  }


  // climb() {
  //   this.climbing = true;


  // }


}


export default Player;