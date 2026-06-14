import {Actor, Vector, CollisionType} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";

export class Trophy extends Actor {
  constructor(x, y) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Center,
      width: 64,
      height: 64,
      collisionType: CollisionType.Passive,
    });
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Trophy.toSprite({ destSize: { width: 64, height: 64 } }));
    this.on("collisionstart", (event) => this.hitSomething(event, engine));
    this.actions.repeatForever((repeatCtx) => {
      repeatCtx.moveBy(0, 5, 5);
      repeatCtx.moveBy(0, -5, 5);
    });
  }

  hitSomething(event, engine) {
    if (event.other.owner instanceof Player) {
        engine.goToScene("victoryLevel");
    }
  }
}
