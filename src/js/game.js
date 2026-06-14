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
import {Enemy} from "./enemy.js";
import {BigEnemy} from "./bigEnemy.js";
import {Jabloon} from "./jabloon.js";
import {StartLevel} from "./startLevel.js";
import {Level1} from "./level1.js";
import {GameOver} from "./gameOver.js";
import {tryAgainLevel} from "./tryAgainLevel.js";
import {VictoryLevel} from "./victoryLevel.js";
export class Game extends Engine {
  lives;
  jabloons;
  constructor() {
    super({
      width: 1280,
      height: 720,
      maxFps: 60,
      displayMode: DisplayMode.FitScreen,
    });
    this.start(ResourceLoader).then(() => this.startGame());
    this.lives = 3;
    this.jabloons = 0;
  }


  startGame() {
    //Scenes
   this.addScene("startLevel", new StartLevel());
   this.addScene("level1", new Level1());
   this.addScene("gameOver", new GameOver());
   this.addScene("tryAgainLevel", new tryAgainLevel());
   this.addScene("victoryLevel", new VictoryLevel());
   this.goToScene("startLevel");
  }

  resetGame() {
    this.lives = 3;
    this.jabloons = 0;
    this.removeScene("level1");
    this.addScene("level1", new Level1());
  }

  death() {
    this.lives--;
    console.log(`Lives remaining: ${this.lives}`);
    if (this.lives > 0) {
      this.goToScene("tryAgainLevel");
    } else {
      this.goToScene("gameOver");
    }
  }
  addJabloon() {
    this.jabloons++;
    console.log(`Jabloons collected: ${this.jabloons}`);
  }
}


new Game();
