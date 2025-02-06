class Day6 extends Day {

    init() {
        
    }

    cleanup() {

    }

    loop() {
        const ctx = this.ctx;
            
        const hOff = 300 * sinNow01(0.0001);

        const skyNight = new RGBA(23, 20, 54);
        const skyBlue = new RGBA(74, 205, 236);
        const skySunset = new RGBA(249, 103, 42);

        const grassBlue = new RGBA(50, 196, 62);
        const grassSunset = new RGBA(15, 50, 21);

        const t = Math.sqrt(hOff / 300)

        ctx.beginPath();
        ctx.fillStyle = (t >= 0.5 ? (RGBA.lerpColor(skySunset, skyBlue, (t - 0.5) / 0.5)) : RGBA.lerpColor(skyNight, skySunset, t / 0.5)).toRGBString();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = new RGBA(255, 239, 129).toRGBString();
        ctx.arc(canvas.width / 2, canvas.height * 0.9 - hOff, 105 + 10 * sinNow01(0.001), 0, 2 * Math.PI)
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = new RGBA(245, 219, 39).toRGBString();
        ctx.arc(canvas.width / 2, canvas.height * 0.9 - hOff, 100, 0, 2 * Math.PI)
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = RGBA.lerpColor(grassSunset, grassBlue, t).toRGBString();
        ctx.rect(0, canvas.height * 0.66, canvas.width, canvas.height / 2);
        ctx.fill();
    }
}

const day6 = new Day6(6, ctx, "Make a landscape using only primitive shapes.");
addDay(day6);

startDay(6);