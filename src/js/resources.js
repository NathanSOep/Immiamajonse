import {ImageSource, Loader} from "excalibur";
import {TiledResource} from "@excaliburjs/plugin-tiled";

const tiledMapPath = `${import.meta.env.BASE_URL}tilesets/level1.tmj`;

const Resources = {
  // Sprites
  Indiana: new ImageSource("images/indiana.png"),
  Snake: new ImageSource("images/snake.png"),
  Trophy: new ImageSource("images/trophy.png"),
  Jabloon: new ImageSource("images/jabloon.png"),
  //Tiles
  Geometry: new TiledResource(tiledMapPath, {strict: false}),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export {Resources, ResourceLoader};
