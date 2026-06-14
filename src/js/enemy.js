import { Actor, Color, CollisionType, Vector } from "excalibur";
import {Player} from "./player.js";
import {Resources} from "./resources.js";
export class Enemy extends Actor {
    speed;
    constructor(x, y, minPoint, maxPoint, width = 32, height = 32) {
        super({
            width,
            height,
            collisionType: CollisionType.Active,
        });

        // Patrol Points and Starting position
        this.minPoint = minPoint;
        this.maxPoint = maxPoint;
        this.pos = new Vector(x, y);
        this.speed = 10;
    }
    onInitialize(engine) {
        this.graphics.use(Resources.Snake.toSprite({ destSize: { width: 32, height: 32 } }));

        // Patrol between min and max points
        if((this.minPoint) && (this.maxPoint)) {
        this.actions.repeatForever((repeatCtx) => {
        repeatCtx.moveTo(this.minPoint, -32, this.speed)
        repeatCtx.moveTo(this.maxPoint, -32, this.speed)
})
        }
    this.on("collisionstart", (event) => this.hitSomething(event, engine));
    }
    onPostUpdate(engine) { 

        // Turn sprite based on direction
        if (this.vel.x > 0) {
            this.graphics.flipHorizontal = true;
        } else if (this.vel.x < 0) {
            this.graphics.flipHorizontal = false;
        }
    }

    // Check for collision with player
    hitSomething(event, engine) {
        if (event.other.owner instanceof Player) {

            // Check if player is above enemy
      if (event.other.owner.pos.y < this.pos.y - this.height + 5) {
        this.kill();
        event.other.owner.body.applyLinearImpulse(new Vector(0, -3000));
      } else {
        event.other.owner.kill();
        engine.death();
      }
    }
}
}