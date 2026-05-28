import {Actor, CollisionType, Color, Keys, Rectangle, Vector} from "excalibur";
import {Floor} from "./floor.js";

export class Player extends Actor {
  topSpeed;
  accel;
  decel;
  jumpSpeed;
  jumps;
  facingRight;
  newSpeed;
  keyHeld;
  isOnGround;
  constructor() {
    super({
      width: 30,
      height: 30,
      collisionType: CollisionType.Active,
    });
    const sprite = new Rectangle({
      width: 30,
      height: 30,
      color: Color.Red,
    });

    // Movement
    this.keyHeld = false;
    this.topSpeed = 700;
    this.accel = 10;
    this.decel = 15;
    this.facingRight = true;

    // Jump
    this.jumps = 2;
    this.jumpSpeed = 800;
    this.isOnGround = false;

    this.graphics.use(sprite);
  }
  onInitialize(engine) {
    this.currentSpeed = 0;
    this.newSpeed = 0;
    this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);

    // Check if on ground
    this.on("collisionstart", (event) => this.hitSomething(event));
    this.on("collisionend", (event) => this.leaveSomething(event));
  }

  onPreUpdate(engine) {
    // Check which way player is moving

    if (this.currentSpeed > 0) {
      this.facingRight = true;
    } else if (this.currentSpeed < 0) {
      this.facingRight = false;
    }

    // Inputs
    this.keyHeld = false;
    if (engine.input.keyboard.isHeld(Keys.D)) {
      this.keyHeld = true;

      if (this.currentSpeed < this.topSpeed) {
        this.currentSpeed += this.accel;
      }
    }
    if (engine.input.keyboard.isHeld(Keys.A)) {
      this.keyHeld = true;

      if (this.currentSpeed > -this.topSpeed) {
        this.currentSpeed -= this.accel;
      }
    }

    if (engine.input.keyboard.wasPressed(Keys.Space)) {
      if (this.jumps > 0) {
        this.vel = new Vector(this.currentSpeed, -this.jumpSpeed);
        this.isOnGround = false;
        this.jumps--;
      }
    }

    if (!this.keyHeld) {
      if (this.facingRight) {
        this.currentSpeed -= this.decel;
      } else {
        this.currentSpeed += this.decel;
      }
      if (Math.abs(this.currentSpeed) < this.decel) {
        this.currentSpeed = 0;
      }
    }
    this.vel = new Vector(this.currentSpeed, this.vel.y);
  }

  hitSomething(event) {
    if (event.other.owner instanceof Floor) {
      this.jumps = 2;
      this.isOnGround = true;
    }
  }

  leaveSomething(event) {
    if (event.other.owner instanceof Floor) {
      this.isOnGround = false;
    }
  }
}
