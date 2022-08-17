
import Phaser from 'phaser';

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    //Levels
    this.load.tilemapTiledJSON('level_1', 'assets/carrot_game_map.tmj');
    this.load.tilemapTiledJSON('level_2', 'assets/carrot_game_map_l2.tmj');
    this.load.tilemapTiledJSON('level_3', 'assets/carrot_game_map_l3.tmj');
    this.load.tilemapTiledJSON('level_4', 'assets/carrot_game_map_l4.tmj');
    this.load.tilemapTiledJSON('level_5', 'assets/carrot_game_map_l5.tmj');
    //Collectables
    this.load.image('tiles', 'assets/carrot_game_tileset.png');
    // this.load.image('tiles-2', 'assets/main_lev_build_2.png');

    // this.load.image('iceball-1', 'assets/weapons/iceball_001.png');
    // this.load.image('iceball-2', 'assets/weapons/iceball_002.png');

    // this.load.image('fireball-1', 'assets/weapons/improved_fireball_001.png');
    // this.load.image('fireball-2', 'assets/weapons/improved_fireball_002.png');
    // this.load.image('fireball-3', 'assets/weapons/improved_fireball_003.png');

    //COLLECTABLE IMAGES - CARROTS
    this.load.image('carrot-orange', 'assets/collectables/orange.png');
    this.load.image('carrot-pink', 'assets/collectables/pink.png');
    this.load.image('carrot-green', 'assets/collectables/green.png');
    this.load.image('carrot-purple', 'assets/collectables/purple.png');
    this.load.image('carrot-red', 'assets/collectables/red.png');
    this.load.image('carrot-yellow', 'assets/collectables/yellow.png');
    this.load.image('carrot-blue', 'assets/collectables/blue.png');
    this.load.image('key', 'assets/collectables/key.png');
    this.load.image('cage', 'assets/collectables/cage.png');

    //Background
    //this.load.image('bg1', 'assets/cosmic_bg1.jpeg');
    //this.load.image('bg1', 'assets/cosmic_bg2.jpeg');
    this.load.image('bg1', 'assets/cosmic_bg3.jpeg');
    //Door
    this.load.image('door', 'assets/door.png');
    // this.load.image('bg-spikes-dark', 'assets/bg_spikes_dark.png');
    // this.load.image('sky-play', 'assets/sky_play.png');
    // this.load.image('bg-spikes-tileset', 'assets/bg_spikes_tileset.png');
    // this.load.image('menu-bg', 'assets/background01.png');
    // this.load.image('back', 'assets/back.png');

 
    //Sprites
    this.load.spritesheet('player', 'assets/mickyrabbit_sheet.png', {
      frameWidth: 32, frameHeight: 32
    });
    this.load.spritesheet('alien', 'assets/alien_sheet.png', {
      frameWidth: 32, frameHeight: 32
    });



    this.load.once('complete',() => {
      this.startGame();
    });
  }

  startGame() {
    //this.scene.start('LevelIntro',{level:3});
    this.scene.start('PlayScene',{level:5});
  }

}

export default Preload;
