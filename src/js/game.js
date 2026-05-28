import "../css/style.css";
import {
  Actor,
  Engine,
  Vector,
  DisplayMode,
  SolverStrategy,
  vec,
  CollisionType,
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
    this.currentScene.physics.config.gravity = vec(0, 1500);

    this.add(new Floor());
    const player = new Player();
    this.add(player);
  }
}

new Game();
