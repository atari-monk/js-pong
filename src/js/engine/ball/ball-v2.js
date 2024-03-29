import { EntityV2 } from "../entity/entity-v2.js";

export class BallV2 extends EntityV2 {
  constructor(
    gameSize,
    position,
    size,
    speed,
    inputHandler,
    renders,
    printer,
    textPos,
    wallCollision
  ) {
    super(gameSize, position, size, speed, inputHandler, renders[0], printer, textPos, wallCollision);
    this.name = 'Ball';
    this.wallCollision = wallCollision;
    this.renders = renders;
  }

  update(timer) {
    this.inputHandler?.handleInput(this);
    this.#setPosition(timer);
    this.wallCollision.calculateCollision(this);
  }

  #setPosition(timer) {
    this.position.x += timer.deltaTime * this.speed.x;
    this.position.y += timer.deltaTime * this.speed.y;
  }

  getInfo() {
    const info = super.getInfo();
    info[0][0] = info[0][0].concat(`, wall (${this.wallCollision.log})`);
    return info;
  }
}