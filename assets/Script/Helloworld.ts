const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    Ball: cc.Node = null;

    @property(cc.Node)
    Player: cc.Node = null;

    AccLeft: Boolean = false;
    AccRight: Boolean = false;

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        
        // 物理システムを有効にする.
        cc.director.getPhysics3DManager().enabled = true;
        cc.director.getPhysics3DManager().allowSleep = false;
        cc.director.getPhysics3DManager().gravity = cc.v3(0,0,0);
 
        // ボールを動かす
        let rigidBody = this.Ball.getComponent(cc.RigidBody3D);
        rigidBody.applyImpulse(cc.v3(0, 0, 3000), cc.v3(0,0,0));
    }

    /* 省略 */

    update() {
        if (this.AccLeft) {
            this.Player.x -= 8;
        } else if (this.AccRight) {
            this.Player.x += 8;
        }
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.AccLeft = true;
                break;
            case cc.macro.KEY.right:
                this.AccRight = true;
                break;
            default:
                break;
        }
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.AccLeft = false;
                break;
            case cc.macro.KEY.right:
                this.AccRight = false;
                break;
            default:
                break;
        }
    }
}
