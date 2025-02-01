class Day {

    mouseX : number;
    mouseY : number

    ctx : CanvasRenderingContext2D;
    day : number;

    loopHandle : number;

    prompt : string;

    constructor(day : number, ctx : CanvasRenderingContext2D, prompt : string) {
        this.prompt = prompt;
        this.day = day;
        this.ctx = ctx;
        this.mouseX = -1;
        this.mouseY = -1;
    }

    start() {
        this.loopHandle = setInterval(this.loop, 1000 / 60);
    }

    stop() {
        clearInterval(this.loopHandle);
    }

    loop() {

    }
}

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const days = new Map<number, Day>();
let currentDay : null | Day = null;

function makeDay(day : number, prompt : string) : Day {
    const d = new Day(day, ctx, prompt);
    days.set(day, d);
    return d;
}

function startDay(day : number) {
    const d = days.get(day);

    if(d == undefined) {
        alert("Cannot start day with number " + day);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(currentDay != null) {
        stopDay(days.get(currentDay.day)!.day);
    }

    document.getElementById("prompt").innerText = d.prompt;

    currentDay = d;
    d.start();
}

function stopDay(day : number) {
    const d = days.get(day);

    if(d == undefined) {
        alert("Cannot stop day with number " + day);
        return;
    }

    currentDay = null;
    d.stop();
}

canvas.addEventListener("mousemove", (e : MouseEvent) => {
    if(currentDay == null) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    currentDay.mouseX = e.clientX - rect.left - 16;
    currentDay.mouseY = e.clientY - rect.top - 16;
});