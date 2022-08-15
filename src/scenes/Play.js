
import Phaser from 'phaser';
import Player from '../entities/Player';
import Hud from '../hud';
import Carrots from '../groups/Carrots';
import Collectables from '../groups/Collectables';
import LaddersOverlap from '../entities/Ladders';
import Enemy from '../entities/Enemy';
import Enemies from '../groups/Enemies';
import {levels} from '../data/leveldata';
import EventEmitter from '../events/Emitter';
import {doPurpleEvent, doCollectKey, doOpenCage} from '../events/events.js'


class Play extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({level}) {
    this.level = level;
    this.carrotSequence = [...levels[`level${this.level}`].collectSequence];
    console.log('LEVELS', levels);
    this.endOfLevel = null;
    this.score = 0;
    this.hud = new Hud(this,0,0,this.carrotSequence);

    this.cursors = this.input.keyboard.createCursorKeys();

    const map = this.createMap();
    //initAnims(this.anims);

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start, map.heightInPixels);
    //const enemies= this.createEnemies(layers.enemySpawns, layers.platformsColliders);
    //const collectables = this.createCollectables(layers.collectables);
    const carrots = this.createCarrots(layers.carrots);
    const collectables = this.createCollectables(layers.collectables);
    //TAKE OUT THE LADDERS OVERLAP SPRITE DETECTION - SOLUTION DOESN'T WORK
    //const laddersOverlap = this.createLadderOverlaps(layers.laddersOverlap);
    const myLaddersOverlap = new LaddersOverlap(this,player,layers.ladders,map);

    this.createBG(map);
    
    let enemies = null;

    console.log('Enemy Colliders');
    if(layers.enemySpawns) {
      console.log('I will create enemy colliders');
      enemies= this.createEnemies(layers.enemySpawns, layers.platformsColliders);
      this.createEnemyColliders(enemies, {
          colliders: {
            platformsColliders : layers.platformsColliders,
            enemyColliders : layers.enemyColliders,
            player
          }
      });
    }


    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders : layers.platformsColliders,
        ladders : layers.ladders,
        carrots,
        collectables,
        enemyColliders : layers.enemyColliders,
        //traps : layers.traps,
      }
    });

    this.createEndOfLevel(playerZones.end, player);

    this.setupFollowUpCameraOn(player,layers.platforms.height);

    //if(gameStatus === 'PLAYER_LOOSE') { return; }

    this.createGameEvents(player,playerZones.start,collectables,enemies);

    //this.createLevelPause();

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
    if(collectableLayer) {
      const collectables = new Collectables(this).setDepth(-1);
      console.log('HERE IS THE COLLECTABLE LAYER', collectableLayer, collectables);
      collectables.addFromLayer(collectableLayer);
      return collectables;
    }
    //collectables.playAnimation('diamond-shine');
    return null;
    
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
    const carrots = map.getObjectLayer('carrots');
    const collectables = map.getObjectLayer('collectables');
    console.log('Here are the collectables', collectables);
    // const environment = map.createStaticLayer('environment', tileset).setDepth(-2);
    const platforms = map.createStaticLayer('platforms', tileset);
    const playerZones = map.getObjectLayer('player_zones');
    const enemyColliders = map.createStaticLayer('enemy_colliders');
    const enemySpawns = map.getObjectLayer('enemies')
    // const enemySpawns = map.getObjectLayer('enemy_spawns');
    // const collectables = map.getObjectLayer('collectables');
    // const traps = map.createStaticLayer('traps',tileset);

    platformsColliders.setCollisionByProperty({collides: true});
    if(enemyColliders) {
      //Set the collider if there is an enemies layer
      enemyColliders.setCollisionByProperty({collides: true});
    }
    ladders.setCollisionByProperty({climbable: true});


    return { platforms,playerZones,platformsColliders,ladders, carrots, collectables, enemyColliders, enemySpawns };
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

  createGameEvents(player,start,collectables,enemies) {
    //EventEmitter.on('PLAYER_LOOSE', () => { this.scene.restart({gameStatus:'PLAYER_LOOSE'});});
    EventEmitter.on('PURPLE_EVENT', () => { doPurpleEvent(this.endOfLevel) });
    EventEmitter.on('GREEN_EVENT', () => { this.enableEnemies(player,enemies) });
    EventEmitter.on('COLLECT_KEY', () => { doCollectKey(this.hud, player)});
    EventEmitter.on('OPEN_CAGE', () => { doOpenCage(player,collectables,this)});
    EventEmitter.on('RESTART_LEVEL', () => this.scene.restart({level:this.level}));
    //player.body.y = playerZones.start.y-player.body.height -10;
    EventEmitter.on('UNPAUSE',() => { this.scene.resume(); });
  }
 
  createPlayer(start,mapHeight) {
    return new Player(this, start.x, start.y, mapHeight);
  }

  createPlayerColliders(player,{colliders}) {
    // const ladder = this.physics.add.sprite(colliders.laddersOverlap.objects[1].x, colliders.laddersOverlap.objects[1].y, 'ladder');
    // ladder.setSize(5, this.config.height);
    //ladder.addOverlap(colliders.laddersOverlap, () => console.log('overlap'), this);
    //this.physics.add.overlap(player, colliders.laddersOverlap.objects[1],this.onClimb);

    player.addCollider(colliders.platformsColliders,null,null,'platforms')
    player.addOverlap(colliders.carrots, this.onCollectCarrot, this)
    .addOverlap(colliders.collectables, this.onCollect, this);

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

  createEnemies(spawnLayer, platformsColliders, enemyColliders) {
    const enemies = new Enemies(this);

    spawnLayer.objects.forEach((spawnPoint,i) => {
      const enemy = new Enemy(this,spawnPoint.x, spawnPoint.y);
      enemy.setPlatformColliders(platformsColliders);
      enemy.setEnemyColliders(enemyColliders);
      enemies.add(enemy);
    });
    
    return enemies;
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);
  }

  onEnemyCollision(enemy) {
    enemy.reverse();
  }

  onHit(entity,source) {
    entity.takesHit(source);
  }

  onClimb(player) {
    player.climb();
  }

  onCollect(entity,collectable) {
    //Disable game object - this will deactivate the object (first param) and hide the object (second param)
    collectable.performEvent();
  }

  onCollectCarrot(entity,collectable) {
    //Disable game object - this will deactivate the object (first param) and hide the object (second param)
    if(collectable.color === this.carrotSequence[0] && !collectable.locked) {
      //Remove the carrot
      this.carrotSequence.shift();
      this.hud.updateScoreBoard(collectable.color);
      collectable.performEvent();
      collectable.setActive(false).setVisible(false);
    }

  }

  createEnemyColliders(enemies,{colliders}) {
      enemies.addCollider(colliders.platformsColliders)
      .addCollider(colliders.enemyColliders, this.onEnemyCollision);
      //.addCollider(colliders.player, this.onPlayerCollision);
  }

  enableEnemies(player,enemies) {
    enemies.addCollider(player, this.onPlayerCollision, null,'enemies');
    enemies.setVisible();
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

      this.scene.start('LevelIntro', {level:2});
      this.scene.stop();
      //this.scene.restart({level:2});
    });
  }

  update() {
    // const {down} = this.cursors;
    // if(down.isDown) {
    //   console.log('Un pause');
    //   EventEmitter.emit('UNPAUSE');
    // }
    // this.spikesImage.tilePositionX = this.cameras.main.scrollX * 0.3
    // this.skyImage.tilePositionX = this.cameras.main.scrollX * 0.1;
  }

  //TODO: PAUSE THE LEVEL WHEN IT STARTS DISPLAY INSTRUCTION TEXT AND UNPASUE WHEN KEY IS PRESSED
  createLevelPause() {
    //this.physics.pause();
    this.scene.pause();
  }

}

export default Play;
