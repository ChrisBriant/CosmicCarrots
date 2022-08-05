import Phaser from "phaser";
import Ladder from "../objects/Ladder";

class Ladders extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createFromConfig({
            classType: Ladder
        });
    }

    // mapProperties(propertiesList, general) {
    //     if(!propertiesList || propertiesList.length === 0) {return;}

    //     return propertiesList.reduce((map,obj) => {
    //         if(obj.properties) {
    //             obj.properties.forEach(prop => {
    //                 map[prop.name] = prop.value;
    //             });
    //         } else {
    //             map[obj.name] = obj.value;
    //         }

    //         return map;
    //     }, {});
    // }

    addFromLayer(layer) {
        layer.objects.forEach(ladderO => {
            const ladder = this.get(ladderO.x, ladderO.y,ladderO.width,ladderO.height,'ladder');
            ladder.setSize(ladderO.width,ladderO.height);
        });
    }
}

export default Ladders;