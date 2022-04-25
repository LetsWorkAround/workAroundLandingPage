import {
    Ball
} from './ball.js';

import {
    Block
} from './block.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.balls = []
        
        for(let i=0; i< 10; i++) {
            const ball = new Ball(this.stageWidth, this.stageHeight, 30);
            this.balls.push(ball);
        }

        this.block = new Block(700, 30, 300, 450);

        window.requestAnimationFrame(this.animate.bind(this));
        console.log("App constructor started");
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        
        this.block.draw(this.ctx);

        let leftballs = this.balls
        for(let i=0; i< this.balls.length; i++) {
            // console.log(i + "," + leftballs.length);
            
            leftballs = leftballs.slice(1, leftballs.length);
            this.balls[i].draw(this.ctx, this.stageWidth, this.stageHeight, this.block, leftballs, i);
        }
    }
}

function addBall() {
    const ball = new Ball(this.stageWidth, this.stageHeight, 30);
    this.balls.push(ball);
}

function removeBall() {
    this.balls = this.balls.slice(0, this.balls.length);
}

window.onload = () => {
    new App();
}