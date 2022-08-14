import Phaser from "phaser";
import EventEmitter from '../events/Emitter';

class Carrot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,key,initEvent,locked) {
        super(scene,x,y,key);
        this.setOrigin(0,1);
        this.setTexture(`carrot-${key}`);
        this.initEvent = initEvent;
        this.color = key;
        this.locked = locked;
        EventEmitter.on('UNLOCK_CARROT',() => { this.locked = false;});
        scene.add.existing(this);
    }

    performEvent() {
        if(this.initEvent) {
            if(!this.customEvent) {
                this.performColorEvent();
            } else {
                this.performCustomEvent();
            }

            
        }  else  {
            console.log('This carrot does nothing.');
        }
    }

    //Standard events determined by the carrot color
    performColorEvent() {
        switch (this.color) {
            case 'red':
                console.log('RED EVENT');
                break;
            case 'orange':
                console.log('ORANGE EVENT');
                EventEmitter.emit('ORANGE_EVENT');
                break;  
            case 'yellow':
                console.log('YELLOW EVENT');
                //DISPLAY THE KEY
                EventEmitter.emit('YELLOW_EVENT');
                break;
            case 'green':
                console.log('GREEN EVENT');
                EventEmitter.emit('GREEN_EVENT');
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
                console.log('This carrot performs an event!');
                break;
        }
    }

    //Custom events where the carrot does something different than standard
    performCustomEvent() {
        console.log(this.customEvent);
        switch (this.customEvent) {
            case 'TEST_EVENT':
                console.log('This is a test event');
                break;
            default:
                console.log('There is no custom event.');
                break;
        }
    }

    //SETTERS
    // setCustomEvent(customEvent) {
    //     this.customEvent = customEvent;
    // }

    // setLocked(locked) {
    //     this.locked = locked;
    // }

}



export default Carrot;