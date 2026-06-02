import {Actor, CollisionType, Color, Keys, Rectangle, Vector} from "excalibur";
import {Floor} from "./floor.js";

export class Player extends Actor {
  // Speed
  moveSpeed;
  facingRight;
  newSpeed;
  drag;

  // Jumps
  jumpHeight;
  jumps;
  isOnGround;
  coyote;
  constructor() {
    super({
      width: 8,
      height: 8,
      collisionType: CollisionType.Active,
      color: Color.Red,
    });

    // Movement
    this.moveSpeed = 3;
    this.maxSpeed = 200;
    this.drag = 0.95;
    this.facingRight = true;

    // Jump
    this.jumps = 2;
    this.jumpHeight = 100;
    this.isOnGround = false;
    this.coyote = 0.08;
    this.coyoteTimer = 0;
  }
  onInitialize(engine) {
    this.pos = new Vector(3, 0);

    // Check if on ground
    this.on("collisionstart", (event) => this.hitSomething(event));
    this.on("collisionend", (event) => this.leaveSomething(event));

    engine.currentScene.camera.strategy.radiusAroundActor(
      this.body,
      engine.drawWidth / 8,
    );
  }

  onPreUpdate(engine, delta) {
    // Die when falling in pit
    if (this.pos.y > 500) {
      this.kill();
    }

    // Inputs
    const leftKey = engine.input.keyboard.isHeld(Keys.A);
    const rightKey = engine.input.keyboard.isHeld(Keys.D);
    const jumpKey = engine.input.keyboard.wasPressed(Keys.Space);

    // Movement
    if (rightKey) {
      this.body.applyLinearImpulse(new Vector(this.moveSpeed * delta, 0));
      this.facingRight = true;
    } else if (leftKey) {
      this.body.applyLinearImpulse(new Vector(-this.moveSpeed * delta, 0));
      this.facingRight = false;
    }

    // Deceleration
    else {
      this.body.vel = new Vector(this.body.vel.x * this.drag, this.body.vel.y);
      if (Math.abs(this.body.vel.x) < 20) {
        this.body.vel.x = 0;
      }
    }

    // Limit speed
    if (Math.abs(this.body.vel.x) > this.maxSpeed) {
      this.body.vel.x = Math.sign(this.body.vel.x) * this.maxSpeed;
    }

    // Coyote
    if (this.coyoteTimer > 0) {
      this.coyoteTimer -= 0.001 * delta;
      if (this.coyoteTimer <= 0) {
        this.coyoteTimer = 0;
        this.isOnGround = false;

        // Remove first jump when walking off platform
        if (this.jumps > 1) {
          this.jumps--;
        }
      }
    }

    // Jumping
    if (jumpKey) {
      if (this.jumps > 0) {
        if (this.body.vel.y > 0) {
          this.body.vel.y = 0;
        }
        this.body.applyLinearImpulse(new Vector(0, -this.jumpHeight * delta));
        this.coyoteTimer = 0;
        this.jumps--;
      }
    }
  }

  // Check if player is on ground
  hitSomething(event) {
    if (this.vel.y === 0) {
      this.jumps = 2;
      this.isOnGround = true;
      this.coyoteTimer = 0;
    }
  }

  //Trigger coyote timer when leaving ground
  leaveSomething(event) {
    this.coyoteTimer = this.coyote;
  }
}
