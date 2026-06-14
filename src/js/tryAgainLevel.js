import {Engine, Scene, Label, Vector} from "excalibur";
export class tryAgainLevel extends Scene {
    onInitialize(engine) {


        const startButton = new Label({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            anchor: new Vector(0.5, 0.5),
            text: "Try Again",
        });
        this.add(startButton);
        startButton.on("pointerdown", () => this.clickHandler());
    }
    clickHandler() {
        this.engine.goToScene("level1");
    }
}