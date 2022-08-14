export default (anims) => {
    anims.create({
        key: 'alien-walk',
        frames: anims.generateFrameNumbers('alien', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
      });
}