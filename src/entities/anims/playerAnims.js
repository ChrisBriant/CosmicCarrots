export default anims => {
    anims.create({
        key: 'walk',
        frames: anims.generateFrameNumbers('player', {start: 3, end: 12}),
        frameRate: 16,
        repeat: -1
      });

      anims.create({
        key: 'idle',
        frames: anims.generateFrameNumbers('player', {start: 0, end: 2}),
        frameRate: 8,
        repeat: -1
      });

      anims.create({
        key: 'jump',
        frames: anims.generateFrameNumbers('player', {start: 13, end: 23}),
        frameRate: 8,
        repeat: 1
      });

      anims.create({
        key: 'fly',
        frames: anims.generateFrameNumbers('player', {start: 24, end: 30}),
        frameRate: 14,
        repeat: 0
      });

      anims.create({
        key: 'climb',
        frames: anims.generateFrameNumbers('player', {start: 31, end: 40}),
        frameRate: 14,
        repeat: 0
      });

      anims.create({
        key: 'climb-idle',
        frames: anims.generateFrameNumbers('player', {start: 31, end: 31}),
        frameRate: 14,
        repeat: 0
      });
}