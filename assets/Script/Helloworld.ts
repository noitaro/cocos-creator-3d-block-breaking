const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Node)
  Player: cc.Node = null;

  AccLeft: Boolean = false;
  AccRight: Boolean = false;

  start() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

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
