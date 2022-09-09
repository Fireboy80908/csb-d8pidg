/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbie extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Design1", "./Thumbie/costumes/Design1.svg", {
        x: 585.4052281681683,
        y: 273.7272695345345
      }),
      new Costume("Design2", "./Thumbie/costumes/Design2.svg", {
        x: 360,
        y: 270
      }),
      new Costume("Design3", "./Thumbie/costumes/Design3.svg", {
        x: 360,
        y: 270
      }),
      new Costume(
        "Untitled drawing (66)",
        "./Thumbie/costumes/Untitled drawing (66).svg",
        { x: 360, y: 270 }
      )
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
