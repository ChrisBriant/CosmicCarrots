
import Phaser from 'phaser';

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('level_1', 'assets/carrot_game_map.tmj');
    this.load.image('tiles', 'assets/carrot_game_tileset.png');
    // this.load.image('tiles-2', 'assets/main_lev_build_2.png');

    // this.load.image('iceball-1', 'assets/weapons/iceball_001.png');
    // this.load.image('iceball-2', 'assets/weapons/iceball_002.png');

    // this.load.image('fireball-1', 'assets/weapons/improved_fireball_001.png');
    // this.load.image('fireball-2', 'assets/weapons/improved_fireball_002.png');
    // this.load.image('fireball-3', 'assets/weapons/improved_fireball_003.png');

    // this.load.image('diamond', 'assets/collectables/diamond.png');
    // this.load.image('diamond-1', 'assets/collectables/diamond_big_01.png');
    // this.load.image('diamond-2', 'assets/collectables/diamond_big_02.png');
    // this.load.image('diamond-3', 'assets/collectables/diamond_big_03.png');
    // this.load.image('diamond-4', 'assets/collectables/diamond_big_04.png');
    // this.load.image('diamond-5', 'assets/collectables/diamond_big_05.png');
    // this.load.image('diamond-6', 'assets/collectables/diamond_big_06.png');

    // this.load.image('bg-spikes-dark', 'assets/bg_spikes_dark.png');
    // this.load.image('sky-play', 'assets/sky_play.png');
    // this.load.image('bg-spikes-tileset', 'assets/bg_spikes_tileset.png');
    // this.load.image('menu-bg', 'assets/background01.png');
    // this.load.image('back', 'assets/back.png');

 

    this.load.spritesheet('player', 'assets/mickyrabbit_sheet.png', {
      frameWidth: 32, frameHeight: 32
    });



    this.load.once('complete',() => {
      this.startGame();
    });
  }

  startGame() {
    this.scene.start('PlayScene');
  }

}

export default Preload;
