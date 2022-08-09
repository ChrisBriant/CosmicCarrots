import Phaser from "phaser";

class Hud extends Phaser.GameObjects.Container {
    constructor(scene,x,y,carrots) {
        super(scene,x,y);
        scene.add.existing(this);
        

        //const { rightTopCorner } = scene.config;
        this.containerWidth = 448;
        this.containerHeight = 64;
        console.log(((scene.config.width / 2) - (this.containerWidth / 2)) - (this.containerWidth/2),scene.config.width);
        console.log(((scene.config.width / 2) - (this.containerWidth / 2)),scene.config.width);
        this.hudCoords = {x: (scene.config.width / 2) - (this.containerWidth/2), y: 10};
        this.setPosition(this.hudCoords.x, this.hudCoords.y);
        this.carrotList = [...carrots];
        this.collectedCarrots = [];
        // this.setScrollFactor(0);
        // this.fontSize = 20;
        // this.setupList();
        //const { rightTopCorner } = scene.config;
        //this.containerWidth = 70;
        //this.setPosition(rightTopCorner.x - this.containerWidth, rightTopCorner.y + 10);
        this.setScrollFactor(0);
        this.fontSize = 20;
        this.setupList();
        this.setDepth(99);
        //scene.add.rectangle()
        //this.add.rectangle(0, 0,100,100, 0xFFFFFF,1);
        //scene.add.rectangle(0, 0,this.containerWidth,this.containerHeight,0xFFFFFF,1);
        //const hudBg = this.scene.add.rectangle(this.hudCoords.x, this.hudCoords.y,this.containerWidth,this.containerHeight,0xFFFFFF,1);
        //this.setDepth(99);
    }


    // createCarrotHud() {
    //     const hudBg = this.scene.add.rectangle(200, 200,this.containerWidth,600,0xFFFFFF,1);
    //     hudBg.setOrigin(0,0);
    //     this.add(hudBg);
    //    //const scoreText = this.scene.add.text(0,0,'0', {fontSize:`${this.fontSize}px`, fill: '#fff'});
    //     // const scoreImage = this.scene.add.image(scoreText.width + 10, 0,'diamond').setOrigin(0).setScale(1.3);
    //     const hud= this.scene.add.container(0,0,[hudBg]);
    //     // scoreBoard.setName('scoreBoard');
    //     return hud;
    // }

    setupList() {
        const scoreBoard = this.createScoreBoard();

        this.add(scoreBoard);
    }

    createScoreBoard() {
        const hudBg = this.scene.add.rectangle(0, this.hudCoords.y,this.containerWidth,this.containerHeight, 0xFFFFFF,1);
        hudBg.setOrigin(0,0).setAlpha(.5);

        //const hudBg = this.scene.add.rectangle(this.hudCoords.x, this.hudCoords.y,this.containerWidth,this.containerHeight, 0xFFFFFF,1);
        //const scoreText = this.scene.add.text(0,0,'0', {fontSize:`${this.fontSize}px`, fill: '#fff'});
        //const scoreImage = this.scene.add.image(0, this.hudCoords.y,'carrot-orange').setOrigin(0);
        // const scoreImage2 = this.scene.add.image(64, this.hudCoords.y,'carrot-orange').setOrigin(0);
        // const scoreImage3 = this.scene.add.image(128, this.hudCoords.y,'carrot-orange').setOrigin(0);
        // const scoreImage4 = this.scene.add.image(192, this.hudCoords.y,'carrot-orange').setOrigin(0);
        // const scoreImage5 = this.scene.add.image(256, this.hudCoords.y,'carrot-orange').setOrigin(0);
        // const scoreImage6 = this.scene.add.image(320, this.hudCoords.y,'carrot-orange').setOrigin(0);
        // const scoreImage7 = this.scene.add.image(384, this.hudCoords.y,'carrot-orange').setOrigin(0);
        const scoreBoard = this.scene.add.container(0,0,[hudBg]);
        scoreBoard.setName('scoreBoard');
        return scoreBoard;
    }

    updateScoreBoard(carrotColor) {
        //const [scoreText, scoreImage] = this.getByName('scoreBoard').list;
        const scoreBoard = this.getByName('scoreBoard');
        //scoreText.setText(score);
        //Update the scoreboard once
        if(!this.collectedCarrots.includes(carrotColor)) {
            const carrotImgX = this.carrotList.indexOf(carrotColor)*64
            const carrotImage = this.scene.add.image(0, this.hudCoords.y,`carrot-${carrotColor}`).setOrigin(0);
            const carrotContainer =this.scene.add.container(carrotImgX,0,[carrotImage]);
            this.add(carrotContainer);
            this.collectedCarrots.push(carrotColor);
        }

        //scoreImage.setX(scoreText.width + 10);
    }
}

export default Hud;