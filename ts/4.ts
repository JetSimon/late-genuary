const G = 20;
const MAX_VEL = 5;

class Magnet {
    polarity : number = 0;

    acc : Vector2 = new Vector2(0,0);
    vel : Vector2 = new Vector2(0,0);
    pos : Vector2 = new Vector2(0,0);
    radius : number = 0;
    baseRadius : number = 0;
    scaleMultiplier = 0;

    constructor(polarity : number, pos : Vector2) {
        this.polarity = polarity;
        this.pos = pos;
        this.baseRadius = Math.abs(this.polarity);
        this.radius = this.baseRadius;
    }

    draw(ctx : CanvasRenderingContext2D) {
        ctx.fillStyle = this.polarity > 0 ? "white" : "black";
        ctx.strokeStyle = this.polarity > 0 ? "black" : "white"; 
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }

    collidesWith(other : Magnet) {
        const dist = Vector2.distance(this.pos, other.pos);
        return Math.pow(dist, 2) >= Math.pow((this.radius - other.radius), 2) && Math.pow(dist, 2) <= Math.pow((this.radius + other.radius), 2);
    }

    nextAcc : Vector2;
    nextVel : Vector2;
    

    update(magnets : Magnet[]) {

        if(this.scaleMultiplier < 1) {
            this.scaleMultiplier += 0.01;
            this.scaleMultiplier = clamp(this.scaleMultiplier, 0, 1)
        }
        this.radius = this.baseRadius * this.scaleMultiplier;

        this.nextAcc = this.acc.multiply(0.05); // friction
        this.nextVel = this.vel.multiply(1);

        if(this.nextVel.magnitude() > MAX_VEL) {
            this.nextVel = this.nextVel.norm().multiply(MAX_VEL);
        }

        //const center = new Vector2(canvas.width / 2, canvas.height / 2);
        //const centerForce : Vector2 = Vector2.subtract(center, this.pos).norm().multiply(1 / Math.pow(Vector2.distance(this.pos, center), 2));
        //centerForce.multiply(G);
        
        for(const other of magnets) {
            if (other == this) {
                continue;
            }

            const samePolarity = Math.sign(this.polarity) == Math.sign(other.polarity);
            const polarityMultiplier = samePolarity ? 1 : -1;

            const force : Vector2 = Vector2.subtract(this.pos, other.pos).norm().multiply(polarityMultiplier * Math.abs(this.polarity) * Math.abs(other.polarity)).multiply(1 / Math.pow(Vector2.distance(this.pos, other.pos), 2));
            force.multiply(G);

            // F = ma => a = F / m
            this.nextAcc.add(force.multiply(1 / Math.abs(this.polarity)));

            if(this.collidesWith(other)) {
                this.nextAcc.add(Vector2.subtract(this.pos, other.pos).norm().multiply(0.9 * Math.abs(other.polarity)));
                this.pos = Vector2.add(other.pos, Vector2.subtract(this.pos, other.pos).norm().multiply(other.radius + this.radius));
            }
        }

        this.nextVel.add(this.nextAcc);
    }

    applyUpdate() {
        this.acc = this.nextAcc;
        this.vel = this.nextVel;
        this.pos.add(this.vel);

        if(this.pos.x > canvas.width + this.radius) {
            this.pos.x = 0 - this.radius;
        }
        else if(this.pos.x < 0 - this.radius) {
            this.pos.x = canvas.width + this.radius;
        }

        if(this.pos.y > canvas.height + this.radius) {
            this.pos.y = 0 - this.radius;
        }
        else if(this.pos.y < 0 - this.radius) {
            this.pos.y = canvas.height + this.radius;
        }

        if(this.acc.isNaN()) {
            this.acc = new Vector2(0,0);
        }

        if(this.pos.isNaN()) {
            this.pos = new Vector2(0,0);
        }

        if(this.vel.isNaN()) {
            this.vel = new Vector2(0,0);
        }
    }
}

class Day4 extends Day {
    
    magnets : Magnet[] = [];

    addRandomMagnet() {
        function randomPos() {
            return new Vector2(Math.random() * canvas.width, Math.random() * canvas.height);
        }
        const sign = Math.random() > 0.9 ? 1 : -1;
        const polarity = (1 + Math.random() * 5) * sign;
        this.magnets.push(new Magnet(polarity, randomPos()))
    }

    init() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
        this.ctx.rect(0, 0, canvas.width, canvas.height);
        this.ctx.fill();

        this.magnets.push(new Magnet(5, new Vector2(canvas.width * 0.66, canvas.height * 0.66)))
        this.magnets.push(new Magnet(-5, new Vector2(canvas.width * 0.33, canvas.height * 0.33)))

        //this.magnets.push(new Magnet(25, new Vector2(canvas.width / 2, canvas.height / 2)));

        /*for(let i = 0; i < 50; i++) {
            const sign = Math.random() > 0.9 ? 1 : -1;
            const polarity = (1 + Math.random() * 5) * sign;
            this.magnets.push(new Magnet(polarity, randomPos()))
        }

        const toRemove = new Set();

        for(const magnet of this.magnets) {
            if (toRemove.has(magnet)) {
                continue;
            }
            for(const other of this.magnets) {
                if(other == magnet) {
                    continue;
                }
                if(magnet.collidesWith(other)) {
                    toRemove.add(other);
                }
            }
        }

        this.magnets = this.magnets.filter((x) => !toRemove.has(x));*/
    }

    cleanup() {
        this.magnets = [];
        this.ctx.fillStyle = "rgba(255, 255, 255, 1)"
        this.ctx.rect(0, 0, canvas.width, canvas.height);
        this.ctx.fill();
    }

    loop() {
       
       if(Math.random() > 0.95 && this.magnets.length < 50) {
        this.addRandomMagnet();
       }

       for(const magnet of this.magnets) {
            magnet.update(this.magnets);
       }

       this.ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
       this.ctx.rect(0, 0, canvas.width, canvas.height);
       this.ctx.fill();

       for(const magnet of this.magnets) {
            magnet.applyUpdate();
            magnet.draw(this.ctx);
       }
    }
}

const day4 = new Day4(4, ctx, "Black on black.");
addDay(day4);

startDay(4);