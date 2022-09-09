import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Pen from "./Pen/Pen.js";
import Displays from "./Displays/Displays.js";
import Thumbie from "./Thumbie/Thumbie.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Pen: new Pen({
    x: 138.67649645396776,
    y: 94.08194367135508,
    direction: 90,
    costumeNumber: 2,
    size: 3000,
    visible: false,
    layerOrder: 1
  }),
  Displays: new Displays({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 14,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Thumbie: new Thumbie({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: true,
    layerOrder: 3
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
