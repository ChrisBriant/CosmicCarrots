//Event functions to perform when event triggered

function doPurpleEvent(door) {
    console.log('DOING PURPLE');
    door.setAlpha(1);
}

export {doPurpleEvent};