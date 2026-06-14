import {Enemy} from "./enemy.js";
import {Resources} from "./resources.js";
import {Color} from "excalibur";

export class BigEnemy extends Enemy  {
    constructor(x, y, minPoint, maxPoint) {
        super(x, y, minPoint, maxPoint, 32, 64);
        this.speed = 40;
    }
    onInitialize(engine) {
        super.onInitialize(engine);
        console.log("Big Enemy Initialized");
        const sprite = Resources.Snake.toSprite({ destSize: { width: 64, height: 64 } });
        sprite.tint = Color.Red;
        this.graphics.use(sprite);
    }
}