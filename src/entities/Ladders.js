import EventEmitter from '../events/Emitter';

class Ladders  {
    constructor(scene,player,laddersLayer,map) {
        this.ladderOverlap = scene.physics.add.overlap(player, laddersLayer,this.onClimb,null,this);
        this.ladders = laddersLayer;
        this.tileMap = map;
        this.scene = scene;
        this.ladderTile = null;
        //Disables the ladders if they are not meant to be shown
        if(!laddersLayer.layer.visible) {
            this.ladders.alpha = 0;
            this.ladderOverlap.active = false;
        }
        //Setup the event callback which enables the ladders
        EventEmitter.on('ORANGE_EVENT',() => {
            this.showLadders();
        });
    }

    onClimb(player) {
        //Find the tile the player is centered on
        const tile = this.tileMap.getTileAtWorldXY(player.x-(player.width/2),player.y-(player.width/2),true,this.scene.cameras.main,this.ladders);
        if(tile.index !== -1) {
            player.climbing = true;
            this.ladderTile = tile;
        } else {
            if(player.climbing) {
                //Pop off the ladder only if in the middle or at the top
                if(!this.ladderTile.properties.isBottom) {
                    player.setJustClimbedCoolDown();
                }
            }
            player.climbing = false;
        }
    }

    //Call from an event to make the ladders visible and enable them
    showLadders() {
        this.ladders.alpha = 1;
        this.ladderOverlap.active = true;
    }
}

export default Ladders;