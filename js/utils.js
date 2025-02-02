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