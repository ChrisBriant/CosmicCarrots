//Event functions to perform when event triggered

function doPurpleEvent(door) {
    console.log('DOING PURPLE');
    door.setAlpha(1);
}

function doCollectKey(hud,player) {
    if(!player.hasKey) {
        hud.addKeyToDisplay();
        player.hasKey = true;
    }
}

function doOpenCage(player,collectables,scene) {
    if(player.hasKey) {
        console.log('OPEN THE CAGE');
        collectables.openCage(scene);
    }
}

export {doPurpleEvent, doCollectKey, doOpenCage};