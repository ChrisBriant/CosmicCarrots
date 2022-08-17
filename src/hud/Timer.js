import EventEmitter from '../events/Emitter';

class Timer extends Phaser.GameObjects.Container {
    constructor(scene,x,y,seconds) {
        super(scene,x,y);
        this.seconds = seconds;
        this.timer = null;
        this.timerStarted = false;

        scene.add.existing(this);
        this.setScrollFactor(0);
        this.setDepth(99);
        this.createTimer(scene);
        this.setAlpha(0);
        EventEmitter.on('END_TIMER',() => {
            clearInterval(this.timer);
            this.timerStarted = false;
            this.setAlpha(0);
        });
    }

    createTimer(scene) {
        this.containerCoords = {x: (this.scene.config.width / 2), y: 120};
        const timerText = this.scene.add.text(this.containerCoords.x,this.containerCoords.y,this.seconds,{fontFamily: 'Arial', fontSize:'30px', fill: '#fff'}).setOrigin(0.5);
        //const timerText = this.scene.add.text(this.containerCoords.y,this.containerCoords.y,'HELLO',{fontFamily: 'Arial', fontSize:'30px', fill: '#000'}).setOrigin(0.5,0.5);
        const timerContainer =this.scene.add.container(0,0,[timerText]);
        timerContainer.setName('timerDisplay');
        this.add(timerContainer);
    }

    startTimer() {
        if(!this.timerStarted) {
            this.setAlpha(1);
            const [timerText] = this.getByName('timerDisplay').list;
            console.log('START TIMEOUT');
            this.timer = setInterval(()=>{
                console.log('Timed Out',this.seconds);
                if(this.seconds > 0) {
                    this.seconds--;
                    timerText.setText(this.seconds);
                } else {
                    clearInterval(this.timer);
                    this.timerStarted = false;
                    console.log('DESTROY TIMEOUT');
                    EventEmitter.emit('RESTART_LEVEL');
                }
            }, 1000);
            this.timerStarted = true;
        }
    }


}

export default Timer;