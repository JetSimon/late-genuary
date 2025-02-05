const DEG_30 = 1.7321;
const CUBE_SIDE = 20;

class IsoCube {
    pos : Vector2;
    color : RGBA;
    baseColor : RGBA;

    constructor(x : number, y : number, color : RGBA) {
        this.pos = new Vector2(x, y);
        this.color = color;
        this.baseColor = color;
    }

    draw(ctx : CanvasRenderingContext2D) {
        ctx.strokeStyle = "black";
        let x = this.pos.x;
        let y = this.pos.y;

        // Top - Darker
        ctx.fillStyle = `rgb(${0.75 * this.color.r} ${0.75 * this.color.g} ${0.75 * this.color.b})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        x += DEG_30 * CUBE_SIDE;
        y += CUBE_SIDE;
        ctx.lineTo(x, y);
        x += DEG_30 * CUBE_SIDE;
        y -= CUBE_SIDE;
        ctx.lineTo(x, y);
        x -= DEG_30 * CUBE_SIDE;
        y -= CUBE_SIDE;
        ctx.lineTo(x, y);
        x -= DEG_30 * CUBE_SIDE;
        y += CUBE_SIDE;
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Left - Lighter
        ctx.fillStyle = `rgb(${this.color.r} ${this.color.g} ${this.color.b})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        y += 2 * CUBE_SIDE;
        ctx.lineTo(x, y);
        x += DEG_30 * CUBE_SIDE;
        y += CUBE_SIDE;
        ctx.lineTo(x, y);
        y -= 2 * CUBE_SIDE;
        ctx.lineTo(x, y);
        x -= DEG_30 * CUBE_SIDE;
        y -= CUBE_SIDE;
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Right - Normal
        ctx.fillStyle = `rgb(${this.color.r * 0.9} ${this.color.g * 0.9} ${this.color.b * 0.9})`;
        x += DEG_30 * CUBE_SIDE;
        y += CUBE_SIDE;
        ctx.beginPath();
        ctx.moveTo(x, y);
        y += 2 * CUBE_SIDE;
        ctx.moveTo(x, y);
        x += DEG_30 * CUBE_SIDE;
        y -= CUBE_SIDE;
        ctx.lineTo(x, y);
        y -= 2 * CUBE_SIDE;
        ctx.lineTo(x, y);
        x -= DEG_30 * CUBE_SIDE;
        y += CUBE_SIDE;
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update(mouseX, mouseY) {
        const mouse = new Vector2(mouseX, mouseY);
        const dist = Vector2.distance(mouse, Vector2.add(this.pos, new Vector2(CUBE_SIDE * DEG_30, CUBE_SIDE)));

        const t = (1 - (dist / 150));

        this.color = RGBA.lerpColor(new RGBA(255, 255, 255, 1), this.baseColor, t);
    }
}

class Day5 extends Day {

    cubes : IsoCube[];

    init() {
        canvas.style.cursor = "none";
        this.cubes = [];
 
        for(let y = 0; y < canvas.height; y += 4 * CUBE_SIDE) {
            for(let x = canvas.width; x >= 0; x -= 2 * DEG_30 * CUBE_SIDE) {
                const col = RGBA.fromHsl(randomRange(0, 1), randomRange(0.5, 0.8), randomRange(0.4, 0.6));
                const cube = new IsoCube(x - 2.5 * CUBE_SIDE, y, col);
                this.cubes.push(cube);
            }
        }
    }

    cleanup() {
        this.cubes = [];
        canvas.style.cursor = "initial";
        this.ctx.clearRect(0,0,canvas.width, canvas.height);
    }

    loop() {
        const ctx = this.ctx;
        ctx.clearRect(0,0,canvas.width, canvas.height);

        for(const cube of this.cubes) {
            cube.draw(ctx);
            cube.update(mouseX, mouseY);
        }
    }
}

const day5 = new Day5(5, ctx, "Isometric Art (No vanishing points).");
addDay(day5);

startDay(5);