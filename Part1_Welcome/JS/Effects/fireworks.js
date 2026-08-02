const Fireworks = {
    canvas: null,
    ctx: null,
    particles: [],
    rockets: [],

    init() {
        this.canvas = document.getElementById('fireworks-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.loop();
        
        setInterval(() => this.launchRocket(), 1500);
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    launchRocket() {
        const x = Math.random() * this.canvas.width;
        const targetY = Math.random() * (this.canvas.height * 0.5);
        this.rockets.push({
            x: x,
            y: this.canvas.height,
            targetY: targetY,
            speed: Math.random() * 5 + 8,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        });
    },

    explode(x, y, color) {
        const particleCount = 60;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2) / particleCount * i;
            const speed = Math.random() * 4 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: color,
                decay: Math.random() * 0.02 + 0.01
            });
        }
    },

    loop() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            r.y -= r.speed;
            
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = r.color;
            this.ctx.fill();

            if (r.y <= r.targetY) {
                this.explode(r.x, r.y, r.color);
                this.rockets.splice(i, 1);
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha -= p.decay;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            this.ctx.fill();

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.loop());
    }
};