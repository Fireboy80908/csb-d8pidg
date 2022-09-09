/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Displays extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("level 1", "./Displays/costumes/level 1.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 2", "./Displays/costumes/level 2.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 3", "./Displays/costumes/level 3.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 4", "./Displays/costumes/level 4.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 5", "./Displays/costumes/level 5.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 6", "./Displays/costumes/level 6.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 7", "./Displays/costumes/level 7.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 8", "./Displays/costumes/level 8.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 9", "./Displays/costumes/level 9.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 10", "./Displays/costumes/level 10.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("level 11", "./Displays/costumes/level 11.svg", {
        x: 253,
        y: 185.18919000000005
      }),
      new Costume(
        "don't touch red",
        "./Displays/costumes/don't touch red.svg",
        { x: 254.50450450450444, y: 193.69369369369366 }
      ),
      new Costume("level complete", "./Displays/costumes/level complete.svg", {
        x: 250,
        y: 189.18919000000002
      }),
      new Costume("game complete", "./Displays/costumes/game complete.svg", {
        x: 360,
        y: 270
      }),
      new Costume(
        "Untitled drawing (67)",
        "./Displays/costumes/Untitled drawing (67).svg",
        { x: 360, y: 270 }
      ),
      new Costume(
        "Untitled drawing (68)",
        "./Displays/costumes/Untitled drawing (68).svg",
        { x: 480, y: 360 }
      )
    ];

    this.sounds = [new Sound("pop", "./Displays/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Don't touch red" },
        this.whenIReceiveDontTouchRed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "level complete" },
        this.whenIReceiveLevelComplete
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "show level sign" },
        this.whenIReceiveShowLevelSign
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.visible = false;
    this.costume = "level 1";
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -5;
      yield;
    }
    yield* this.wait(1);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 5;
      yield;
    }
    this.stage.vars.controlled = 1;
  }

  *whenIReceiveDontTouchRed() {
    this.costume = "don't touch red";
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -5;
      yield;
    }
    yield* this.wait(1);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 5;
      yield;
    }
  }

  *whenIReceiveLevelComplete() {
    if (this.stage.vars.level == 11) {
      this.costume = "game complete";
      this.effects.ghost = 100;
      this.visible = true;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += -5;
        yield;
      }
    } else {
      this.costume = "level complete";
      this.effects.ghost = 100;
      this.visible = true;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += -5;
        yield;
      }
      yield* this.wait(1);
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 5;
        yield;
      }
    }
  }

  *whenIReceiveShowLevelSign() {
    this.costume = this.stage.vars.level;
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -5;
      yield;
    }
    yield* this.wait(1);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 5;
      yield;
    }
  }
}
