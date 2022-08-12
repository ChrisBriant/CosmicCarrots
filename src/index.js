

import Phaser from 'phaser';

import PlayScene from './scenes/Play';
import LevelIntro from './scenes/LevelIntro';
import PreloadScene from './scenes/Preload';
//LOADING FONTS
//https://phaser.discourse.group/t/how-to-create-a-bitmap-from-an-imported-font/1886/2
// import fonts from "../assets/fonts/stylesheet.css";

// let webFontLoading = {
//   active: function() {
//         runGame()
//   },
//   custom: {
//     families: ['Dosis-Medium'],
//     urls: ["stylesheet.css"]
//   }
// };



const MAP_WIDTH = 1280;
//const MAP_HEIGHT = 2560;

const WIDTH = 1280;//document.body.offsetWidth;
//const WIDTH = 640;//document.body.offsetWidth;
const HEIGHT = 600;
const ZOOM_FACTOR = 1;

const SHARED_CONFIG = {
  mapOffset : MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  debug : true,
  rightTopCorner: {
    x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) /2,
  },
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) /2,
  },
  rightBottomCorner: {
    x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
    y: ((HEIGHT / ZOOM_FACTOR) + ((HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2)),
  },
  lastLevel: 2,
}

const Scenes = [PreloadScene,PlayScene,LevelIntro];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)


//const runGame = () => {
  const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: SHARED_CONFIG.debug,
      }
    },
    scene: initScenes()
  }
  
  new Phaser.Game(config);
//}

//WebFont.load(webFontLoading);