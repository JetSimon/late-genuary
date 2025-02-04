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
var G = 0.5;
var Magnet = /** @class */ (function () {
    function Magnet(polarity, pos) {
        this.polarity = 0;
        this.acc = new Vector2(0, 0);
        this.vel = new Vector2(0, 0);
        this.pos = new Vector2(0, 0);
        this.radius = 0;
        this.polarity = polarity;
        this.pos = pos;
        this.radius = Math.abs(this.polarity);
        //this.acc = new Vector2(Math.random(), Math.random());
        this.vel = new Vector2(Math.random(), Math.random());
    }
    Magnet.prototype.draw = function (ctx) {
        ctx.fillStyle = this.polarity > 0 ? "white" : "black";
        ctx.strokeStyle = this.polarity > 0 ? "black" : "white";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    };
    Magnet.prototype.collidesWith = function (other) {
        var dist = Vector2.distance(this.pos, other.pos);
        return Math.pow(dist, 2) >= Math.pow((this.radius - other.radius), 2) && Math.pow(dist, 2) <= Math.pow((this.radius + other.radius), 2);
    };
    Magnet.prototype.update = function (magnets) {
        this.nextAcc = this.acc;
        this.nextVel = this.vel;
        if (this.pos.x <= 0 || this.pos.x >= canvas.width || this.pos.y <= 0 || this.pos.y >= canvas.height) {
            this.nextVel.multiply(-1.01);
        }
        for (var _i = 0, magnets_1 = magnets; _i < magnets_1.length; _i++) {
            var other = magnets_1[_i];
            if (other == this) {
                continue;
            }
            var samePolarity = Math.sign(this.polarity) == Math.sign(other.polarity);
            var polarityMultiplier = samePolarity ? 1 : -1;
            var force = Vector2.subtract(this.pos, other.pos).multiply(polarityMultiplier * Math.abs(this.polarity) * Math.abs(other.polarity)).multiply(1 / Math.pow(Vector2.distance(this.pos, other.pos), 2));
            force.multiply(G);
            // F = ma => a = F / m
            this.nextAcc.add(force.multiply(1 / Math.abs(this.polarity)));
            if (this.collidesWith(other)) {
                this.nextVel.add(Vector2.subtract(this.pos, other.pos).norm().multiply(Math.abs(other.polarity)));
                this.pos = Vector2.add(other.pos, Vector2.subtract(this.pos, other.pos).norm().multiply(other.radius + this.radius));
            }
        }
        this.nextVel.add(this.nextAcc);
    };
    Magnet.prototype.applyUpdate = function () {
        this.acc = this.nextAcc.multiply(0.1); // Friction
        this.vel = this.nextVel;
        this.pos.add(this.vel);
        this.pos = Vector2.clamp(this.pos, new Vector2(0, 0), new Vector2(canvas.width, canvas.height));
        if (this.acc.isNaN()) {
            this.acc = new Vector2(0, 0);
        }
        if (this.pos.isNaN()) {
            this.pos = new Vector2(0, 0);
        }
        if (this.vel.isNaN()) {
            this.vel = new Vector2(0, 0);
        }
    };
    return Magnet;
}());
var Day4 = /** @class */ (function (_super) {
    __extends(Day4, _super);
    function Day4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.magnets = [];
        return _this;
    }
    Day4.prototype.init = function () {
        function randomPos() {
            return new Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
        }
        //this.magnets.push(new Magnet(25, new Vector2(canvas.width / 2, canvas.height / 2)));
        for (var i = 0; i < 50; i++) {
            var sign = Math.random() > 0.9 ? 1 : -1;
            var polarity = (1 + Math.random() * 5) * sign;
            this.magnets.push(new Magnet(polarity, randomPos()));
        }
        var toRemove = new Set();
        for (var _i = 0, _a = this.magnets; _i < _a.length; _i++) {
            var magnet = _a[_i];
            if (toRemove.has(magnet)) {
                continue;
            }
            for (var _b = 0, _c = this.magnets; _b < _c.length; _b++) {
                var other = _c[_b];
                if (other == magnet) {
                    continue;
                }
                if (magnet.collidesWith(other)) {
                    toRemove.add(other);
                }
            }
        }
        this.magnets = this.magnets.filter(function (x) { return !toRemove.has(x); });
    };
    Day4.prototype.cleanup = function () {
        this.magnets = [];
    };
    Day4.prototype.loop = function () {
        for (var _i = 0, _a = this.magnets; _i < _a.length; _i++) {
            var magnet = _a[_i];
            magnet.update(this.magnets);
        }
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
        this.ctx.rect(0, 0, canvas.width, canvas.height);
        this.ctx.fill();
        for (var _b = 0, _c = this.magnets; _b < _c.length; _b++) {
            var magnet = _c[_b];
            magnet.applyUpdate();
            magnet.draw(this.ctx);
        }
    };
    return Day4;
}(Day));
var day4 = new Day4(4, ctx, "Black on black.");
addDay(day4);
startDay(4);
//# sourceMappingURL=4.js.map