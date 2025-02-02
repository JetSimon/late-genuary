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
var Day2 = /** @class */ (function (_super) {
    __extends(Day2, _super);
    function Day2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grid = [];
        return _this;
    }
    Day2.prototype.init = function () {
        this.grid = [];
        for (var y = 0; y < canvas.height; y++) {
            var row = [];
            for (var x = 0; x < canvas.width; x++) {
                row.push(y == 0 ? 1 : 0);
            }
            this.grid.push(row);
        }
    };
    Day2.prototype.loop = function () {
        var ctx = this.ctx;
    };
    return Day2;
}(Day));
var day2 = new Day2(2, ctx, "Layers upon layers upon layers.");
addDay(day2);
startDay(2);
//# sourceMappingURL=2.js.map