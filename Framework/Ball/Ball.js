
export class Ball {

  constructor(gameSize, position, size, speed, inputHandler
    , wallCollision
    , ballRender
    , printer) {
    this.gameSize = gameSize;
    this.position = position;
    this.size = size;
    this.speed = speed;
    this.inputHandler = inputHandler;
    this.wallCollision = wallCollision;
    this.ballRender = ballRender;
    this.printer = printer;
  }

  update(timer, input) {
    this.#handleInput(input);
    this.#setPosition(timer);
    this.#setConstraints();
  }

  #handleInput(input) {
    this.inputHandler.handleInput(this);
  }

  #setPosition(timer) {
    this.position.x -= timer.deltaTime * this.speed.x;
    this.position.y -= timer.deltaTime * this.speed.y;
  }

  #setConstraints() {
    this.#setWallConstraints();
  }

  #setWallConstraints() {
    this.wallCollision.calculateCollision(this);
  }

  reverseXSpeed() {
    this.speed.x *= -1;
  }

  reverseYSpeed() {
    this.speed.y *= -1;
  }

  draw(ctx) {
    this.ballRender.draw(ctx, this);
    this.printer.printInfo(this.getInfo(), 'green', 30, 10, 30);
  }

  getInfo() {
    return ['ball:'
      , `position (${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)})`
      , `speed (${this.speed.x.toFixed(2)}, ${this.speed.y.toFixed(2)})`
      , `size (${this.size.x.toFixed(1)}, ${this.size.y.toFixed(1)})`];
  }
}