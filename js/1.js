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
var Day1 = /** @class */ (function (_super) {
    __extends(Day1, _super);
    function Day1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Day1.prototype.loop = function () {
        var distMod = function (dist) { return 1 + (2 * dist / 512); };
        var ctx = this.ctx;
        var step = 8;
        var cosTime = Math.cos(Date.now() / 600);
        var sinTime = Math.sin(Date.now() / 2000);
        var tanTime = Math.tan(Date.now() / 800);
        ctx.clearRect(0, 0, 512, 512);
        for (var offset = 1; offset < step; offset += 1) {
            var fill = (((offset + Date.now() / 2) % step) / step) * 255;
            for (var y = offset; y < 512; y += step) {
                var adjustedOffset = offset;
                var dist = distMod(Math.abs(day.mouseY - y));
                ctx.strokeStyle = "rgb(".concat(dist * ((10 * adjustedOffset + fill * cosTime) + y / 2 * cosTime), " ").concat(dist * ((5 * adjustedOffset + fill * sinTime) + y / 2 * sinTime), " ").concat(dist * ((adjustedOffset * fill * tanTime) + y / 2) * cosTime, ")");
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(512, y);
                ctx.stroke();
                ctx.closePath();
            }
            for (var x = offset; x < 512; x += step) {
                var adjustedOffset = 1;
                var dist = distMod(Math.abs(day.mouseX - x));
                ctx.strokeStyle = "rgb(".concat(dist * ((10 * adjustedOffset + fill * cosTime) + sinTime * x / 2), " ").concat(dist * ((5 * adjustedOffset + fill * sinTime) + x / 2 * cosTime), " ").concat(dist * ((adjustedOffset * fill * tanTime) + x / 2 * sinTime), ")");
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 512);
                ctx.stroke();
                ctx.closePath();
            }
        }
    };
    return Day1;
}(Day));
var day1 = new Day1(1, ctx, "Vertical or horizontal lines only.");
addDay(day1);
//# sourceMappingURL=1.js.map