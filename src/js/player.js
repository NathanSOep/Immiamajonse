import {
  Actor,
  CollisionType,
  Color,
  Keys,
  Rectangle,
  Resource,
  Vector,
} from "excalibur";
import {Floor} from "./floor.js";
import {Resources} from "./resources.js";
import {Enemy} from "./enemy.js";

export class Player extends Actor {
  // Speed Variables
  currentSpeed;
  walkSpeed;
  sprintSpeed;
  sprintAccel;
  facingRight;
  newSpeed;
  drag;

  // Jump Variables
  jumpHeight;
  jumps;
  isOnGround;
  coyote;
  constructor() {
    super({
      width: 32,
      height: 32,
      collisionType: CollisionType.Active,
      color: Color.Red,
    });

    // Movement
    this.moveSpeed = 3;
    this.walkSpeed = 100;
    this.sprintSpeed = 250;
    this.sprintAccel = 4;
    this.currentSpeed = this.walkSpeed;

    this.sprintDuration = 0.5;
    this.drag = 0.95;
    this.facingRight = true;

    // Jump
    this.jumps = 2;
    this.jumpHeight = 120;
    this.isOnGround = false;
    this.coyote = 0.08;
    this.coyoteTimer = 0;
  }
  onInitialize(engine) {
    this.pos = new Vector(3, 0);
    this.graphics.use(
      Resources.Indiana.toSprite({destSize: {width: 32, height: 32}}),
    );

    // Check if on ground
    this.on("collisionstart", (event) => this.hitSomething(event));
    this.on("collisionend", (event) => this.leaveSomething(event));

    // Camera follows player
    engine.currentScene.camera.strategy.radiusAroundActor(
      this.body,
      engine.drawWidth / 8,
    );
  }

  onPreUpdate(engine, delta) {
    // Die when falling in pit
    if (this.pos.y > 500) {
      this.kill();
      engine.death();
    }

    // Inputs
    const leftKey = engine.input.keyboard.isHeld(Keys.A);
    const rightKey = engine.input.keyboard.isHeld(Keys.D);
    const jumpKey = engine.input.keyboard.wasPressed(Keys.Space);
    const sprintKey = engine.input.keyboard.isHeld(Keys.ShiftLeft);

    // Sprint
    if (sprintKey) {
      if (this.currentSpeed < this.sprintSpeed) {
        this.currentSpeed += this.sprintAccel;
      }
    } else if (this.currentSpeed > this.walkSpeed) {
      this.currentSpeed -= this.sprintAccel;
    }
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
    if (Math.abs(this.body.vel.x) > this.currentSpeed) {
      this.body.vel.x = Math.sign(this.body.vel.x) * this.currentSpeed;
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

  // Collision Detection
  hitSomething(event, delta) {
    if (this.vel.y === 0 || event.other instanceof Enemy) {
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
