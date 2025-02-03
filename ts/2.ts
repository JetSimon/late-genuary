class Sand {
    color: RGBA;
    lifetime: number = 0;

    constructor(color: RGBA) {
        this.color = color;
    }
}

class Day2 extends Day {

    private grid: Sand[][] = [];
    private height: number = 0;
    private width: number = 0;

    private imageData: ImageData;
    private imageGrid: Uint8ClampedArray;
    private startGravity: boolean = false;
    private drain: boolean = false;
    private spawnImageHandle: number;

    constructor(day: number, ctx: CanvasRenderingContext2D, prompt: string) {
        super(day, ctx, prompt);
    }

    init() {
        this.grid = makeEmptyGrid<null | Sand>(canvas.height, canvas.width, null);
        this.height = this.grid.length;
        this.width = this.grid[0].length;
        this.imageGrid = new Uint8ClampedArray(4 * this.height * this.width);

        const image = new Image();
        image.src = "./img/me.png";
        image.onload = () => {
            const { naturalWidth: width, naturalHeight: height } = image;
            try {
                const canvas = new OffscreenCanvas(width, height);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0);
                this.imageData = ctx.getImageData(0, 0, width, height);
            }
            catch (e) {
                console.error(e);
                console.log("trying backup");

                const ctx = this.ctx;
                ctx.drawImage(image, 0, 0);
                this.imageData = ctx.getImageData(0, 0, width, height);
                ctx.clearRect(0, 0, width, height);
            }

            spawnImage();
        };

        const spawnImage = () => {
            for (let i = 0; i < this.imageData.data.length; i += 4) {
                const y = Math.floor((i / 4) / this.imageData.width);
                const x = (i / 4) % this.imageData.width;
                if (this.imageData.data[i + 3] && this.grid[y][x] == null)
                    this.grid[y][x] = new Sand(new RGBA(this.imageData.data[i], this.imageData.data[i + 1], this.imageData.data[i + 2], this.imageData.data[i + 3]));
            }

            setTimeout(() => this.startGravity = true, 250);
            this.spawnImageHandle = setTimeout(() => spawnImage(), 20000);
        };
    }

    cleanup(): void {
        clearTimeout(this.spawnImageHandle);
    }

    loop() {
        const ctx = this.ctx;

        // update grid
        const grid = this.grid;
        const newGrid = makeEmptyGrid<Sand>(this.height, this.width, null);

        this.drain = keysDown.has("d");

        if (this.startGravity) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const sand = grid[y][x];
                    const canGoRight = y + 1 < this.height && x + 1 < this.width && grid[y + 1][x + 1] == null;
                    const canGoLeft = y + 1 < this.height && x - 1 >= 0 && grid[y + 1][x - 1] == null;

                    if (sand != null) {
                        if (this.drain && y + 1 >= this.height && Math.abs(x - this.width / 2) < 100) {
                            newGrid[y][x] = null;
                        }
                        else if (y + 1 < this.height && grid[y + 1][x] == null) {
                            newGrid[y + 1][x] = sand;
                        }
                        else if (canGoRight && canGoLeft) {
                            if (Math.random() > 0.5) {
                                newGrid[y + 1][x + 1] = sand;
                            }
                            else {
                                newGrid[y + 1][x - 1] = sand;
                            }
                        }
                        else if (canGoRight) {
                            newGrid[y + 1][x + 1] = sand;
                        }
                        else if (canGoLeft) {
                            newGrid[y + 1][x - 1] = sand;
                        }
                        else {
                            newGrid[y][x] = sand;
                        }
                    }
                }
            }

            if (mouseDown) {
                newGrid[Math.round(mouseY)][Math.round(mouseX)] = new Sand(new RGBA(0, 0, 0, 255));
            }

            this.grid = newGrid;
        }

        const blank = new RGBA(0, 0, 0, 0);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const isSand = this.grid[y][x] != null;
                const color = !isSand ? blank : this.grid[y][x].color;

                const i = (y * this.width) + x;
                this.imageGrid[i * 4 + 0] = color.r;
                this.imageGrid[i * 4 + 1] = color.g;
                this.imageGrid[i * 4 + 2] = color.b;
                this.imageGrid[i * 4 + 3] = color.a;
            }
        }

        const imageData = new ImageData(this.imageGrid, this.width);
        ctx.putImageData(imageData, 0, 0);
    }
}

const day2 = new Day2(2, ctx, "Layers upon layers upon layers.\n(d to drain)");
addDay(day2);