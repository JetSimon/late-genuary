class Day3 extends Day {
    x = canvas.width * Math.random();
    y = canvas.height * Math.random();
    strokeColor = new RGBA(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
    init() {}
    cleanup() {}

    loop() {
        const ctx = this.ctx;
        this.strokeColor.r = Math.min(255, Math.max(0, this.strokeColor.r + 10 * (Math.random() - 0.5)));
        this.strokeColor.g = Math.min(255, Math.max(0, this.strokeColor.g + 10 * (Math.random() - 0.5)));
        this.strokeColor.b = Math.min(255, Math.max(0, this.strokeColor.b + 10 * (Math.random() - 0.5)));
        ctx.strokeStyle = `rgb(${this.strokeColor.r} ${this.strokeColor.g} ${this.strokeColor.b})`
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        
        this.x = canvas.width * Math.random()
        this.y = canvas.height * Math.random()
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        
        ctx.fillStyle = `rgb(${this.strokeColor.r} ${this.strokeColor.g} ${this.strokeColor.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5 * Math.random(), 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.fillStyle = `rgb(${255 - 0.10 * this.strokeColor.r} ${255 - 0.10 * this.strokeColor.g} ${255 - 0.10 * this.strokeColor.b})`;
        ctx.globalAlpha = 0.015;
        ctx.rect(0,0,canvas.width, canvas.height);
        ctx.fill();

        ctx.globalAlpha = 0.4;
        ctx.font = "18px Arial";
        ctx.fillText("fourtytwo", canvas.width * Math.random(), canvas.height * Math.random());
        ctx.globalAlpha = 1.0;
    }
}

const day3 = new Day3(3, ctx, "Exactly 42 lines of code.");
addDay(day3);