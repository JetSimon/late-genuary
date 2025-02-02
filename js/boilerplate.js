var Day = /** @class */ (function () {
    function Day(day, ctx, prompt) {
        this.prompt = prompt;
        this.day = day;
        this.ctx = ctx;
        this.mouseX = -1;
        this.mouseY = -1;
    }
    Day.prototype.start = function () {
        this.loopHandle = setInterval(this.loop, 1000 / 60);
    };
    Day.prototype.stop = function () {
        clearInterval(this.loopHandle);
    };
    Day.prototype.init = function () {
    };
    Day.prototype.loop = function () {
    };
    return Day;
}());
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var days = new Map();
var currentDay = null;
var day = new Day(0, ctx, "");
function addDay(d) {
    days.set(d.day, d);
}
function startDay(day) {
    var d = days.get(day);
    if (d == undefined) {
        alert("Cannot start day with number " + day);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentDay != null) {
        stopDay(days.get(currentDay.day).day);
    }
    document.getElementById("prompt").innerText = d.prompt;
    currentDay = d;
    d.init();
    d.start();
    console.log(d);
}
function stopDay(day) {
    var d = days.get(day);
    if (d == undefined) {
        alert("Cannot stop day with number " + day);
        return;
    }
    currentDay = null;
    d.stop();
}
canvas.addEventListener("mousemove", function (e) {
    if (currentDay == null) {
        return;
    }
    var rect = canvas.getBoundingClientRect();
    currentDay.mouseX = e.clientX - rect.left - 16;
    currentDay.mouseY = e.clientY - rect.top - 16;
});
//# sourceMappingURL=boilerplate.js.map