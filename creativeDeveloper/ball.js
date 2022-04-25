export class Ball {
    constructor(stageWidth, stageHeight, radius) {
        this.radius = radius;
        // this.vx = speed;
        // this.vy = speed;

        this.setRandomVelocity()

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * (stageWidth - diameter));
        this.y = diameter + (Math.random() * (stageHeight - diameter));
    }

    draw(ctx, stageWidth, stageHeight, block, balls, ith) {
        this.x += this.vx;
        this.y += this.vy;

        // balls.map (ball => ball.bounceBalls(ball)) // 왜 되지?
        for (let i = 0; i < balls.length; i++){
            this.bounceBalls(balls[i])
          }

        this.bounceWindow(stageWidth, stageHeight);
        this.bounceBlock(block);

        this.setRandomColor(ctx, ith)

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceBalls(otherBall) {
        if (this.isBallsCollapse(this, otherBall) == true) {
            console.log("collapsed")
            if (this.x < otherBall.x) {
                otherBall.vx *= -1;
                otherBall.x += otherBall.vx;
            } else {
                this.vx *= -1;
                this.x += this.vx;
            }
        }
    }

    //TODO: 벽에서 공이랑 부딪히면 vx가 0이 되기도 하네.
    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        }
        
        if ( this.y <= minY || this.y >= maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            const x1 = Math.abs(minX - this.x)
            const x2 = Math.abs(this.x - maxX)
            const y1 = Math.abs(minY - this.y)
            const y2 = Math.abs(minX - this.x)

            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == min1) {
                this.vx *= -1;
                this.x += this.vx;
            } else if (min == min2){
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }

    isBallsCollapse (ball1, ball2) {
        const disX = Math.abs(ball1.x - ball2.x)
        const disY = Math.abs(ball1.y - ball2.y)
        const distance = Math.sqrt(disX*disX + disY*disY)

        if (distance < ball1.radius + ball2.radius) {
            return true;
        } else {
            return false;
        }        
    }

    setRandomColor(ctx, ith) {
        const colorsSets = ["#fec194", "#ff0061", "#00ffa9", "#004dff", "#1fc9fd", "#fc0061", "#a32cdf", "#106ad2", "#ffe53b", "#ff2525", "#00c0ff", "#4218b8", "#00ffff", "#93278f", "#ff0a6c", "#4a3cdb", "#ffe53b", "#00ffff"]
        // const ith = parseInt(((Math.random() * 10000) % colorsSets.length))
        // console.log(ith)
        ctx.fillStyle = colorsSets[ith]
    }

    setRandomVelocity() {
        const fvx = parseInt(((Math.random() * 10000) % 20))
        const fvy = parseInt(((Math.random() * 10000) % 20))

        this.vx = fvx
        this.vy = fvy
    }
}