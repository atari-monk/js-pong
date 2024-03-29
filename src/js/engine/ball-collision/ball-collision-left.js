
export class BallCollisionLeft {

  constructor(printer) {
    this.printer = printer;
    this.ballY1 = 0;
    this.playerY1 = 0;
    this.ballY2 = 0;
    this.playerY2 = 0;
    this.ballX = 0;
    this.playerX = 0;
    this.xCollision = false;
    this.yCollision = false;
    this.xyCollision = false;
    this.regionX = false;
    this.regionY = false;
    this.region = false;
  }

  calculateCollision(player, ball) {
    this.#prepareParams(player, ball);
    this.#isCollisionRegion(ball);
    if (this.region) {
      this.#isBallPlayerXCollision();
      this.#isBallPlayerYCollision();
      this.xyCollision = this.xCollision && this.yCollision;
      if (this.xyCollision) {
        ball.reverseXSpeed();
      }
    }
  }

  #prepareParams(player, ball) {
    this.ballX = ball.position.x - ball.size.x / 2;
    this.playerX = player.position.x + player.size.x / 2;
    this.ballY1 = ball.position.y - ball.size.x / 2;
    this.ballY2 = ball.position.y + ball.size.x / 2;
    this.playerY1 = player.position.y - (player.size.y / 2);
    this.playerY2 = player.position.y + (player.size.y / 2);
  }

  #isCollisionRegion(ball) {
    this.regionX = this.ballX >= this.playerX - ball.size.x / 2
      && this.ballX <= this.playerX + 2 * ball.size.x;
    this.regionY = (this.ballY1 >= this.playerY1 - ball.size.x
      && this.ballY1 <= this.playerY2 + ball.size.x)
      && (this.ballY2 >= this.playerY1 - ball.size.x
        && this.ballY2 <= this.playerY2 + ball.size.x);
    this.region = this.regionX && this.regionY;
  }

  #isBallPlayerXCollision() {
    this.xCollision = this.ballX <= this.playerX;
  }

  #isBallPlayerYCollision() {
    this.yCollision = ((this.playerY1 <= this.ballY1) || (this.playerY1 <= this.ballY2))
      && ((this.playerY2 >= this.ballY2) || (this.playerY2 >= this.ballY1));
  }

  draw() {
    this.printer.print(`BallColl - ${this.getInfo()[0].join(', ')}`, 5, 95, "white");
    this.printer.print(`BallColl - ${this.getInfo()[1].join(', ')}`, 5, 120, "white");
    this.printer.print(`BallColl - ${this.getInfo()[2].join(', ')}`, 5, 145, "white");
  }

  getInfo() {
    return [
      [
        `ball x ${this.ballX.toFixed(0)}, y1 ${this.ballY1.toFixed(0)}, y2 ${this.ballY2.toFixed(0)}`,
      ],
      [
        `player x ${this.playerX.toFixed(0)}, y1 ${this.playerY1.toFixed(0)}, y2 ${this.playerY2.toFixed(0)}`
      ],
      [
        `regionXY (${this.regionX}, ${this.regionY})`,
        `collXY (${this.xCollision}, ${this.yCollision})`,
        `region (${this.region})`,
        `coll (${this.xyCollision})`
      ]
    ];
  }
}