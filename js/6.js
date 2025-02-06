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
var Day6 = /** @class */ (function (_super) {
    __extends(Day6, _super);
    function Day6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Day6.prototype.init = function () {
    };
    Day6.prototype.cleanup = function () {
    };
    Day6.prototype.loop = function () {
        var ctx = this.ctx;
        var hOff = 300 * sinNow01(0.0001);
        var skyNight = new RGBA(23, 20, 54);
        var skyBlue = new RGBA(74, 205, 236);
        var skySunset = new RGBA(249, 103, 42);
        var grassBlue = new RGBA(50, 196, 62);
        var grassSunset = new RGBA(15, 50, 21);
        var t = Math.sqrt(hOff / 300);
        ctx.beginPath();
        ctx.fillStyle = (t >= 0.5 ? (RGBA.lerpColor(skySunset, skyBlue, (t - 0.5) / 0.5)) : RGBA.lerpColor(skyNight, skySunset, t / 0.5)).toRGBString();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = new RGBA(255, 239, 129).toRGBString();
        ctx.arc(canvas.width / 2, canvas.height * 0.9 - hOff, 105 + 10 * sinNow01(0.001), 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = new RGBA(245, 219, 39).toRGBString();
        ctx.arc(canvas.width / 2, canvas.height * 0.9 - hOff, 100, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = RGBA.lerpColor(grassSunset, grassBlue, t).toRGBString();
        ctx.rect(0, canvas.height * 0.66, canvas.width, canvas.height / 2);
        ctx.fill();
    };
    return Day6;
}(Day));
var day6 = new Day6(6, ctx, "Make a landscape using only primitive shapes.");
addDay(day6);
startDay(6);
//# sourceMappingURL=6.js.map