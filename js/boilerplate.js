var Day = /** @class */ (function () {
    function Day(day, ctx, prompt) {
        this.prompt = prompt;
        this.day = day;
        this.ctx = ctx;
    }
    Day.prototype.start = function () {
        var _this = this;
        this.loopHandle = setInterval(function () { return _this.loop(); }, 1000 / 60);
    };
    Day.prototype.stop = function () {
        clearInterval(this.loopHandle);
    };
    return Day;
}());
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var days = new Map();
var currentDay = null;
var mouseX = -1;
var mouseY = -1;
var mouseDown = false;
var keysDown = new Set();
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
    var buttons = document.getElementsByClassName("day-button");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons.item(i);
        if (button instanceof HTMLButtonElement) {
            button.disabled = button.id == day.toString();
        }
    }
}
function stopDay(day) {
    var d = days.get(day);
    if (d == undefined) {
        alert("Cannot stop day with number " + day);
        return;
    }
    currentDay = null;
    d.stop();
    d.cleanup();
}
canvas.addEventListener("mousemove", function (e) {
    if (currentDay == null) {
        return;
    }
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left - 16;
    mouseY = e.clientY - rect.top - 16;
});
canvas.addEventListener("mousedown", function (e) {
    mouseDown = true;
});
canvas.addEventListener("mouseup", function (e) {
    mouseDown = false;
});
window.addEventListener("keydown", function (e) {
    keysDown.add(e.key);
});
window.addEventListener("keyup", function (e) {
    keysDown.delete(e.key);
});
//# sourceMappingURL=boilerplate.js.map