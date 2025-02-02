class RGBA {
    r: number = 0;
    g: number = 0;
    b: number = 0;
    a: number = 0;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

function makeEmptyGrid<T>(height: number, width: number, defaultValue: T) {
    const grid: T[][] = [];
    for (let y = 0; y < height; y++) {
        const row: T[] = [];
        for (let x = 0; x < width; x++) {
            row.push(defaultValue);
        }
        grid.push(row);
    }
    return grid;
};