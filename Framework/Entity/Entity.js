import { Vector2 } from "../Vector2.js";

export class Entity {
  constructor(
    gameSize,
    position,
    size,
    speed,
    inputHandler,
    render,
    printer,
    textPos
  ) {
    this.gameSize = gameSize;
    this.position = position;
    this.size = size;
    this.speed = speed;
    this.inputHandler = inputHandler;
    this.render = render;    
    this.printer = printer;
    this.textPos = textPos;
    this.color = "green";
    this.infoColor = "yellowgreen";
    this.angle = 0;
    this.angleRad = 0;
    this.radius = 100;
    this.direction = new Vector2(0, 0);
    this.getDirectionPolar();
  }

  update(timer) {
    this.inputHandler.handleInput(this);
    this.position.y -= timer.deltaTime * this.speed.y;
    this.#setConstraints();
  }

  #setConstraints() {
    if (this.position.y <= this.size.y / 2) {
      this.position.y = this.size.y / 2;
    }
    if (this.position.y >= this.gameSize.y - this.size.y / 2) {
      this.position.y = this.gameSize.y - this.size.y / 2;
    }
  }

  draw(ctx) {
    this.render.draw(ctx, this);
    this.#drawInfo();
  }

  #drawInfo() {
    this.printer?.print(
      `${this.name}: ${this.getInfo()[0].join(', ')}`
      , this.textPos.x, this.textPos.y, this.infoColor);
    this.printer?.print(
      `${this.name}: ${this.getInfo()[1].join(', ')}`
      , this.textPos.x, this.textPos.y + 15, this.infoColor);
  }

  getInfo() {
    return [
      [
        `position (${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)})`,
        `speed (${this.speed.x.toFixed(1)}, ${this.speed.y.toFixed(1)})`,
        `size (${this.size.x.toFixed(1)}, ${this.size.y.toFixed(1)})`,
        `angle (${this.angle})`
      ],
      [
        `angleRad (${this.angleRad})`
      ]
    ];
  }

  setAngleRad() {
    this.angleRad = this.angle * (Math.PI / 180);
  }

  getDirectionPolar() {
    this.direction.x = this.position.x + this.radius * Math.cos(this.angleRad);
    this.direction.y = this.position.y + this.radius * Math.sin(this.angleRad);
    this.logDirection();
  }

  getDirectionMatrix() {
    const r0 = new Vector2(this.direction.x - this.position.x, this.direction.y - this.position.y)
    console.log(r0);
    const x1 = r0.x;
    const y1 = r0.y;
    const cos = Math.cos(this.angleRad);
    const sin = Math.sin(this.angleRad);
    const r = new Vector2(x1 * cos - y1 * sin, x1 * sin + y1 * cos);
    this.direction.x = r.x + this.position.x;
    this.direction.y = r.y + this.position.y;
    this.logDirection();
  }

  logDirection() {
    console.log(`direction (${this.direction.x}, ${this.direction.y})`);
  }
}