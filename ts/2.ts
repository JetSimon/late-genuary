class Day2 extends Day {

    grid : number[][] = [];

    init() {
        this.grid = [];

        for(let y = 0; y < canvas.height; y++) {
            const row : number[] = [];
            for(let x = 0; x < canvas.width; x++) {
                row.push(y == 0 ? 1 : 0);
            }
            this.grid.push(row);
        }
    }

    loop() {
        const ctx = this.ctx;


    }
}

const day2 = new Day2(2, ctx, "Layers upon layers upon layers.")
addDay(day2);

startDay(2);