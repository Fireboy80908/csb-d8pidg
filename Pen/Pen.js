/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Pen extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume3", "./Pen/costumes/costume3.png", { x: 0, y: 1 }),
      new Costume("costume1", "./Pen/costumes/costume1.svg", { x: 383, y: 236 })
    ];

    this.sounds = [new Sound("Meow", "./Pen/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Don't touch red" },
        this.whenIReceiveDontTouchRed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Don't touch red" },
        this.whenIReceiveDontTouchRed2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "level complete" },
        this.whenIReceiveLevelComplete
      )
    ];
  }

  *drawLineFromTo(x, y, z, x3, y3, z3) {
    if (!(this.stage.vars.camZ - z < 20 && this.stage.vars.camZ - z3 < 20)) {
      if (this.stage.vars.camZ - z < 20 || this.stage.vars.camZ - z3 < 20) {
        if (this.stage.vars.camZ - z < 20) {
          this.penDown = false;
          this.goto(
            0 -
              this.stage.vars.viewfactor *
                ((((this.stage.vars.camZ - z3 - 20) /
                  (this.stage.vars.camZ - z3 - (this.stage.vars.camZ - z))) *
                  (this.stage.vars.camX - x - (this.stage.vars.camX - x3)) +
                  (this.stage.vars.camX - x3)) /
                  20),
            0 -
              this.stage.vars.viewfactor *
                ((((this.stage.vars.camZ - z3 - 20) /
                  (this.stage.vars.camZ - z3 - (this.stage.vars.camZ - z))) *
                  (this.stage.vars.camY - y - (this.stage.vars.camY - y3)) +
                  (this.stage.vars.camY - y3)) /
                  20)
          );
          this.penDown = true;
          this.goto(
            0 -
              this.stage.vars.viewfactor *
                ((x3 - this.stage.vars.camX) / (z3 - this.stage.vars.camZ)),
            0 -
              this.stage.vars.viewfactor *
                ((y3 - this.stage.vars.camY) / (z3 - this.stage.vars.camZ))
          );
          this.penDown = false;
        } else {
          if (this.stage.vars.camZ - z3 < 20) {
            this.penDown = false;
            this.goto(
              0 -
                this.stage.vars.viewfactor *
                  ((x - this.stage.vars.camX) / (z - this.stage.vars.camZ)),
              0 -
                this.stage.vars.viewfactor *
                  ((y - this.stage.vars.camY) / (z - this.stage.vars.camZ))
            );
            this.penDown = true;
            this.goto(
              0 -
                this.stage.vars.viewfactor *
                  ((((this.stage.vars.camZ - z - 20) /
                    (this.stage.vars.camZ - z - (this.stage.vars.camZ - z3))) *
                    (this.stage.vars.camX - x3 - (this.stage.vars.camX - x)) +
                    (this.stage.vars.camX - x)) /
                    20),
              0 -
                this.stage.vars.viewfactor *
                  ((((this.stage.vars.camZ - z - 20) /
                    (this.stage.vars.camZ - z - (this.stage.vars.camZ - z3))) *
                    (this.stage.vars.camY - y3 - (this.stage.vars.camY - y)) +
                    (this.stage.vars.camY - y)) /
                    20)
            );
            this.penDown = false;
          }
        }
      } else {
        this.penDown = false;
        this.goto(
          0 -
            this.stage.vars.viewfactor *
              ((x - this.stage.vars.camX) / (z - this.stage.vars.camZ)),
          0 -
            this.stage.vars.viewfactor *
              ((y - this.stage.vars.camY) / (z - this.stage.vars.camZ))
        );
        this.penDown = true;
        this.goto(
          0 -
            this.stage.vars.viewfactor *
              ((x3 - this.stage.vars.camX) / (z3 - this.stage.vars.camZ)),
          0 -
            this.stage.vars.viewfactor *
              ((y3 - this.stage.vars.camY) / (z3 - this.stage.vars.camZ))
        );
        this.penDown = false;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.viewfactor = 150;
    this.costume = "costume3";
    this.size = 3000;
    this.costume = "costume1";
  }

  *whenGreenFlagClicked2() {
    this.stage.vars.level = 1;
    while (true) {
      this.clearPen();
      if (this.stage.vars.level == 1) {
        yield* this.level1();
      }
      if (this.stage.vars.level == 2) {
        yield* this.level2();
      }
      if (this.stage.vars.level == 3) {
        yield* this.level3();
      }
      if (this.stage.vars.level == 4) {
        yield* this.level4();
      }
      if (this.stage.vars.level == 5) {
        yield* this.level5();
      }
      if (this.stage.vars.level == 6) {
        yield* this.level6();
      }
      if (this.stage.vars.level == 7) {
        yield* this.level7();
      }
      if (this.stage.vars.level == 8) {
        yield* this.level8();
      }
      if (this.stage.vars.level == 9) {
        yield* this.level9();
      }
      if (this.stage.vars.level == 10) {
        yield* this.level10();
      }
      if (this.stage.vars.level == 11) {
        yield* this.level11();
      }
      yield;
    }
  }

  *renderCuboidWithOppositeCornersAndTypeSize(
    x4,
    y4,
    z4,
    x5,
    y5,
    z5,
    type,
    size
  ) {
    this.warp(this.withRotationToTypeSizeTransparency)(
      x4,
      y4,
      z4,
      x4,
      y4,
      z5,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x4,
      y4,
      z5,
      x5,
      y4,
      z5,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x5,
      y4,
      z5,
      x5,
      y4,
      z4,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x5,
      y4,
      z4,
      x4,
      y4,
      z4,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x4,
      y5,
      z4,
      x5,
      y5,
      z4,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x5,
      y5,
      z4,
      x5,
      y5,
      z5,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x5,
      y5,
      z5,
      x4,
      y5,
      z5,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x4,
      y5,
      z5,
      x4,
      y5,
      z4,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x4,
      y5,
      z4,
      x4,
      y4,
      z4,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x5,
      y5,
      z4,
      x5,
      y4,
      z4,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x5,
      y5,
      z5,
      x5,
      y4,
      z5,
      type,
      size,
      0
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      x4,
      y5,
      z5,
      x4,
      y4,
      z5,
      type,
      size,
      0
    );
  }

  *withRotationToTypeSizeTransparency(
    x6,
    y6,
    z6,
    x7,
    y7,
    z7,
    type2,
    size2,
    transparency
  ) {
    this.penSize = size2;
    if (type2 == "Ground") {
      this.penColor = Color.rgb(0, 169, 255);
    } else {
      if (type2 == "Lava") {
        this.penColor = Color.rgb(255, 0, 0);
      } else {
        if (type2 == "Destination") {
          this.penColor = Color.rgb(191, 0, 255);
        } else {
          if (type2 == "Teleport") {
            this.penColor = Color.rgb(250, 255, 0);
          }
          if (type2 == "Cube") {
            this.penColor = Color.rgb(255, 161, 0);
          }
        }
      }
    }
    this.penColor.a = 1 - transparency / 100;
    this.stage.vars.x1 = x6 - this.stage.vars.camX;
    this.stage.vars.y1 = y6 - this.stage.vars.camY;
    this.stage.vars.z1 = z6 - this.stage.vars.camZ;
    this.stage.vars.x2 = x7 - this.stage.vars.camX;
    this.stage.vars.y2 = y7 - this.stage.vars.camY;
    this.stage.vars.z2 = z7 - this.stage.vars.camZ;
    this.stage.vars.x1 =
      this.stage.vars.z1 * this.stage.vars.sinY +
      this.stage.vars.x1 * this.stage.vars.cosY;
    this.stage.vars.x2 =
      this.stage.vars.z2 * this.stage.vars.sinY +
      this.stage.vars.x2 * this.stage.vars.cosY;
    this.stage.vars.z1 =
      this.stage.vars.z1 * this.stage.vars.cosY -
      this.stage.vars.x1 * this.stage.vars.sinY;
    this.stage.vars.z2 =
      this.stage.vars.z2 * this.stage.vars.cosY -
      this.stage.vars.x2 * this.stage.vars.sinY;
    this.stage.vars.y1 =
      this.stage.vars.y1 * this.stage.vars.cosX -
      this.stage.vars.z1 * this.stage.vars.sinX;
    this.stage.vars.y2 =
      this.stage.vars.y2 * this.stage.vars.cosX -
      this.stage.vars.z2 * this.stage.vars.sinX;
    this.stage.vars.z1 =
      this.stage.vars.y1 * this.stage.vars.sinX +
      this.stage.vars.z1 * this.stage.vars.cosX;
    this.stage.vars.z2 =
      this.stage.vars.y2 * this.stage.vars.sinX +
      this.stage.vars.z2 * this.stage.vars.cosX;
    this.warp(this.drawLineFromTo)(
      this.stage.vars.x1 + this.stage.vars.camX,
      this.stage.vars.y1 + this.stage.vars.camY,
      this.stage.vars.z1 + this.stage.vars.camZ,
      this.stage.vars.x2 + this.stage.vars.camX,
      this.stage.vars.y2 + this.stage.vars.camY,
      this.stage.vars.z2 + this.stage.vars.camZ
    );
  }

  *whenGreenFlagClicked3() {
    yield* this.start();
    while (true) {
      if (this.stage.vars.controlled == 1) {
        if (
          this.keyPressed("right arrow") ||
          this.keyPressed("d") ||
          (!(Math.abs(this.mouse.x) > 239 || Math.abs(this.mouse.y) > 179) &&
            -0.75 * this.mouse.x < this.mouse.y &&
              this.mouse.y < 0.75 * this.mouse.x &&
            this.mouse.down)
        ) {
          yield* this.detect();
          this.stage.vars.degrees = 0;
          for (let i = 0; i < 18; i++) {
            yield* this.fast();
            yield;
          }
          yield* this.fast5();
          yield* this.dead();
          if (this.stage.vars.dontTouchRedFinished == 0) {
            this.stage.vars.controlled = 1;
          }
        }
      }
      if (this.stage.vars.controlled == 1) {
        if (
          this.keyPressed("left arrow") ||
          this.keyPressed("a") ||
          (!(Math.abs(this.mouse.x) > 239 || Math.abs(this.mouse.y) > 179) &&
            0.75 * this.mouse.x < this.mouse.y &&
              this.mouse.y < -0.75 * this.mouse.x &&
            this.mouse.down)
        ) {
          yield* this.detect2();
          this.stage.vars.degrees = 0;
          for (let i = 0; i < 18; i++) {
            yield* this.fast2();
            yield;
          }
          yield* this.fast5();
          yield* this.dead();
          if (this.stage.vars.dontTouchRedFinished == 0) {
            this.stage.vars.controlled = 1;
          }
        }
      }
      if (this.stage.vars.controlled == 1) {
        if (
          this.keyPressed("up arrow") ||
          this.keyPressed("w") ||
          (!(Math.abs(this.mouse.x) > 239 || Math.abs(this.mouse.y) > 179) &&
            -0.75 * this.mouse.x < this.mouse.y &&
              0.75 * this.mouse.x < this.mouse.y &&
            this.mouse.down)
        ) {
          yield* this.detect3();
          this.stage.vars.degrees = 0;
          for (let i = 0; i < 18; i++) {
            yield* this.fast3();
            yield;
          }
          yield* this.fast5();
          yield* this.dead();
          if (this.stage.vars.dontTouchRedFinished == 0) {
            this.stage.vars.controlled = 1;
          }
        }
      }
      if (this.stage.vars.controlled == 1) {
        if (
          this.keyPressed("down arrow") ||
          this.keyPressed("s") ||
          (!(Math.abs(this.mouse.x) > 239 || Math.abs(this.mouse.y) > 179) &&
            this.mouse.y < -0.75 * this.mouse.x &&
              this.mouse.y < 0.75 * this.mouse.x &&
            this.mouse.down)
        ) {
          yield* this.detect4();
          this.stage.vars.degrees = 0;
          for (let i = 0; i < 18; i++) {
            yield* this.fast4();
            yield;
          }
          yield* this.fast5();
          yield* this.dead();
          if (this.stage.vars.dontTouchRedFinished == 0) {
            this.stage.vars.controlled = 1;
          }
        }
      }
      yield;
    }
  }

  *_(_) {}

  *start() {
    this.stage.vars.controlled = 0;
    this.stage.vars.rotX = 322 + 0;
    this.stage.vars.rotY = 0 + 0;
    this.stage.vars.sinX = Math.sin(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.cosX = Math.cos(this.degToRad(this.stage.vars.rotX));
    this.stage.vars.sinY = Math.sin(this.degToRad(this.stage.vars.rotY));
    this.stage.vars.cosY = Math.cos(this.degToRad(this.stage.vars.rotY));
    this.stage.vars.cubeCoordinates = [];
    this.stage.vars.cubeCoordinatesConstant = [];
    for (let i = 0; i < 36; i++) {
      this.stage.vars.cubeCoordinates.splice(1 - 1, 0, 0);
      this.stage.vars.cubeCoordinatesConstant.splice(1 - 1, 0, 0);
    }
    this.warp(this.cubeCoordinates)();
    this.stage.vars.cubeTransparency = 0;
    this.stage.vars.dontTouchRedFinished = 0;
    this.stage.vars.camX = 500;
    this.stage.vars.camY = -400;
    this.stage.vars.camZ = 1020;
  }

  *player(transparency2) {
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 1 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 1 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 1 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 1 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 7 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 8 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 3 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 3 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 3 - 1],
      this.stage.vars.cubeCoordinates[3 * 9 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 9 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 9 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 9 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 9 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 9 - 1],
      this.stage.vars.cubeCoordinates[3 * 10 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 10 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 10 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 10 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 10 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 10 - 1],
      this.stage.vars.cubeCoordinates[3 * 4 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 4 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 4 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 4 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 4 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 4 - 1],
      this.stage.vars.cubeCoordinates[3 * 3 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 3 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 3 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 5 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 11 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 12 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 6 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 1 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 1 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 5 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 7 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 7 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 11 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 8 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 8 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 12 - 1],
      "Cube",
      4,
      transparency2
    );
    this.warp(this.withRotationToTypeSizeTransparency)(
      this.stage.vars.cubeCoordinates[3 * 2 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 2 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 1 - 1],
      this.stage.vars.cubeCoordinates[3 * 6 - 1],
      "Cube",
      4,
      transparency2
    );
  }

  *detect() {
    this.stage.vars.controlled = 0;
    this.stage.vars.index = 1;
    this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[1 - 1];
    for (let i = 0; i < 11; i++) {
      this.stage.vars.index += 1;
      if (
        this.stage.vars.cubeCoordinates[3 * this.stage.vars.index - 2 - 1] >
        this.stage.vars.rotationPosition
      ) {
        this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[
          3 * this.stage.vars.index - 2 - 1
        ];
      }
    }
    if (this.stage.vars.squares.length == 1) {
      this.stage.vars.squares.splice(
        1 - 1,
        1,
        this.stage.vars.squares[1 - 1] + 1
      );
      this.stage.vars.squares.splice(
        2 - 1,
        0,
        this.stage.vars.squares[1 - 1] + 1
      );
      this.stage.vars._1Or15 = 1.5;
    } else {
      if (
        Math.abs(
          this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
        ) == 1
      ) {
        this.stage.vars.squares.splice(
          1 - 1,
          1,
          this.stage.vars.squares[1 - 1] + 2
        );
        this.stage.vars.squares.splice(2 - 1, 1);
        this.stage.vars._1Or15 = 1.5;
      } else {
        if (
          Math.abs(
            this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
          ) == this.stage.vars.differenceBetweenRows
        ) {
          this.stage.vars.squares.splice(
            1 - 1,
            1,
            this.stage.vars.squares[1 - 1] + 1
          );
          this.stage.vars.squares.splice(
            2 - 1,
            1,
            this.stage.vars.squares[2 - 1] + 1
          );
          this.stage.vars._1Or15 = 1;
        }
      }
    }
  }

  *fast() {
    this.stage.vars.degrees += 5;
    this.stage.vars.index = 1;
    for (let i = 0; i < 12; i++) {
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 2 - 1,
        1,
        this.stage.vars.rotationPosition +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 2 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.cos(this.degToRad(0 - this.stage.vars.degrees)) -
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.sin(this.degToRad(0 - this.stage.vars.degrees)))
      );
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 0 - 1,
        1,
        200 +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 2 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.sin(this.degToRad(0 - this.stage.vars.degrees)) +
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.cos(this.degToRad(0 - this.stage.vars.degrees)))
      );
      this.stage.vars.index += 1;
    }
    this.stage.vars.camX +=
      this.stage.vars._1Or15 *
      this.stage.vars.playerShiftEachLevelPerMove[this.stage.vars.level - 1];
  }

  *fast5() {
    this.stage.vars.index2 = 1;
    for (let i = 0; i < 36; i++) {
      this.stage.vars.cubeCoordinatesConstant.splice(
        this.stage.vars.index2 - 1,
        1,
        this.stage.vars.cubeCoordinates[this.stage.vars.index2 - 1]
      );
      this.stage.vars.index2 += 1;
    }
  }

  *detect2() {
    this.stage.vars.controlled = 0;
    this.stage.vars.index = 1;
    this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[1 - 1];
    for (let i = 0; i < 11; i++) {
      this.stage.vars.index += 1;
      if (
        this.stage.vars.rotationPosition >
        this.stage.vars.cubeCoordinates[3 * this.stage.vars.index - 2 - 1]
      ) {
        this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[
          3 * this.stage.vars.index - 2 - 1
        ];
      }
    }
    if (this.stage.vars.squares.length == 1) {
      this.stage.vars.squares.splice(
        1 - 1,
        1,
        this.stage.vars.squares[1 - 1] + -2
      );
      this.stage.vars.squares.splice(
        2 - 1,
        0,
        this.stage.vars.squares[1 - 1] + 1
      );
      this.stage.vars._1Or15 = 1.5;
    } else {
      if (
        Math.abs(
          this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
        ) == 1
      ) {
        this.stage.vars.squares.splice(
          1 - 1,
          1,
          this.stage.vars.squares[1 - 1] + -1
        );
        this.stage.vars.squares.splice(2 - 1, 1);
        this.stage.vars._1Or15 = 1.5;
      } else {
        if (
          Math.abs(
            this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
          ) == this.stage.vars.differenceBetweenRows
        ) {
          this.stage.vars.squares.splice(
            1 - 1,
            1,
            this.stage.vars.squares[1 - 1] + -1
          );
          this.stage.vars.squares.splice(
            2 - 1,
            1,
            this.stage.vars.squares[2 - 1] + -1
          );
          this.stage.vars._1Or15 = 1;
        }
      }
    }
  }

  *fast2() {
    this.stage.vars.degrees += 5;
    this.stage.vars.index = 1;
    for (let i = 0; i < 12; i++) {
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 2 - 1,
        1,
        this.stage.vars.rotationPosition +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 2 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.cos(this.degToRad(this.stage.vars.degrees)) -
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.sin(this.degToRad(this.stage.vars.degrees)))
      );
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 0 - 1,
        1,
        200 +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 2 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.sin(this.degToRad(this.stage.vars.degrees)) +
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.cos(this.degToRad(this.stage.vars.degrees)))
      );
      this.stage.vars.index += 1;
    }
    this.stage.vars.camX +=
      0 -
      this.stage.vars._1Or15 *
        this.stage.vars.playerShiftEachLevelPerMove[this.stage.vars.level - 1];
  }

  *detect3() {
    this.stage.vars.controlled = 0;
    this.stage.vars.index = 1;
    this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[2 - 1];
    for (let i = 0; i < 11; i++) {
      this.stage.vars.index += 1;
      if (
        this.stage.vars.cubeCoordinates[3 * this.stage.vars.index - 1 - 1] >
        this.stage.vars.rotationPosition
      ) {
        this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[
          3 * this.stage.vars.index - 1 - 1
        ];
      }
    }
    if (this.stage.vars.squares.length == 1) {
      this.stage.vars.squares.splice(
        1 - 1,
        1,
        this.stage.vars.squares[1 - 1] + this.stage.vars.differenceBetweenRows
      );
      this.stage.vars.squares.splice(
        2 - 1,
        0,
        this.stage.vars.squares[1 - 1] + this.stage.vars.differenceBetweenRows
      );
      this.stage.vars._1Or15 = 1.5;
    } else {
      if (
        Math.abs(
          this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
        ) == 1
      ) {
        this.stage.vars.squares.splice(
          1 - 1,
          1,
          this.stage.vars.squares[1 - 1] + this.stage.vars.differenceBetweenRows
        );
        this.stage.vars.squares.splice(
          2 - 1,
          1,
          this.stage.vars.squares[2 - 1] + this.stage.vars.differenceBetweenRows
        );
        this.stage.vars._1Or15 = 1;
      } else {
        if (
          Math.abs(
            this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
          ) == this.stage.vars.differenceBetweenRows
        ) {
          this.stage.vars.squares.splice(
            1 - 1,
            1,
            this.stage.vars.squares[2 - 1] +
              this.stage.vars.differenceBetweenRows
          );
          this.stage.vars.squares.splice(2 - 1, 1);
          this.stage.vars._1Or15 = 1.5;
        }
      }
    }
  }

  *detect4() {
    this.stage.vars.controlled = 0;
    this.stage.vars.index = 1;
    this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[2 - 1];
    for (let i = 0; i < 11; i++) {
      this.stage.vars.index += 1;
      if (
        this.stage.vars.rotationPosition >
        this.stage.vars.cubeCoordinates[3 * this.stage.vars.index - 1 - 1]
      ) {
        this.stage.vars.rotationPosition = this.stage.vars.cubeCoordinates[
          3 * this.stage.vars.index - 1 - 1
        ];
      }
    }
    if (this.stage.vars.squares.length == 1) {
      this.stage.vars.squares.splice(
        1 - 1,
        1,
        this.stage.vars.squares[1 - 1] +
          -2 * this.stage.vars.differenceBetweenRows
      );
      this.stage.vars.squares.splice(
        2 - 1,
        0,
        this.stage.vars.squares[1 - 1] + this.stage.vars.differenceBetweenRows
      );
      this.stage.vars._1Or15 = 1.5;
    } else {
      if (
        Math.abs(
          this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
        ) == 1
      ) {
        this.stage.vars.squares.splice(
          1 - 1,
          1,
          this.stage.vars.squares[1 - 1] +
            (0 - this.stage.vars.differenceBetweenRows)
        );
        this.stage.vars.squares.splice(
          2 - 1,
          1,
          this.stage.vars.squares[2 - 1] +
            (0 - this.stage.vars.differenceBetweenRows)
        );
        this.stage.vars._1Or15 = 1;
      } else {
        if (
          Math.abs(
            this.stage.vars.squares[1 - 1] - this.stage.vars.squares[2 - 1]
          ) == this.stage.vars.differenceBetweenRows
        ) {
          this.stage.vars.squares.splice(
            1 - 1,
            1,
            this.stage.vars.squares[1 - 1] +
              (0 - this.stage.vars.differenceBetweenRows)
          );
          this.stage.vars.squares.splice(2 - 1, 1);
          this.stage.vars._1Or15 = 1.5;
        }
      }
    }
  }

  *fast3() {
    this.stage.vars.degrees += 5;
    this.stage.vars.index = 1;
    for (let i = 0; i < 12; i++) {
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 1 - 1,
        1,
        this.stage.vars.rotationPosition +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 1 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.cos(this.degToRad(0 - this.stage.vars.degrees)) -
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.sin(this.degToRad(0 - this.stage.vars.degrees)))
      );
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 0 - 1,
        1,
        200 +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 1 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.sin(this.degToRad(0 - this.stage.vars.degrees)) +
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.cos(this.degToRad(0 - this.stage.vars.degrees)))
      );
      this.stage.vars.index += 1;
    }
    this.stage.vars.camY +=
      this.stage.vars._1Or15 *
      this.stage.vars.playerShiftEachLevel2[this.stage.vars.level - 1];
  }

  *fast4() {
    this.stage.vars.degrees += 5;
    this.stage.vars.index = 1;
    for (let i = 0; i < 12; i++) {
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 1 - 1,
        1,
        this.stage.vars.rotationPosition +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 1 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.cos(this.degToRad(this.stage.vars.degrees)) -
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.sin(this.degToRad(this.stage.vars.degrees)))
      );
      this.stage.vars.cubeCoordinates.splice(
        3 * this.stage.vars.index - 0 - 1,
        1,
        200 +
          ((this.stage.vars.cubeCoordinatesConstant[
            3 * this.stage.vars.index - 1 - 1
          ] -
            this.stage.vars.rotationPosition) *
            Math.sin(this.degToRad(this.stage.vars.degrees)) +
            (this.stage.vars.cubeCoordinatesConstant[
              3 * this.stage.vars.index - 0 - 1
            ] -
              200) *
              Math.cos(this.degToRad(this.stage.vars.degrees)))
      );
      this.stage.vars.index += 1;
    }
    this.stage.vars.camY +=
      0 -
      this.stage.vars._1Or15 *
        this.stage.vars.playerShiftEachLevel2[this.stage.vars.level - 1];
  }

  *whenGreenFlagClicked4() {
    while (true) {
      this.stage.vars.differenceBetweenRows = this.stage.vars.differenceBetweenRowsLevels[
        this.stage.vars.level - 1
      ];
      yield;
    }
  }

  *dead() {
    if (this.stage.vars.level == 1) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level1.length
        ) {
          if (
            !(
              this.stage.vars.level1[this.stage.vars.squares[1 - 1] - 1] == 3
            ) &&
            (this.stage.vars.squares[1 - 1] % 10 == 1 ||
              this.stage.vars.squares[1 - 1] % 10 == 2 ||
              this.stage.vars.squares[1 - 1] % 10 == 9 ||
                this.stage.vars.squares[1 - 1] % 10 == 0)
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level1[this.stage.vars.squares[1 - 1] - 1] == 2) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level1[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level1.length
        ) {
          if (
            !(
              this.stage.vars.level1[this.stage.vars.squares[1 - 1] - 1] == 3
            ) &&
            (this.stage.vars.squares[1 - 1] % 10 == 1 ||
              this.stage.vars.squares[1 - 1] % 10 == 2 ||
              this.stage.vars.squares[1 - 1] % 10 == 9 ||
                this.stage.vars.squares[1 - 1] % 10 == 0)
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
            return;
          }
          if (this.stage.vars.level1[this.stage.vars.squares[1 - 1] - 1] == 2) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
            return;
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level1.length
        ) {
          if (
            !(
              this.stage.vars.level1[this.stage.vars.squares[2 - 1] - 1] == 3
            ) &&
            (this.stage.vars.squares[2 - 1] % 10 == 1 ||
              this.stage.vars.squares[2 - 1] % 10 == 2 ||
              this.stage.vars.squares[2 - 1] % 10 == 9 ||
                this.stage.vars.squares[2 - 1] % 10 == 0)
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level1[this.stage.vars.squares[2 - 1] - 1] == 2) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
            return;
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 2) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level2.length
        ) {
          if (
            this.stage.vars.level2[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level2[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level2[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level2.length
        ) {
          if (
            this.stage.vars.level2[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level2[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level2.length
        ) {
          if (
            this.stage.vars.level2[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level2[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 3) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level3.length
        ) {
          if (
            this.stage.vars.level3[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level3[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level3[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level3.length
        ) {
          if (
            this.stage.vars.level3[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level3[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level3.length
        ) {
          if (
            this.stage.vars.level3[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level3[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 4) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level4.length
        ) {
          if (
            this.stage.vars.level4[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level4[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level4[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level4.length
        ) {
          if (
            this.stage.vars.level4[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level4[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level4.length
        ) {
          if (
            this.stage.vars.level4[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level4[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 5) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level5.length
        ) {
          if (
            this.stage.vars.level5[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level5[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level5[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level5.length
        ) {
          if (
            this.stage.vars.level5[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level5[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level5.length
        ) {
          if (
            this.stage.vars.level5[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level5[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 6) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level6.length
        ) {
          if (
            this.stage.vars.level6[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level6[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level6[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level6.length
        ) {
          if (
            this.stage.vars.level6[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level6[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level6.length
        ) {
          if (
            this.stage.vars.level6[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level6[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 7) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level7.length
        ) {
          if (
            this.stage.vars.level7[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level7[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level7[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level7.length
        ) {
          if (
            this.stage.vars.level7[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level7[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level7.length
        ) {
          if (
            this.stage.vars.level7[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level7[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 8) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level8.length
        ) {
          if (
            this.stage.vars.level8[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level8[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level8[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level8.length
        ) {
          if (
            this.stage.vars.level8[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level8[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level8.length
        ) {
          if (
            this.stage.vars.level8[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level8[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 9) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level9.length
        ) {
          if (
            this.stage.vars.level9[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level9[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (this.stage.vars.level9[this.stage.vars.squares[1 - 1] - 1] == 3) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level9.length
        ) {
          if (
            this.stage.vars.level9[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level9[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level9.length
        ) {
          if (
            this.stage.vars.level9[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level9[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 10) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level10.length
        ) {
          if (
            this.stage.vars.level10[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level10[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (
            this.stage.vars.level10[this.stage.vars.squares[1 - 1] - 1] == 3
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level10.length
        ) {
          if (
            this.stage.vars.level10[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level10[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level10.length
        ) {
          if (
            this.stage.vars.level10[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level10[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
    if (this.stage.vars.level == 11) {
      if (this.stage.vars.squares.length == 1) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level11.length
        ) {
          if (
            this.stage.vars.level11[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level11[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
          if (
            this.stage.vars.level11[this.stage.vars.squares[1 - 1] - 1] == 3
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("level complete");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
      if (this.stage.vars.squares.length == 2) {
        if (
          0 < this.stage.vars.squares[1 - 1] &&
          this.stage.vars.squares[1 - 1] < this.stage.vars.level11.length
        ) {
          if (
            this.stage.vars.level11[this.stage.vars.squares[1 - 1] - 1] == 2 ||
            this.stage.vars.level11[this.stage.vars.squares[1 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
          return;
        }
        if (
          0 < this.stage.vars.squares[2 - 1] &&
          this.stage.vars.squares[2 - 1] < this.stage.vars.level11.length
        ) {
          if (
            this.stage.vars.level11[this.stage.vars.squares[2 - 1] - 1] == 2 ||
            this.stage.vars.level11[this.stage.vars.squares[2 - 1] - 1] == 0
          ) {
            this.stage.vars.dontTouchRedFinished = 1;
            this.broadcast("Don't touch red");
          }
        } else {
          this.stage.vars.dontTouchRedFinished = 1;
          this.broadcast("Don't touch red");
        }
      }
    }
  }

  *cubeCoordinates() {
    this.stage.vars.cubeCoordinates.splice(1 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(2 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(3 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(4 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(5 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(6 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(7 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(8 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(9 - 1, 1, 400);
    this.stage.vars.cubeCoordinates.splice(10 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(11 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(12 - 1, 1, 400);
    this.stage.vars.cubeCoordinates.splice(13 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(14 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(15 - 1, 1, 600);
    this.stage.vars.cubeCoordinates.splice(16 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(17 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(18 - 1, 1, 600);
    this.stage.vars.cubeCoordinates.splice(19 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(20 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(21 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(22 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(23 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(24 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(25 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(26 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(27 - 1, 1, 400);
    this.stage.vars.cubeCoordinates.splice(28 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(29 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(30 - 1, 1, 400);
    this.stage.vars.cubeCoordinates.splice(31 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(32 - 1, 1, 0);
    this.stage.vars.cubeCoordinates.splice(33 - 1, 1, 600);
    this.stage.vars.cubeCoordinates.splice(34 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(35 - 1, 1, 200);
    this.stage.vars.cubeCoordinates.splice(36 - 1, 1, 600);
    this.stage.vars.index2 = 1;
    for (let i = 0; i < 36; i++) {
      this.stage.vars.cubeCoordinatesConstant.splice(
        this.stage.vars.index2 - 1,
        1,
        this.stage.vars.cubeCoordinates[this.stage.vars.index2 - 1]
      );
      this.stage.vars.index2 += 1;
    }
    this.stage.vars.squares = [];
    this.stage.vars.squares.splice(1 - 1, 0, 3);
  }

  *whenIReceiveDontTouchRed() {
    for (let i = 0; i < 10; i++) {
      this.stage.vars.cubeTransparency += 10;
      yield;
    }
    yield* this.cubeCoordinates();
    this.stage.vars.squares.splice(
      1 - 1,
      1,
      this.stage.vars.startingSquare[this.stage.vars.level - 1]
    );
    for (let i = 0; i < 10; i++) {
      this.stage.vars.cubeTransparency += -10;
      yield;
    }
  }

  *whenIReceiveDontTouchRed2() {
    while (
      !(
        Math.round(this.stage.vars.camX) ==
          this.stage.vars.startingCoordinatesEachLevel[
            2 * this.stage.vars.level - 1 - 1
          ] &&
        Math.round(this.stage.vars.camY) ==
          this.stage.vars.startingCoordinatesEachLevel[
            2 * this.stage.vars.level - 1
          ]
      )
    ) {
      this.stage.vars.camX +=
        (this.stage.vars.startingCoordinatesEachLevel[
          2 * this.stage.vars.level - 1 - 1
        ] -
          this.stage.vars.camX) /
        4;
      this.stage.vars.camY +=
        (this.stage.vars.startingCoordinatesEachLevel[
          2 * this.stage.vars.level - 1
        ] -
          this.stage.vars.camY) /
        4;
      yield;
    }
    this.stage.vars.dontTouchRedFinished = 0;
    this.stage.vars.controlled = 1;
  }

  *whenIReceiveLevelComplete() {
    if (!(this.stage.vars.level == 11)) {
      yield* this.wait(1.5);
      while (!(this.stage.vars.camZ < 200)) {
        this.stage.vars.camZ += (190 - this.stage.vars.camZ) / 3;
        yield;
      }
      this.stage.vars.level += 1;
      this.stage.vars.camX = this.stage.vars.startingCoordinatesEachLevel[
        2 * this.stage.vars.level - 1 - 1
      ];
      this.stage.vars.camY = this.stage.vars.startingCoordinatesEachLevel[
        2 * this.stage.vars.level - 1
      ];
      yield* this.cubeCoordinates();
      this.stage.vars.squares.splice(
        1 - 1,
        1,
        this.stage.vars.startingSquare[this.stage.vars.level - 1]
      );
      while (!(this.stage.vars.camZ > 1020)) {
        this.stage.vars.camZ += (1030 - this.stage.vars.camZ) / 6;
        yield;
      }
      this.broadcast("show level sign");
      yield* this.wait(1.5);
      this.stage.vars.dontTouchRedFinished = 0;
      this.stage.vars.controlled = 1;
    }
  }

  *level1() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      1200,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      1200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      1200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      1200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      800,
      200,
      1200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1000,
      200,
      1200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1200,
      200,
      1200,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      0,
      200,
      1000,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1000,
      200,
      1200,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1000,
      200,
      1400,
      1000,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1000,
      200,
      1400,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1200,
      200,
      1400,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level2() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      1200,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      1200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      1200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      1200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      800,
      200,
      1000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      0,
      200,
      1000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      0,
      200,
      1000,
      200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1000,
      0,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      200,
      200,
      1200,
      200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      1000,
      0,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      200,
      200,
      1000,
      200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      400,
      200,
      800,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      600,
      200,
      800,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level3() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      800,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      800,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      800,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      1600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      800,
      200,
      1600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1000,
      200,
      1600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1200,
      200,
      1600,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1400,
      200,
      1600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      600,
      200,
      1000,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      600,
      200,
      1200,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      600,
      200,
      1400,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      600,
      200,
      1600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1200,
      200,
      1600,
      1400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1400,
      200,
      1400,
      1400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1400,
      200,
      1400,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1200,
      200,
      1400,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level4() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      1600,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      1600,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      1600,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      1600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      800,
      200,
      1600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1000,
      200,
      1600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1200,
      200,
      1600,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1400,
      200,
      1600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1600,
      200,
      1600,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      0,
      200,
      1000,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      0,
      200,
      1400,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      0,
      200,
      1600,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      200,
      206,
      600,
      200,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      400,
      206,
      600,
      400,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      600,
      206,
      800,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      200,
      206,
      200,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      200,
      206,
      400,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      200,
      206,
      600,
      800,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      200,
      206,
      1400,
      200,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      400,
      206,
      1400,
      400,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      600,
      206,
      1400,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      200,
      206,
      1000,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      200,
      206,
      1200,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      206,
      1400,
      600,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      1000,
      206,
      600,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      1200,
      206,
      600,
      1200,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      1400,
      206,
      600,
      1400,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      1400,
      206,
      200,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      1400,
      206,
      400,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      1400,
      206,
      600,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1400,
      206,
      1400,
      1400,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1200,
      206,
      1400,
      1200,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1000,
      206,
      1400,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1400,
      206,
      1000,
      800,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1400,
      206,
      1200,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1400,
      206,
      1400,
      1000,
      206,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      800,
      200,
      1000,
      800,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      600,
      200,
      800,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1400,
      200,
      1600,
      1400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1600,
      200,
      1600,
      1600,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1400,
      200,
      1400,
      1600,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1400,
      200,
      1600,
      1600,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level5() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      800,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      1000,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      1000,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      1000,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      800,
      200,
      2200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1000,
      200,
      1600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      600,
      200,
      2200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      400,
      200,
      2200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      200,
      2200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      200,
      200,
      1000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      800,
      200,
      1200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      200,
      1400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      200,
      200,
      1600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      200,
      200,
      1800,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      200,
      200,
      2000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      200,
      200,
      2200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      600,
      200,
      2400,
      600,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      800,
      200,
      2400,
      800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      600,
      200,
      2400,
      800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      600,
      200,
      2200,
      800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level6() {
    yield* this.withRotationToTypeSizeTransparency(
      200,
      -200,
      200,
      2200,
      -200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      2200,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      2200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      2200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      600,
      200,
      1800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      800,
      200,
      1400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1000,
      200,
      1400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      -200,
      200,
      200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      -200,
      200,
      400,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      -200,
      200,
      600,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      -200,
      200,
      800,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      200,
      200,
      1000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      400,
      200,
      1200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      400,
      200,
      1400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      -200,
      200,
      1600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      -200,
      200,
      1800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      -200,
      200,
      2000,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      -200,
      200,
      2200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      800,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      800,
      200,
      0,
      800,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1000,
      200,
      800,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      800,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      0,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      400,
      200,
      200,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      400,
      200,
      400,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      400,
      200,
      600,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      400,
      200,
      800,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      400,
      200,
      1600,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      200,
      200,
      1600,
      200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      0,
      200,
      800,
      0,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      -200,
      200,
      800,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      200,
      200,
      800,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      400,
      200,
      1000,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      400,
      200,
      1200,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      400,
      200,
      1400,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      400,
      200,
      1600,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      0,
      0,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      -200,
      200,
      0,
      -200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1000,
      200,
      2200,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      800,
      200,
      2200,
      800,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      600,
      200,
      2200,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      400,
      200,
      2200,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      600,
      200,
      1400,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      600,
      200,
      1600,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      400,
      200,
      1800,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      400,
      200,
      2000,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      400,
      200,
      2200,
      1000,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      0,
      200,
      2400,
      -200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      0,
      200,
      2200,
      -200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      0,
      200,
      2400,
      0,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      -200,
      200,
      2400,
      -200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level7() {
    yield* this.withRotationToTypeSizeTransparency(
      -200,
      0,
      200,
      200,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      -200,
      200,
      200,
      400,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      -200,
      400,
      200,
      600,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      800,
      200,
      1000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      1000,
      200,
      1200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      1200,
      200,
      1400,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1400,
      200,
      1600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1600,
      200,
      1800,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1800,
      200,
      2000,
      1800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      2000,
      200,
      2000,
      2000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      2200,
      200,
      2000,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      -200,
      0,
      200,
      -200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      200,
      200,
      400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      400,
      200,
      600,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      600,
      200,
      800,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      800,
      200,
      1000,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1000,
      200,
      1200,
      1800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1200,
      200,
      1400,
      2000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1400,
      200,
      1600,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      1600,
      200,
      1800,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      1800,
      200,
      2000,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      2200,
      200,
      2000,
      2200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      2400,
      200,
      2000,
      2400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      2400,
      200,
      1800,
      2200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      2400,
      200,
      2000,
      2200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level8() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      600,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      2200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      2200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      800,
      200,
      600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1000,
      200,
      2200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1200,
      200,
      2200,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1400,
      200,
      600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1600,
      200,
      600,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1800,
      200,
      2200,
      1800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      2000,
      200,
      2200,
      2000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      2200,
      200,
      600,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      1400,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      600,
      200,
      1400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      800,
      200,
      1400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1400,
      200,
      1400,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1600,
      200,
      1400,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      2200,
      200,
      1400,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      0,
      200,
      2200,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      600,
      200,
      2200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      800,
      200,
      2200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1400,
      200,
      2200,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1600,
      200,
      2200,
      1600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      2200,
      200,
      2200,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      0,
      200,
      1000,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      0,
      200,
      1400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      0,
      200,
      1600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      0,
      200,
      1800,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      0,
      200,
      2000,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      0,
      200,
      2200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      800,
      200,
      0,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      800,
      200,
      200,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      800,
      200,
      400,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      800,
      200,
      600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      800,
      200,
      800,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      800,
      200,
      1000,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      800,
      200,
      1200,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      800,
      200,
      1400,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      800,
      200,
      1600,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      800,
      200,
      2200,
      1400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      1600,
      200,
      0,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      1600,
      200,
      600,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      1600,
      200,
      800,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1600,
      200,
      1000,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      1600,
      200,
      1200,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      1600,
      200,
      1400,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      1600,
      200,
      1600,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      1600,
      200,
      1800,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      1600,
      200,
      2000,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      1600,
      200,
      2200,
      2200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      2000,
      200,
      2400,
      2000,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      1800,
      200,
      2400,
      1800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      1800,
      200,
      2200,
      2000,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      1800,
      200,
      2400,
      2000,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level9() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      1600,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      3000,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      1000,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      400,
      200,
      3000,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      600,
      200,
      2400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      600,
      200,
      3000,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      800,
      200,
      2400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      800,
      200,
      3000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      1000,
      200,
      2400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      0,
      200,
      1000,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      0,
      200,
      1400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      0,
      200,
      1600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      200,
      200,
      1800,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      200,
      200,
      2000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      200,
      200,
      2200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      200,
      200,
      2400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      200,
      200,
      2600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2800,
      200,
      200,
      2800,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      200,
      200,
      3000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      400,
      200,
      2200,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      600,
      200,
      2200,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      400,
      200,
      2000,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      400,
      200,
      2200,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      600,
      200,
      3000,
      800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3200,
      600,
      200,
      3200,
      800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      600,
      200,
      3200,
      600,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      800,
      200,
      3200,
      800,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level10() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      400,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      1200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      1200,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      800,
      200,
      600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      600,
      200,
      1200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      800,
      200,
      1800,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1000,
      200,
      1800,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      1200,
      200,
      1800,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      600,
      200,
      1800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      400,
      200,
      2800,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      200,
      2200,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      600,
      200,
      2800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      800,
      200,
      3000,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      1000,
      200,
      3000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      1200,
      200,
      3000,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      200,
      200,
      600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      200,
      200,
      800,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      200,
      200,
      1000,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      200,
      200,
      1200,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      200,
      1400,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      200,
      200,
      1600,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      1200,
      200,
      1800,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      200,
      200,
      1800,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      200,
      200,
      2000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      200,
      200,
      2200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      400,
      200,
      2400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      400,
      200,
      2600,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2800,
      400,
      200,
      2800,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      800,
      200,
      3000,
      1200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      800,
      200,
      2200,
      800,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      600,
      200,
      2200,
      600,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      600,
      200,
      2200,
      800,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      600,
      200,
      2400,
      800,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      1000,
      200,
      3000,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      1000,
      200,
      3200,
      1000,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3000,
      1200,
      200,
      3200,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      3200,
      1000,
      200,
      3200,
      1200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }

  *level11() {
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      800,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      200,
      200,
      800,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      400,
      200,
      2600,
      400,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      600,
      200,
      2600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      800,
      200,
      1400,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      1000,
      200,
      1400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      2000,
      0,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      200,
      200,
      2000,
      200,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      800,
      200,
      2600,
      800,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      1000,
      200,
      2600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      0,
      0,
      200,
      0,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      0,
      200,
      200,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      0,
      200,
      400,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      0,
      200,
      600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      800,
      0,
      200,
      800,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1000,
      400,
      200,
      1000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1200,
      0,
      200,
      1200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      0,
      200,
      1400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      0,
      200,
      1600,
      600,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1800,
      0,
      200,
      1800,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2000,
      0,
      200,
      2000,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2200,
      400,
      200,
      2200,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      400,
      200,
      2400,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      400,
      200,
      2600,
      1000,
      200,
      "Ground",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      200,
      200,
      600,
      200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      400,
      200,
      600,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      200,
      200,
      200,
      200,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      400,
      200,
      200,
      400,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      600,
      200,
      200,
      600,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      200,
      1600,
      200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      400,
      200,
      1600,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1400,
      200,
      200,
      1400,
      400,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      1600,
      400,
      200,
      1600,
      200,
      200,
      "Lava",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      200,
      200,
      2400,
      400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2600,
      200,
      200,
      2600,
      400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      200,
      200,
      2600,
      200,
      200,
      "Destination",
      3,
      0
    );
    yield* this.withRotationToTypeSizeTransparency(
      2400,
      400,
      200,
      2600,
      400,
      200,
      "Destination",
      3,
      0
    );
    yield* this.player(this.stage.vars.cubeTransparency);
  }
}
