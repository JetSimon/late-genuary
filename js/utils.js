var RGBA = /** @class */ (function () {
    function RGBA(r, g, b, a) {
        if (a === void 0) { a = 1; }
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    RGBA.fromHsl = function (h, s, l) {
        var hueToRgb = function (p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        var r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hueToRgb(p, q, h + 1 / 3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1 / 3);
        }
        return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1);
    };
    RGBA.lerpColor = function (a, b, t) {
        return new RGBA(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t), lerp(a.a, b.a, t));
    };
    RGBA.prototype.toRGBString = function () {
        return "rgb(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ")");
    };
    return RGBA;
}());
function randomRange(min, max) {
    return min + (Math.random() * (max - min));
}
function lerp(a, b, t) {
    t = clamp(t, 0, 1);
    return (1 - t) * a + t * b;
}
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.add = function (a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    };
    Vector2.prototype.add = function (b) {
        this.x += b.x;
        this.y += b.y;
        return this;
    };
    Vector2.subtract = function (a, b) {
        return new Vector2(a.x - b.x, a.y - b.y);
    };
    Vector2.prototype.subtract = function (b) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    };
    Vector2.multiply = function (a, n) {
        return new Vector2(a.x * n, a.y * n);
    };
    Vector2.prototype.multiply = function (n) {
        this.x *= n;
        this.y *= n;
        return this;
    };
    Vector2.elementMultiply = function (a, b) {
        return new Vector2(a.x * b.x, a.y * b.y);
    };
    Vector2.dot = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    Vector2.prototype.magnitude = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector2.distance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };
    Vector2.clamp = function (x, min, max) {
        return new Vector2(clamp(x.x, min.x, max.x), clamp(x.y, min.y, max.y));
    };
    Vector2.prototype.norm = function () {
        var mag = this.magnitude();
        return mag == 0 ? new Vector2(0, 0) : Vector2.multiply(this, (1 / mag));
    };
    Vector2.prototype.isNaN = function () {
        return isNaN(this.x) || isNaN(this.y);
    };
    return Vector2;
}());
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
function makeEmptyGrid(height, width, defaultValue) {
    var grid = [];
    for (var y = 0; y < height; y++) {
        var row = [];
        for (var x = 0; x < width; x++) {
            row.push(defaultValue);
        }
        grid.push(row);
    }
    return grid;
}
;
function sinNow01(period) {
    if (period === void 0) { period = 1; }
    return (Math.sin(period * Date.now()) + 1) / 2;
}
function cosNow01(period) {
    if (period === void 0) { period = 1; }
    return (Math.cos(period * Date.now()) + 1) / 2;
}
//# sourceMappingURL=utils.js.map