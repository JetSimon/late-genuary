var day = makeDay(1, "Vertical or horizontal lines only.");
var distMod = function (dist) { return 1 + (2 * dist / 512); };
day.loop = function () {
    console.log(day.mouseX, day.mouseY);
    var ctx = day.ctx;
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
startDay(1);
//# sourceMappingURL=1.js.map