const levels = {
    level1 : {
        title: 'Level 1',
        instruction: 'Colelct the carrots in a sequence to open the door',
        collectSequence : ['purple','orange', 'yellow','green','blue', 'pink','red']
    },
    level2 : {
        title: 'Level 2',
        instruction: 'Colelct the orange carrot to reveal the ladders',
        collectSequence : ['orange','red', 'yellow','green','blue', 'pink','purple']
    },
    level3 : {
        title: 'Level 3',
        instruction: 'Collect the yellow carrot to reveal the key',
        collectSequence : ['yellow','green', 'orange','red','blue', 'pink','purple']
    },
    level4 : {
        title: 'Level 4',
        instruction: 'Aliens Attack! Collecting the green carrot will cause aliens to invate. Avoid them at all costs, contact with an alien will restart the level again.',
        collectSequence : ['green','yellow', 'orange','red','blue', 'pink','purple']
    },
    level5 : {
        title: 'Level 5',
        instruction: 'Collect the blue carrot to start the timer. You have 30 seconds to collect the next carrot and before the level resets!',
        collectSequence : ['blue','green', 'orange','red','yellow', 'pink','purple'],
        timer : 5
    }
}

export {levels};