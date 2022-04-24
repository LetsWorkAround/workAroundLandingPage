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

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
        this.ball1 = new Ball(this.stageWidth, this.stageHeight, 40, 10);
        this.ball2 = new Ball(this.stageWidth, this.stageHeight, 20, 5);

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
        
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, "#f23400", this.block)
        this.ball1.draw(this.ctx, this.stageWidth, this.stageHeight, "#23d700", this.block, this.ball, null)
        this.ball2.draw(this.ctx, this.stageWidth, this.stageHeight, "#fd3300", this.block, this.ball1, this.ball)
    }


}

window.onload = () => {
    console.log("window.onload");
    new App();
}