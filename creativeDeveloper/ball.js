export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * (stageWidth - diameter));
        this.y = diameter + (Math.random() * (stageHeight - diameter));
    }

    draw(ctx, stageWidth, stageHeight, fillColor, block, ball1, ball2) {
        this.x += this.vx;
        this.y += this.vy;

        if (ball1 != null) {
            this.bounceBalls(ball1);
        }
        if (ball2 != null) {
            this.bounceBalls(ball2);
        }
        this.bounceWindow(stageWidth, stageHeight);
        this.bounceBlock(block);

        // ctx.fillStyle = '#fdd700';
        ctx.fillStyle = fillColor;
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

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if ( this.y <= minY || this.y >= maxY) {
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
}