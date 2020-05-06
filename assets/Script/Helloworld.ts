const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    Ball: cc.Node = null;

    @property(cc.Node)
    Player: cc.Node = null;

    @property(cc.Label)
    Message: cc.Label = null;

    @property(cc.Label)
    Time: cc.Label = null;

    @property(cc.Node)
    Blocks: cc.Node = null;

    AccLeft: Boolean = false;
    AccRight: Boolean = false;
    IsStarted: Boolean = false;
    StartTime: number;

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        
        // 物理システムを有効にする.
        cc.director.getPhysics3DManager().enabled = true;
        cc.director.getPhysics3DManager().allowSleep = false;
        cc.director.getPhysics3DManager().gravity = cc.v3(0,0,0);
    }

    update() {
        if (this.AccLeft) {
            this.Player.x -= 8;
        } else if (this.AccRight) {
            this.Player.x += 8;
        }

        // 終了判定.
        if (this.Blocks.childrenCount == 0) {
            // ボール停止
            let rigidBody = this.Ball.getComponent(cc.RigidBody3D);
            rigidBody.sleep();
            // メッセージ表示.
            this.Message.string = "ゲームクリア！";
            this.IsStarted = false;
        }

        if (this.IsStarted)
        {
            // 経過時間更新.
            const diff = Date.now() - this.StartTime;
            const minute  = Math.floor(diff / 60000);
            const second  = Math.floor(diff / 1000) % 60;
            this.Time.string = `${( minute < 10 ) ? '0' + minute : minute}:${( second < 10 ) ? '0' + second : second}`;
        }
    }

    onMouseDown(event: cc.Event.EventMouse) {
        switch (event.type) {
            case "mousedown":
                // イベント削除.
                this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
                // メッセージ非表示.
                this.Message.string = "";

                // ボールを動かす
                let rigidBody = this.Ball.getComponent(cc.RigidBody3D);
                // -3000 〜 3000 のランダム値.
                let rnd1 = (Math.random() * 3 * 2 - 3) * 1000;
                let rnd2 = (Math.random() * 3 * 2 - 3) * 1000;
                rigidBody.applyImpulse(cc.v3(rnd1, 0, rnd2), cc.v3(0,0,0));

                this.StartTime = Date.now();
                this.IsStarted = true;
                break;
        
            default:
                break;
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
