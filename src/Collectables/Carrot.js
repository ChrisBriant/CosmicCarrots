import Phaser from "phaser";
import EventEmitter from '../events/Emitter';

class Carrot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key,initEvent) {
        super(scene,x,y,key);
        console.log('KEY', key);
        this.setOrigin(0,1);
        this.setTexture(`carrot-${key}`);
        this.initEvent = initEvent;
        this.color = key;
    }

    performEvent() {
        if(this.initEvent) {
            switch (this.color) {
                case 'red':
                    console.log('RED EVENT');
                    break;
                case 'orange':
                    console.log('ORANGE EVENT');
                    break;  
                case 'yellow':
                    console.log('YELLOW EVENT');
                    break;
                case 'green':
                    console.log('GREEN EVENT');
                    break;     
                case 'blue':
                    console.log('BLUE EVENT');
                    break;
                case 'pink':
                    console.log('PINK EVENT');
                    break;
                case 'purple':
                    console.log('PURPLE EVENT');
                    EventEmitter.emit('PURPLE_EVENT');
                    break;                              
                default:
                    break;
            }
            console.log('This carrot performs an event!');
        }  else  {
            console.log('This carrot does nothing.');
        }
    }
}



export default Carrot;