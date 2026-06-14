import {Engine, Scene, Label, Vector} from "excalibur";
export class StartLevel extends Scene {
    onInitialize(engine) {


        // Title
        const Title = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 50),
            anchor: new Vector(0.5, 0.5),
            text: "Immiama Jonse en de zes Jabloons",
        });
        this.add(Title);

        // Start button
        const startButton = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            anchor: new Vector(0.5, 0.5),
            text: "Click to Start",
        });
        this.add(startButton);
        startButton.on("pointerdown", () => this.clickHandler());
    }
    clickHandler() {
        this.engine.goToScene("level1");
    }
}