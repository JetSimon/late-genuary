class RGBA {
    r: number = 0;
    g: number = 0;
    b: number = 0;
    a: number = 0;

    constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static fromHsl(h : number, s : number, l : number) : RGBA {

        const hueToRgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hueToRgb(p, q, h + 1/3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1/3);
        }

        return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1);
    }

    static lerpColor(a : RGBA, b : RGBA, t : number) {
        return new RGBA(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t), lerp(a.a, b.a, t));
    }

    toRGBString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }
}

function randomRange(min : number, max : number) {
    return min + (Math.random() * (max - min));
}

function lerp(a : number, b : number, t : number) {
    t = clamp(t, 0, 1);
    return (1 - t) * a + t * b;
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
        const mag = this.magnitude();
        return mag == 0 ? new Vector2(0,0) : Vector2.multiply(this, (1 / mag));
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

function sinNow01(period = 1) {
    return (Math.sin(period * Date.now()) + 1) / 2
}

function cosNow01(period = 1) {
    return (Math.cos(period * Date.now()) + 1) / 2
}