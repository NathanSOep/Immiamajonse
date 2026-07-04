import {ImageSource, Loader} from "excalibur";
import {TiledResource} from "@excaliburjs/plugin-tiled";

const baseUrl = new URL(import.meta.env.BASE_URL, window.location.href);
const assetUrl = (path) => new URL(path, baseUrl).href;

const Resources = {
  // Sprites
  Indiana: new ImageSource(assetUrl("images/indiana.png")),
  Snake: new ImageSource(assetUrl("images/snake.png")),
  Trophy: new ImageSource(assetUrl("images/trophy.png")),
  Jabloon: new ImageSource(assetUrl("images/jabloon.png")),
  // Tiles
  Geometry: new TiledResource(assetUrl("tilesets/level1.tmj"), {strict: false}),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export {Resources, ResourceLoader};
