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
var Sand = /** @class */ (function () {
    function Sand(color) {
        this.lifetime = 0;
        this.color = color;
    }
    return Sand;
}());
var Day2 = /** @class */ (function (_super) {
    __extends(Day2, _super);
    function Day2(day, ctx, prompt) {
        var _this = _super.call(this, day, ctx, prompt) || this;
        _this.grid = [];
        _this.height = 0;
        _this.width = 0;
        _this.startGravity = false;
        _this.drain = false;
        return _this;
    }
    Day2.prototype.init = function () {
        var _this = this;
        this.grid = makeEmptyGrid(canvas.height, canvas.width, null);
        this.height = this.grid.length;
        this.width = this.grid[0].length;
        this.imageGrid = new Uint8ClampedArray(4 * this.height * this.width);
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = "./img/me.png";
        image.onload = function () {
            var width = image.naturalWidth, height = image.naturalHeight;
            var canvas = new OffscreenCanvas(width, height);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            _this.imageData = ctx.getImageData(0, 0, width, height);
            spawnImage();
        };
        var spawnImage = function () {
            for (var i = 0; i < _this.imageData.data.length; i += 4) {
                var y = Math.floor((i / 4) / _this.imageData.width);
                var x = (i / 4) % _this.imageData.width;
                if (_this.imageData.data[i + 3] && _this.grid[y][x] == null)
                    _this.grid[y][x] = new Sand(new RGBA(_this.imageData.data[i], _this.imageData.data[i + 1], _this.imageData.data[i + 2], _this.imageData.data[i + 3]));
            }
            setTimeout(function () { return _this.startGravity = true; }, 250);
            _this.spawnImageHandle = setTimeout(function () { return spawnImage(); }, 20000);
        };
    };
    Day2.prototype.cleanup = function () {
        clearTimeout(this.spawnImageHandle);
    };
    Day2.prototype.loop = function () {
        var ctx = this.ctx;
        // update grid
        var grid = this.grid;
        var newGrid = makeEmptyGrid(this.height, this.width, null);
        this.drain = keysDown.has("d");
        if (this.startGravity) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var sand = grid[y][x];
                    var canGoRight = y + 1 < this.height && x + 1 < this.width && grid[y + 1][x + 1] == null;
                    var canGoLeft = y + 1 < this.height && x - 1 >= 0 && grid[y + 1][x - 1] == null;
                    if (sand != null) {
                        if (this.drain && y + 1 >= this.height && Math.abs(x - this.width / 2) < 100) {
                            newGrid[y][x] = null;
                        }
                        else if (y + 1 < this.height && grid[y + 1][x] == null) {
                            newGrid[y + 1][x] = sand;
                        }
                        else if (canGoRight && canGoLeft) {
                            if (Math.random() > 0.5) {
                                newGrid[y + 1][x + 1] = sand;
                            }
                            else {
                                newGrid[y + 1][x - 1] = sand;
                            }
                        }
                        else if (canGoRight) {
                            newGrid[y + 1][x + 1] = sand;
                        }
                        else if (canGoLeft) {
                            newGrid[y + 1][x - 1] = sand;
                        }
                        else {
                            newGrid[y][x] = sand;
                        }
                    }
                }
            }
            if (mouseDown) {
                newGrid[Math.round(mouseY)][Math.round(mouseX)] = new Sand(new RGBA(0, 0, 0, 255));
            }
            this.grid = newGrid;
        }
        var blank = new RGBA(0, 0, 0, 0);
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var isSand = this.grid[y][x] != null;
                var color = !isSand ? blank : this.grid[y][x].color;
                var i = (y * this.width) + x;
                this.imageGrid[i * 4 + 0] = color.r;
                this.imageGrid[i * 4 + 1] = color.g;
                this.imageGrid[i * 4 + 2] = color.b;
                this.imageGrid[i * 4 + 3] = color.a;
            }
        }
        var imageData = new ImageData(this.imageGrid, this.width);
        ctx.putImageData(imageData, 0, 0);
    };
    return Day2;
}(Day));
var day2 = new Day2(2, ctx, "Layers upon layers upon layers.\n(d to drain)");
addDay(day2);
startDay(2);
//# sourceMappingURL=2.js.map