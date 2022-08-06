
import Phaser from 'phaser';
import Player from '../entities/Player';
import Hud from '../hud';
import Carrots from '../groups/Carrots';
import LaddersOverlap from '../entities/Ladders';
import {levels} from '../data/leveldata';
import EventEmitter from '../events/Emitter';
import {doPurpleEvent} from '../events/events.js'


class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({level}) {
    //this.add.rectangle(0, 0,200,200, 0xFFFFFF,1);
    this.endOfLevel = null;
    this.level = level;
    this.score = 0;
    this.hud = new Hud(this,0,0,levels[`level${this.level}`].collectSequence);

    console.log(`level${this.level}`);

    const map = this.createMap();
    //initAnims(this.anims);

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);
    //const enemies= this.createEnemies(layers.enemySpawns, layers.platformsColliders);
    //const collectables = this.createCollectables(layers.collectables);
    const carrots = this.createCarrots(layers.carrots);
    //TAKE OUT THE LADDERS OVERLAP SPRITE DETECTION - SOLUTION DOESN'T WORK
    //const laddersOverlap = this.createLadderOverlaps(layers.laddersOverlap);
    const myLaddersOverlap = new LaddersOverlap(this,player,layers.ladders,map);

    this.createBG(map);
    
    // this.createEnemyColliders(enemies, {
    //   colliders: {
    //     platformsColliders : layers.platformsColliders,
    //     player
    //   }
    // });

    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders : layers.platformsColliders,
        ladders : layers.ladders,
        carrots,
        //projectiles: enemies.getProjectiles(),
        //collectables,
        //traps : layers.traps,
      }
    });

    this.createEndOfLevel(playerZones.end, player);

    this.setupFollowUpCameraOn(player,layers.platforms.height);

    //if(gameStatus === 'PLAYER_LOOSE') { return; }

    this.createGameEvents();

  }

  //NO LONGER NECESSARY AS SOLUTION DIDN'T WORK
  // createLadderOverlaps(ladderLayer) {
  //   const ladders = new Ladders(this);
  //   ladders.addFromLayer(ladderLayer);
  //   return ladders;
  // }

  createCarrots(carrotLayer) {
    const carrots = new Carrots(this);
    carrots.addFromLayer(carrotLayer);
    return carrots;
  }

  createCollectables(collectableLayer) {
    const collectables = new Collectables(this).setDepth(-1);

    collectables.addFromLayer(collectableLayer);
    collectables.playAnimation('diamond-shine');

    return collectables;
  }

  playBgMusic() {
    if(this.sound.get('theme')) {return;}
    //this.sound.add('theme',{loop:true, volume:0.5}).play();
  }

  createMap() {
    //const map = this.make.tilemap({key: `level_${this.getCurrentLevel()}`});
    const map = this.make.tilemap({key: `level_${this.level}`});
    map.addTilesetImage('carrot_game_tileset', 'tiles');
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset('carrot_game_tileset');
    //const tilesetBg = map.getTileset('bg_spikes_tileset');

    // map.createStaticLayer('distance', tilesetBg).setDepth(-11);
    
    const platformsColliders = map.createStaticLayer('platform_colliders', tileset).setAlpha(0);
    const ladders = map.createStaticLayer('ladders', tileset);
    console.log('Here are the ladders', ladders);
    const carrots = map.getObjectLayer('carrots');

    // const environment = map.createStaticLayer('environment', tileset).setDepth(-2);
    const platforms = map.createStaticLayer('platforms', tileset);
    console.log('PLATFORMS', platforms);
    const playerZones = map.getObjectLayer('player_zones');
    // const enemySpawns = map.getObjectLayer('enemy_spawns');
    // const collectables = map.getObjectLayer('collectables');
    // const traps = map.createStaticLayer('traps',tileset);

    platformsColliders.setCollisionByProperty({collides: true});
    ladders.setCollisionByProperty({climbable: true});


    return { platforms,playerZones,platformsColliders,ladders, carrots };
  }

  createBG(map) {
    //const bgImg = this.add.image(0,0,'bg1').setOrigin(0).setDepth(-100);
    console.log('MAP', map);

    for(let x=0; x<map.widthInPixels;x+=320) {
      for(let y=0; y<map.heightInPixels;y+=640) {
        //WILL ENABLE LATER DUE TO PERFORMANCE
        //this.add.image(x,y,'bg1').setOrigin(0).setDepth(-100);
      }
    }
    //const bgObject = map.getObjectLayer('distance_bg').objects[0];

    // this.spikesImage = this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height,'bg-spikes-dark')
    // .setOrigin(0,1)
    // .setDepth(-10)
    // .setScrollFactor(0,1);

    // this.skyImage = this.add.tileSprite(0,0, this.config.width, 180 * 2,'sky-play')
    // .setOrigin(0,0)
    // .setDepth(-12)
    // .setScale(1.1)
    // .setScrollFactor(0,1);
  }

  createBackButton() {
    const btn = this.add.image(this.config.rightBottomCorner.x, this.config.rightBottomCorner.y,'back')
    .setScrollFactor(0)
    .setScale(2)
    .setInteractive()
    .setOrigin(1,1);

    btn.on('pointerup', () => {
      this.scene.start('MenuScene');
    });
  }

  createGameEvents() {
    //EventEmitter.on('PLAYER_LOOSE', () => { this.scene.restart({gameStatus:'PLAYER_LOOSE'});});
    EventEmitter.on('PURPLE_EVENT', () => { doPurpleEvent(this.endOfLevel) })
  }
 
  createPlayer(start) {
    return new Player(this, start.x, start.y);
  }

  createPlayerColliders(player,{colliders}) {
    // const ladder = this.physics.add.sprite(colliders.laddersOverlap.objects[1].x, colliders.laddersOverlap.objects[1].y, 'ladder');
    // ladder.setSize(5, this.config.height);
    //ladder.addOverlap(colliders.laddersOverlap, () => console.log('overlap'), this);
    //this.physics.add.overlap(player, colliders.laddersOverlap.objects[1],this.onClimb);

    player.addCollider(colliders.platformsColliders)
    .addOverlap(colliders.carrots, this.onCollectCarrot, this);

  }

  setupFollowUpCameraOn(player,mapHeight) {
    const {width, mapOffset, zoomFactor} = this.config;
    this.physics.world.setBounds(0,0, width + mapOffset, mapHeight + 200);
    this.cameras.main.setBounds(0,0, width + mapOffset, mapHeight).setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return { 
      start: playerZones.find(zone => zone.name === 'startZone'), 
      end: playerZones.find(zone => zone.name === 'endZone'), 
    };
  }

  createEnemies(spawnLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach((spawnPoint,i) => {
      const type = spawnPoint.properties.filter(prop => prop.name === 'type')[0].value;
      const enemy = new enemyTypes[type](this,spawnPoint.x, spawnPoint.y);
      enemy.setPlatformColliders(platformsColliders)
      enemies.add(enemy);
    });
    
    return enemies;
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);
  }

  onHit(entity,source) {
    entity.takesHit(source);
  }

  onClimb(player) {
    player.climb();
  }

  // onCollect(entity,collectable) {
  //   //Disable game object - this will deactivate the object (first param) and hide the object (second param)
  //   this.score += collectable.score;
  //   this.hud.updateScoreBoard(this.score);
  //   this.collectSound.play();
  //   collectable.disableBody(true, true);
  // }

  onCollectCarrot(entity,collectable) {
    //Disable game object - this will deactivate the object (first param) and hide the object (second param)
    if(collectable.color === levels[`level${this.level}`].collectSequence[0]) {
      //Remove the carrot
      levels[`level${this.level}`].collectSequence.shift();
      this.hud.updateScoreBoard(collectable.color);
      collectable.performEvent();
      collectable.setActive(false).setVisible(false);
    }

  }

  createEnemyColliders(enemies,{colliders}) {
      enemies.addCollider(colliders.platformsColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onHit)
      .addOverlap(colliders.player.meleeWeapon, this.onHit);
  }

  getCurrentLevel() {
    return this.registry.get('level') || 1;
  }

  createEndOfLevel(end, player) {
    this.endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
    .setTexture('door')
    .setSize(96, 128)
    .setAlpha(0)
    .setOrigin(0.5,1);

    const eolOverlap = this.physics.add.overlap(player, this.endOfLevel, () => {
      eolOverlap.active = false;

      // if(this.registry.get('level') === this.config.lastLevel) {
      //   this.scene.start('CreditsScene');
      //   return;
      // }

      this.scene.restart({level:2});
    });
  }

  update() {
    // this.spikesImage.tilePositionX = this.cameras.main.scrollX * 0.3
    // this.skyImage.tilePositionX = this.cameras.main.scrollX * 0.1;
  }



}

export default Play;
