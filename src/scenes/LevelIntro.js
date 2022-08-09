
import Phaser from 'phaser';
import { levels } from '../data/leveldata';
import EventEmitter from '../events/Emitter';


class LevelIntro extends Phaser.Scene {
    constructor(config) {
        super('LevelIntro');
        this.config = config;
    }

    create({level}) {
        console.log('LEVEL INTRO');
        const levelData = levels[`level${level}`];
        this.containerWidth = 500;
        this.containerHeight = 400;
        this.textOffsetY = 20;
        this.textGapY = 20;
        this.containerCoords = {x: (this.config.width / 2) - (this.containerWidth/2), y: 120};
        const textBoxBorder = this.add.rectangle(this.containerCoords.x,this.containerCoords.y,this.containerWidth,this.containerHeight,0x0000FF).setOrigin(0,0);
        const textBox = this.add.rectangle(this.containerCoords.x + 10,this.containerCoords.y + 10,this.containerWidth - 20,this.containerHeight - 20,0xd2db1a).setOrigin(0,0);
        const textPosX = (this.containerCoords.x) + (textBox.width /2);
        const title = this.add.text(textPosX,this.containerCoords.y + this.textOffsetY ,levelData.title,{fontFamily: 'Arial', fontSize:'30px', fill: '#000'}).setOrigin(0.5,0);
        const instruction = this.add.text(textPosX,title.y + title.height + this.textGapY,levelData.instruction,{fontFamily: 'Arial', fontSize:'30px', fill: '#000', wordWrap:  { width: textBox.width - 10, useAdvancedWrap: true }, textAlign : 'center'}).setOrigin(0.5,0);
        const startText = this.add.text(textPosX,instruction.y + instruction.height + this.textGapY * 2 ,'Press Space to Start',{fontFamily: 'Arial', fontSize:'30px', fill: '#000'}).setOrigin(0.5,0);
        this.tweens.add({
            targets: startText,
            alpha : 0,
            duration: 500,
            repeat: -1,
            ease: 'linear',
            yoyo : true,
        });
        this.scene.launch('PlayScene', {level});
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time) {
        const { space } = this.cursors;
        if(space.isDown) {
            EventEmitter.emit('UNPAUSE');
            this.scene.stop('LevelIntro');
        }
    }

}

export default LevelIntro;