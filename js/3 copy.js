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
var Day3 = /** @class */ (function (_super) {
    __extends(Day3, _super);
    function Day3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = canvas.width * Math.random();
        _this.y = canvas.height * Math.random();
        _this.strokeColor = new RGBA(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        return _this;
    }
    Day3.prototype.init = function () { };
    Day3.prototype.cleanup = function () { };
    Day3.prototype.loop = function () {
        var ctx = this.ctx;
        this.strokeColor.r = Math.min(255, Math.max(0, this.strokeColor.r + 10 * (Math.random() - 0.5)));
        this.strokeColor.g = Math.min(255, Math.max(0, this.strokeColor.g + 10 * (Math.random() - 0.5)));
        this.strokeColor.b = Math.min(255, Math.max(0, this.strokeColor.b + 10 * (Math.random() - 0.5)));
        ctx.strokeStyle = "rgb(".concat(this.strokeColor.r, " ").concat(this.strokeColor.g, " ").concat(this.strokeColor.b, ")");
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.fillStyle = "rgb(".concat(this.strokeColor.r, " ").concat(this.strokeColor.g, " ").concat(this.strokeColor.b, ")");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5 * Math.random(), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = "rgb(".concat(255 - 0.10 * this.strokeColor.r, " ").concat(255 - 0.10 * this.strokeColor.g, " ").concat(255 - 0.10 * this.strokeColor.b, ")");
        ctx.globalAlpha = 0.015;
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.globalAlpha = 0.4;
        ctx.font = "18px Arial";
        ctx.fillText("fourtytwo", canvas.width * Math.random(), canvas.height * Math.random());
        ctx.globalAlpha = 1.0;
    };
    return Day3;
}(Day));
var day3 = new Day3(3, ctx, "Exactly 42 lines of code.");
addDay(day3);
startDay(3);
//# sourceMappingURL=3%20copy.js.map