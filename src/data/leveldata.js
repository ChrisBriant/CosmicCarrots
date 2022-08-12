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
        instruction: 'Colelct the yellow carrot to reveal the key',
        collectSequence : ['yellow','green', 'orange','red','blue', 'pink','purple']
    }
}

export {levels};