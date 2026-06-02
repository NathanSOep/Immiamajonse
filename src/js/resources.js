import {ImageSource, Sound, Resource, Loader} from "excalibur";
import {TiledResource} from "@excaliburjs/plugin-tiled";

const Resources = {
  // Sprites
  //Tiles
  Level1: new TiledResource("/tilesets/level1.tmx", {strict: false}),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export {Resources, ResourceLoader};
