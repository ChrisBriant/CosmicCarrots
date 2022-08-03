import Phaser from "phaser";

class Hud extends Phaser.GameObjects.Container {
    constructor(scene,x,y) {
        super(scene,x,y);
        scene.add.existing(this);

        const { rightTopCorner } = scene.config;
        this.containerWidth = 70;
        this.setPosition(rightTopCorner.x - this.containerWidth, rightTopCorner.y + 10);
        this.setScrollFactor(0);
        this.fontSize = 20;
        this.setupList();
        this.setDepth(99);
    }

    setupList() {
        const scoreBoard = this.createScoreBoard();

        this.add(scoreBoard);
    }

    createScoreBoard() {
        const scoreText = this.scene.add.text(0,0,'0', {fontSize:`${this.fontSize}px`, fill: '#fff'});
        const scoreImage = this.scene.add.image(scoreText.width + 10, 0,'diamond').setOrigin(0).setScale(1.3);
        const scoreBoard = this.scene.add.container(0,0,[scoreText,scoreImage]);
        scoreBoard.setName('scoreBoard');
        return scoreBoard;
    }

    updateScoreBoard(score) {
        const [scoreText, scoreImage] = this.getByName('scoreBoard').list;
        scoreText.setText(score);
        scoreImage.setX(scoreText.width + 10);
    }
}

export default Hud;