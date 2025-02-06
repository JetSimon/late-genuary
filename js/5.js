var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DEG_30 = 1.7321;
var CUBE_SIDE = 20;
var IsoCube = /** @class */ (function () {
    function IsoCube(x, y, color) {
        this.pos = new Vector2(x, y);
        this.color = color;
        this.baseColor = color;
    }
    IsoCube.prototype.draw = function (ctx) {
        ctx.strokeStyle = "black";
        var x = this.pos.x;
        var y = this.pos.y;
        // Top - Darker
        ctx.fillStyle = "rgb(".concat(0.75 * this.color.r, " ").concat(0.75 * this.color.g, " ").concat(0.75 * this.color.b, ")");
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
        ctx.fillStyle = "rgb(".concat(this.color.r, " ").concat(this.color.g, " ").concat(this.color.b, ")");
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
        ctx.fillStyle = "rgb(".concat(this.color.r * 0.9, " ").concat(this.color.g * 0.9, " ").concat(this.color.b * 0.9, ")");
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
    };
    IsoCube.prototype.update = function (mouseX, mouseY) {
        var mouse = new Vector2(mouseX, mouseY);
        var dist = Vector2.distance(mouse, Vector2.add(this.pos, new Vector2(CUBE_SIDE * DEG_30, CUBE_SIDE)));
        var t = (1 - (dist / 150));
        this.color = RGBA.lerpColor(new RGBA(255, 255, 255, 1), this.baseColor, t);
    };
    return IsoCube;
}());
var Day5 = /** @class */ (function (_super) {
    __extends(Day5, _super);
    function Day5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Day5.prototype.init = function () {
        canvas.style.cursor = "none";
        this.cubes = [];
        for (var y = 0; y < canvas.height; y += 4 * CUBE_SIDE) {
            for (var x = canvas.width; x >= 0; x -= 2 * DEG_30 * CUBE_SIDE) {
                var col = RGBA.fromHsl(randomRange(0, 1), randomRange(0.5, 0.8), randomRange(0.4, 0.6));
                var cube = new IsoCube(x - 2.5 * CUBE_SIDE, y, col);
                this.cubes.push(cube);
            }
        }
    };
    Day5.prototype.cleanup = function () {
        this.cubes = [];
        canvas.style.cursor = "initial";
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    Day5.prototype.loop = function () {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var _i = 0, _a = this.cubes; _i < _a.length; _i++) {
            var cube = _a[_i];
            cube.draw(ctx);
            cube.update(mouseX, mouseY);
        }
    };
    return Day5;
}(Day));
var day5 = new Day5(5, ctx, "Isometric Art (No vanishing points).");
addDay(day5);
//# sourceMappingURL=5.js.map