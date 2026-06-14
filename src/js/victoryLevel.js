import {Scene, Color, Label, Vector} from "excalibur";
import {Trophy} from "./trophy.js";

export class VictoryLevel extends Scene {
    onInitialize(engine) {
        this.backgroundColor = Color.Black;
        const trophy = new Trophy(engine.drawWidth / 2, engine.drawHeight / 2);
        this.add(trophy);

        this.victoryLabel = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 100),
            anchor: new Vector(0.5, 0.5),
            text: "You Won!!",
            color: Color.White,
        });
        // Score and High Score
        this.scoreLabel = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 70),
            anchor: new Vector(0.5, 0.5),
            text: `Jabloons collected: ${engine.jabloons}`,
            color: Color.White,
        });

        const bestScore = Number(localStorage.getItem("bestScore") || 0);
        if (engine.jabloons > bestScore) {
            localStorage.setItem("bestScore", engine.jabloons);
        }

        this.highscoreLabel = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 120),
            anchor: new Vector(0.5, 0.5),
            text: `Best Score: ${localStorage.getItem("bestScore") || 0}`,
            color: Color.White,
        });
        this.add(this.victoryLabel);
        this.add(this.scoreLabel);
        this.add(this.highscoreLabel);
        
    }
}