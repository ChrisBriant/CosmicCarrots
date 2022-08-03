import Phaser from "phaser";
import Collectable from "../Collectables/Collectable";

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createFromConfig({
            classType: Collectable
        });
    }

    mapProperties(propertiesList, general) {
        if(!propertiesList || propertiesList.length === 0) {return;}

        return propertiesList.reduce((map,obj) => {
            if(obj.properties) {
                obj.properties.forEach(prop => {
                    map[prop.name] = prop.value;
                });
            } else {
                map[obj.name] = obj.value;
            }

            return map;
        }, {});
    }

    addFromLayer(layer) {
        const {score:defaultScore, type} = this.mapProperties(layer.objects,true);
        layer.objects.forEach(collectableO => {
            const collectable = this.get(collectableO.x, collectableO.y,type);
            const props = this.mapProperties(collectableO.properties,false);
            collectable.score = props.score || defaultScore;
        });
    }
}

export default Collectables;