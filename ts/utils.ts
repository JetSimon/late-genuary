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

class Vector2 {
    x : number;
    y : number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    static add(a : Vector2, b : Vector2) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    add(b : Vector2) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    static subtract(a : Vector2, b : Vector2) {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    subtract(b : Vector2) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }

    static multiply(a : Vector2, n : number) {
        return new Vector2(a.x * n, a.y * n);
    }

    multiply(n : number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    static elementMultiply(a : Vector2, b : Vector2) {
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    static dot(a : Vector2, b : Vector2) {
        return a.x * b.x + a.y * b.y;
    }

    magnitude() : number {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    static distance(a : Vector2, b : Vector2) {
        return Math.sqrt(Math.pow(a.x - b.x,2) + Math.pow(a.y - b.y,2));
    }

    static clamp(x : Vector2, min : Vector2, max : Vector2) {
        return new Vector2(clamp(x.x, min.x, max.x), clamp(x.y, min.y, max.y));
    }

    norm() {
        return this.multiply(1 / this.magnitude());
    }

    isNaN() {
        return isNaN(this.x) || isNaN(this.y);
    }
}

function clamp(x : number, min : number, max : number) {
    return Math.min(Math.max(x, min), max)
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