import {
  Actor,
  Engine,
  Vector,
  DisplayMode,
  SolverStrategy,
  vec,
  CollisionType,
  Camera,
  Scene,
  Label,
  Color,
  CoordPlane,
} from "excalibur";
import {Resources} from "./resources.js";
import {Player} from "./player.js";
import {Enemy} from "./enemy.js";
import {BigEnemy} from "./bigEnemy.js";
import {Jabloon} from "./jabloon.js";
import {Trophy} from "./trophy.js";

export class Level1 extends Scene {
  livesLabel;
 jabloonsLabel;

    onActivate(_context) {
    this.add(new Player());

    // Update HUD
    if (this.livesLabel) {
      this.livesLabel.text = `Lives: ${this.engine?.lives ?? 0}`;
    }
    if (this.jabloonsLabel) {
      this.jabloonsLabel.text = `Jabloons: ${this.engine?.jabloons ?? 0}`;
    }
  }

  onInitialize(engine) {
    // Physics configuration
    this.engine.currentScene.physics.config.solver = SolverStrategy.Arcade;
    this.engine.currentScene.physics.config.gravity = vec(0, 600);

    Resources.Geometry.addToScene(this.engine.currentScene);

    // Enemies
    this.add(new Enemy(320, -32, 256, 370));
    this.add(new Enemy(170, -12, 5, 170));
    this.add(new Enemy(831, -90, 830, 890));
    this.add(new Enemy(1300, -170));
    this.add(new BigEnemy(480, -32, 450, 480));

    // Jabloon
    this.add(new Jabloon(720, -80));
    this.add(new Jabloon(215, -120));
    this.add(new Jabloon(470, -120));
    this.add(new Jabloon(470, 10));
    this.add(new Jabloon(860, -220));
    this.add(new Jabloon(1280, -95));

    // Trophy
    this.add(new Trophy(1500, -220));

    // HUD
    // Lives
    this.livesLabel = new Label({
      pos: new Vector(20, 20),
      text: `Lives: ${this.engine.lives}`,
      color: Color.White,
      z: 999,
      coordPlane: CoordPlane.Screen,
      anchor: new Vector(0, 0),
    });
    this.add(this.livesLabel);

    // Jabloons
     this.jabloonsLabel = new Label({
      pos: new Vector(20, 30),
      text: `Jabloons: ${this.engine.jabloons}`,
      color: Color.White,
      z: 999,
      coordPlane: CoordPlane.Screen,
      anchor: new Vector(0, 0),
    });
    this.add(this.jabloonsLabel);

    // Camera FOV
    this.engine.currentScene.camera.zoom = 2;
  }

}