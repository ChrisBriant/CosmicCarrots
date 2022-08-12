import Phaser from "phaser";
import Carrot from "../Collectables/Carrot";

class Carrots extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        super(scene.physics.world, scene);

        // this.createFromConfig({
        //     classType: Carrot
        // });
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
            const initEvent = collectableO.properties.filter((e) => e.name === 'initEvent')[0].value;
            //Get custom event if it exists
            const customEventList = collectableO.properties.filter((e) => e.name === 'customEvent')
            let customEvent;
            if(customEventList.length > 0) {
                customEvent = customEventList[0].value;
            } else {
                customEvent = null;
            }
            //Get the locked property
            const propsLocked = collectableO.properties.filter((e) => e.name === 'locked')
            let locked;
            if(propsLocked.length > 0) {
                locked = propsLocked[0].value;
            } else {
                locked = false;
            }
            //const collectable = this.get(collectableO.x, collectableO.y, carrotColor, initEvent).setCustomEvent(customEvent).setLocked(locked);
            console.log('IS THIS LOCKED', propsLocked);
            //DOESN'T WORK
            const carrot = new Carrot(this.scene,collectableO.x, collectableO.y, carrotColor, initEvent,locked);
            //scene.physics.add.overlap(this, otherGameObject, callback,null,context || this);
            this.add(carrot);
            //physics.add(carrot);

            //const collectable = this.get(collectableO.x, collectableO.y, carrotColor, initEvent).setLocked(locked);
            //collectable.locked = locked;
            //const props = this.mapProperties(collectableO.properties,false);
            //collectable.score = props.score || defaultScore;
        });
    }
}

export default Carrots;