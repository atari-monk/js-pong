import { Printer } from "./Printer.js";

export class BallPlayerCollisionPrinter extends Printer {
    constructor(ctx, ballPlayerCollision) {
        super(ctx);
        this.collision = ballPlayerCollision;
    }

    printInfo() {
        this.print(this.#getInfo1(), 10, 80);
        this.print(this.#getInfo2(), 10, 110);
        this.print(this.#getInfo3(), 10, 140);
        this.print(this.#getInfo4(), 10, 170);
    }

    #getInfo1() {
        var info = 'collision->';
        info += 'ballX=' + this.collision.ballX.toFixed(1);
        info += ' playerX=' + this.collision.playerX.toFixed(1);
        return info;
    }

    #getInfo2() {
        var info = 'collision->';
        info += 'ballY1=' + this.collision.ballY1.toFixed(1);
        info += ' playerY1=' + this.collision.playerY1.toFixed(1);
        return info;
    }

    #getInfo3() {
        var info = 'collision->';
        info += 'ballY2=' + this.collision.ballY2.toFixed(1);
        info += ' playerY2=' + this.collision.playerY2.toFixed(1);
        return info;
    }

    #getInfo4() {
        var info = 'collision->';
        info += 'x=' + this.collision.xCollision;
        info += ' y=' + this.collision.yCollision;
        info += ' xy=' + this.collision.xyCollision;
        return info;
    }
}