import {Actor, Vector, CollisionType} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";

export class Jabloon extends Actor {
  constructor(x, y) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Center,
      width: 32,
      height: 32,
      collisionType: CollisionType.Passive,
    });
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Jabloon.toSprite({ destSize: { width: 32, height: 32 } }));
    this.on("collisionstart", (event) => this.hitSomething(event, engine));
    this.actions.repeatForever((repeatCtx) => {
      repeatCtx.moveBy(0, 5, 5);
      repeatCtx.moveBy(0, -5, 5);
    });
  }

  hitSomething(event, engine) {
    if (event.other.owner instanceof Player) {
      console.log("Player collected a Jabloon");
      engine.addJabloon();
      if (engine.currentScene?.jabloonsLabel) {
        engine.currentScene.jabloonsLabel.text = `Jabloons: ${engine.jabloons}`;
      }
      this.kill();
    }
  }
}
