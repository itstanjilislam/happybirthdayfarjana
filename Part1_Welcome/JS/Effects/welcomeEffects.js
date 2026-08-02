const WelcomeEffects = {
    init() {
        this.createClouds();
        this.createFallingEmojisAndSparkles();
        this.createConfettiBurst();
        this.createPoppersAndCrackers(); 
    },

    createClouds() {
        const container = document.getElementById('clouds-container');
        const cloudCount = 12;

        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            
            const width = Math.random() * 150 + 100;
            const height = width * 0.4;
            const top = Math.random() * 40; 
            const duration = Math.random() * 40 + 40; 
            const delay = Math.random() * -80; 

            gsap.set(cloud, {
                width: width + 'px',
                height: height + 'px',
                top: top + 'vh',
                left: '-200px',
                opacity: Math.random() * 0.4 + 0.4
            });

            container.appendChild(cloud);

            gsap.to(cloud, {
                left: '110vw',
                duration: duration,
                delay: delay,
                repeat: -1,
                ease: "none"
            });
        }
    },

    createFallingEmojisAndSparkles() {
        const container = document.getElementById('particles-container');
        const emojis = ['', '💕', '✨', '', '💫', ''];
        const colors = ['#ffffff', '#ff80ab', '#ffd54f', '#e1bee7', '#81d4fa'];
        const count = 90;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const isEmoji = Math.random() > 0.4;

            if (isEmoji) {
                particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                gsap.set(particle, {
                    position: 'absolute',
                    fontSize: Math.random() * 15 + 15 + 'px',
                    top: '-50px',
                    left: Math.random() * 100 + 'vw',
                    opacity: 0.9
                });
            } else {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 4 + 2;
                gsap.set(particle, {
                    position: 'absolute',
                    width: size + 'px',
                    height: size + 'px',
                    background: color,
                    borderRadius: '50%',
                    boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
                    top: '-50px',
                    left: Math.random() * 100 + 'vw',
                    opacity: 0.9
                });
            }

            container.appendChild(particle);

            gsap.to(particle, {
                top: '110vh',
                left: `+=${(Math.random() - 0.5) * 120}`,
                rotation: Math.random() * 360,
                duration: Math.random() * 4 + 4,
                repeat: -1,
                delay: Math.random() * 6,
                ease: "linear"
            });
        }
    },

    createConfettiBurst() {
        const container = document.getElementById('particles-container');
        const colors = ['#ff80ab', '#ff4081', '#f8bbd0', '#ffd54f', '#81d4fa', '#ce93d8'];
        
        const burst = (fromLeft) => {
            for (let i = 0; i < 40; i++) {
                const confetti = document.createElement('div');
                gsap.set(confetti, {
                    position: 'absolute',
                    width: Math.random() * 10 + 5 + 'px',
                    height: Math.random() * 10 + 5 + 'px',
                    background: colors[Math.floor(Math.random() * colors.length)],
                    borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    top: '50vh',
                    left: fromLeft ? '-20px' : '100vw',
                    opacity: 1
                });
                container.appendChild(confetti);

                gsap.to(confetti, {
                    x: fromLeft ? Math.random() * window.innerWidth * 0.7 : -Math.random() * window.innerWidth * 0.7,
                    y: (Math.random() - 0.5) * window.innerHeight * 0.6,
                    rotation: Math.random() * 720,
                    opacity: 0,
                    duration: Math.random() * 3 + 2,
                    ease: "power2.out",
                    onComplete: () => confetti.remove()
                });
            }
        };

        burst(true);
        burst(false);
        
        setInterval(() => {
            burst(true);
            burst(false);
        }, 4000);
    },

    createPoppersAndCrackers() {
        const container = document.getElementById('particles-container');
        const colors = ['#ffd54f', '#ff80ab', '#ffffff', '#81d4fa'];
        
        const shootPopper = (isLeft) => {
            const popper = document.createElement('div');
            const popperColor = colors[Math.floor(Math.random() * colors.length)];
            
            gsap.set(popper, {
                position: 'absolute',
                width: '15px',
                height: '15px',
                background: popperColor,
                borderRadius: '50%',
                boxShadow: `0 0 20px ${popperColor}, 0 0 40px ${popperColor}`,
                bottom: '0',
                left: isLeft ? '10vw' : '90vw',
                opacity: 1
            });
            container.appendChild(popper);

            gsap.to(popper, {
                y: -window.innerHeight * 0.8,
                x: isLeft ? 100 : -100,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => popper.remove()
            });

            for(let i=0; i<20; i++) {
                const cracker = document.createElement('div');
                const crackerColor = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 6 + 3;

                gsap.set(cracker, {
                    position: 'absolute',
                    width: size + 'px',
                    height: size + 'px',
                    background: crackerColor,
                    borderRadius: '50%',
                    boxShadow: `0 0 10px ${crackerColor}`,
                    bottom: '0',
                    left: isLeft ? '10vw' : '90vw',
                    opacity: 1
                });
                container.appendChild(cracker);
                
                gsap.to(cracker, {
                    x: (Math.random() - 0.5) * 250 + (isLeft ? 100 : -100),
                    y: -Math.random() * window.innerHeight * 0.7,
                    opacity: 0,
                    duration: Math.random() * 1.5 + 0.5,
                    ease: "power2.out",
                    onComplete: () => cracker.remove()
                });
            }
        };

        shootPopper(true);
        shootPopper(false);

        setInterval(() => {
            shootPopper(Math.random() > 0.5);
        }, 3000);
    }
};