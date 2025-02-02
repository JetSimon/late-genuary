class Day1 extends Day {
    loop() {

        const distMod = (dist: number) => 1 + (2 * dist / 512);

        const ctx = this.ctx;

        const step = 8;

        const cosTime = Math.cos(Date.now() / 600);
        const sinTime = Math.sin(Date.now() / 2000);
        const tanTime = Math.tan(Date.now() / 800);

        ctx.clearRect(0, 0, 512, 512);

        for (let offset = 1; offset < step; offset += 1) {

            const fill = (((offset + Date.now() / 2) % step) / step) * 255;

            for (let y = offset; y < 512; y += step) {
                const adjustedOffset = offset;
                const dist = distMod(Math.abs(day.mouseY - y));
                ctx.strokeStyle = `rgb(${dist * ((10 * adjustedOffset + fill * cosTime) + y / 2 * cosTime)} ${dist * ((5 * adjustedOffset + fill * sinTime) + y / 2 * sinTime)} ${dist * ((adjustedOffset * fill * tanTime) + y / 2) * cosTime})`;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(512, y);
                ctx.stroke();
                ctx.closePath();
            }

            for (let x = offset; x < 512; x += step) {
                const adjustedOffset = 1;
                const dist = distMod(Math.abs(day.mouseX - x));
                ctx.strokeStyle = `rgb(${dist * ((10 * adjustedOffset + fill * cosTime) + sinTime * x / 2)} ${dist * ((5 * adjustedOffset + fill * sinTime) + x / 2 * cosTime)} ${dist * ((adjustedOffset * fill * tanTime) + x / 2 * sinTime)})`;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 512);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

const day1 = new Day1(1, ctx, "Vertical or horizontal lines only.");
addDay(day1);