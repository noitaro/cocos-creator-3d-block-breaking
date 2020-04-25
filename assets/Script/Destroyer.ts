const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {
        let collider = this.getComponent(cc.Collider3D);
        collider.on('collision-enter', this.onCollision, this);
    }

    onCollision () {
        this.node.destroy();
    }
 
}
