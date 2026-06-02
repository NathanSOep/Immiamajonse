import "../css/style.css";
import {
  Actor,
  Engine,
  Vector,
  DisplayMode,
  SolverStrategy,
  vec,
  CollisionType,
  Camera,
} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Player} from "./player.js";
import {Floor} from "./floor.js";

export class Game extends Engine {
  constructor() {
    super({
      width: 1280,
      height: 720,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
    });
    this.start(ResourceLoader).then(() => this.startGame());
  }

  startGame() {
    // Physics configuration
    this.currentScene.physics.config.solver = SolverStrategy.Arcade;
    this.currentScene.physics.config.gravity = vec(0, 400);

    Resources.Level1.addToScene(this.currentScene);

    const player = new Player();
    this.add(player);

    // Camera FOV
    this.currentScene.camera.zoom = 2;
  }
}

new Game();
