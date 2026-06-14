import {Engine, Scene, Label, Vector} from "excalibur";
export class GameOver extends Scene {
    scoreLabel;

    onInitialize(engine) {
        const startButton = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            anchor: new Vector(0.5, 0.5),
            text: "Game Over",
            backgroundColor: "red",
        });


        // Score and High Score
        this.scoreLabel = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 50),
            anchor: new Vector(0.5, 0.5),
            text: "Jabloons collected: 0",
        });
        this.highscoreLabel = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 + 100),
            anchor: new Vector(0.5, 0.5),
            text: `Best Score: ${localStorage.getItem("bestScore") || 0}`,
        });

        // Reset Button
        this.add(startButton);
        startButton.on("pointerdown", () => this.clickHandler());
        this.add(this.scoreLabel);
        this.add(this.highscoreLabel);
    }

    onActivate(engine) {

        // Update Score labels
        if (this.scoreLabel && this.engine) {
            this.scoreLabel.text = `Jabloons collected: ${this.engine.jabloons}`;
        }

        // Save High Score to localStorage
        const bestScore = Number(localStorage.getItem("bestScore") || 0);
        if (engine.jabloons > bestScore) {
            localStorage.setItem("bestScore", engine.jabloons);
        }
        if (this.highscoreLabel) {
            this.highscoreLabel.text = `Best Score: ${localStorage.getItem("bestScore") || 0}`;
        }
    }

    clickHandler() {
        this.engine.resetGame();
        this.engine.goToScene("startLevel");
    }
}