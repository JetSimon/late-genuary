var RGBA = /** @class */ (function () {
    function RGBA(r, g, b, a) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return RGBA;
}());
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
        return this.multiply(1 / this.magnitude());
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
//# sourceMappingURL=utils.js.map