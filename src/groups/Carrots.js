import Phaser from "phaser";
import Carrot from "../Collectables/Carrot";

class Carrots extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createFromConfig({
            classType: Carrot
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
        //const {score:defaultScore, type} = this.mapProperties(layer.objects,true);
        console.log('LAYER', layer);
        layer.objects.forEach(collectableO => {
            const carrotColor = collectableO.properties.filter((e) => e.name === 'color')[0].value;
            const collectable = this.get(collectableO.x, collectableO.y, carrotColor);
            //console.log('COLLECTABLE', collectableO);
            //const props = this.mapProperties(collectableO.properties,false);
            //collectable.score = props.score || defaultScore;
        });
    }
}

export default Carrots;