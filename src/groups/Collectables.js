import Phaser from "phaser";
import Collectable from "../Collectables/Collectable";

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createFromConfig({
            classType: Collectable
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
        layer.objects.forEach(collectableO => {
            console.log('COLLECTABLES',collectableO.properties.filter(e => e.name==='event')[0].value);
            const collectable = this.get(collectableO.x, collectableO.y,collectableO.name);
            collectable.event = collectableO.properties.filter(e => e.name==='event')[0].value;
        });
    }

    //Collectable events
    openCage() {
        //Get the cage
        const cage = this.getChildren().filter(obj => obj.name === 'cage')[0];
        cage.openCage();
    }
}

export default Collectables;