import {Actor, CollisionType, Color, Rectangle, Vector} from "excalibur";

export class Floor extends Actor {
  constructor() {
    super({
      width: 5000,
      height: 30,
      collisionType: CollisionType.Fixed,
    });
    const sprite = new Rectangle({
      width: 5000,
      height: 30,
      color: Color.Gray,
    });
    this.graphics.use(sprite);
  }
  onInitialize(engine) {
    this.pos = new Vector(0, engine.drawHeight - 15);
  }
}
