abstract class Day {

    ctx: CanvasRenderingContext2D;
    day: number;

    loopHandle: number;

    prompt: string;

    constructor(day: number, ctx: CanvasRenderingContext2D, prompt: string) {
        this.prompt = prompt;
        this.day = day;
        this.ctx = ctx;
    }

    start() {
        this.loopHandle = setInterval(() => this.loop(), 1000 / 60);
    }

    stop() {
        clearInterval(this.loopHandle);
    }

    abstract init(): void;

    abstract cleanup(): void;

    abstract loop(): void;
}

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const days = new Map<number, Day>();
let currentDay: null | Day = null;

let mouseX = -1;
let mouseY = -1;
let mouseDown = false;

const keysDown = new Set<string>();

function addDay(d: Day) {
    days.set(d.day, d);
}

function startDay(day: number) {
    const d = days.get(day);

    if (d == undefined) {
        alert("Cannot start day with number " + day);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentDay != null) {
        stopDay(days.get(currentDay.day)!.day);
    }

    document.getElementById("prompt").innerText = d.prompt;

    currentDay = d;
    d.init();
    d.start();

    const buttons = document.getElementsByClassName("day-button");
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons.item(i);
        if (button instanceof HTMLButtonElement) {
            button.disabled = button.id == day.toString();
        }
    }
}

function stopDay(day: number) {
    const d = days.get(day);

    if (d == undefined) {
        alert("Cannot stop day with number " + day);
        return;
    }

    currentDay = null;
    d.stop();
    d.cleanup();
}

canvas.addEventListener("mousemove", (e: MouseEvent) => {
    if (currentDay == null) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left - 16;
    mouseY = e.clientY - rect.top - 16;
});

canvas.addEventListener("mousedown", (e: MouseEvent) => {
    mouseDown = true;
});

canvas.addEventListener("mouseup", (e: MouseEvent) => {
    mouseDown = false;
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
    keysDown.add(e.key);
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
    keysDown.delete(e.key);
});

