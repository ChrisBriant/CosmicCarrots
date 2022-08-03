class Ladders  {
    constructor(scene,player,laddersLayer,map) {
        scene.physics.add.overlap(player, laddersLayer,this.onClimb,null,this);
        this.ladders = laddersLayer;
        this.tileMap = map;
        this.scene = scene;
        this.ladderTile = null;
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
}

export default Ladders;