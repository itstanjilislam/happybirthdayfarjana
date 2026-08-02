const CutCakeScene = {
    cakeImage: null,
    bigCake: null,
    instruction: null,
    cursor: null,
    guideline: null,
    hoverCount: 0,
    isCut: false,
    canCountHover: true,

    init() {
        this.cakeImage = document.getElementById('big-cake-image');
        this.bigCake = document.getElementById('big-cake');
        this.instruction = document.getElementById('candle-instruction');
        this.cursor = document.getElementById('magic-cursor');

        this.hoverCount = 0;
        this.isCut = false;
        this.canCountHover = true;

        document.body.classList.add('cut-cake-mode');
        this.cursor.textContent = '🔪';

        this.createGuideline();

        this.instruction.textContent =
            'Make the mouse hover over the cake 3 times to cut the cake.';

        gsap.to(this.instruction, {
            opacity: 1,
            y: 0,
            duration: 0.35
        });

        this.cakeImage.onpointerenter = () => {
            this.countCakeHover();
        };
    },

    createGuideline() {
        const oldGuideline = document.querySelector('.cut-guideline');

        if (oldGuideline) {
            oldGuideline.remove();
        }

        this.guideline = document.createElement('div');
        this.guideline.className = 'cut-guideline';
        this.bigCake.appendChild(this.guideline);

        gsap.to(this.guideline, {
            opacity: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    },

    countCakeHover() {
        if (this.isCut || !this.canCountHover) return;

        this.canCountHover = false;
        this.hoverCount += 1;

        gsap.fromTo(
            this.guideline,
            { scaleY: 0.7, opacity: 1 },
            {
                scaleY: 1.08,
                opacity: 1,
                duration: 0.22,
                yoyo: true,
                repeat: 1
            }
        );

        if (this.hoverCount < 3) {
            const remaining = 3 - this.hoverCount;

            this.instruction.textContent =
                `Hover over the cake ${remaining} more time${remaining === 1 ? '' : 's'} to cut it.`;

            setTimeout(() => {
                this.canCountHover = true;
            }, 550);

            return;
        }

        this.cutCake();
    },

    cutCake() {
        this.isCut = true;
        this.cakeImage.onpointerenter = null;

        gsap.killTweensOf(this.guideline);

        gsap.to(this.guideline, {
            opacity: 1,
            scaleY: 1.15,
            duration: 0.2,
            onComplete: () => {
                gsap.to(this.guideline, {
                    opacity: 0,
                    duration: 0.35
                });
            }
        });

        this.instruction.textContent = 'Perfect! The cake is cut.';

        this.playClappingSound();
        this.createCelebration();
        this.launchFireworks();

        setTimeout(() => {
            ShareCakeScene.init();
        }, 5500);

        // Same cake element, same position, same dimensions.
        // Only its image changes with a fade.
        gsap.to(this.cakeImage, {
            opacity: 0,
            duration: 0.35,
            onComplete: () => {
                this.cakeImage.src =
                    'Part3_CakeIntro/Assets/Cake/midle%20_cut_cake.png';

                gsap.to(this.cakeImage, {
                    opacity: 1,
                    duration: 0.65,
                    ease: 'power2.out'
                });
            }
        });
    },

    launchFireworks() {
        if (typeof Fireworks === 'undefined') return;

        for (let i = 0; i < 30; i += 1) {
            setTimeout(() => {
                Fireworks.launchRocket();
            }, i * 170);
        }
    },

    createCelebration() {
        const emojis = ['🎉', '✨', '💕', '🎊', '🍰', '🌟', '💖'];

        for (let i = 0; i < 180; i += 1) {
            const emoji = document.createElement('div');

            emoji.className = 'candle-celebration';
            emoji.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            emoji.style.left = `${Math.random() * 100}vw`;
            emoji.style.fontSize = `${18 + Math.random() * 17}px`;

            document.body.appendChild(emoji);

            gsap.to(emoji, {
                y: window.innerHeight + 100,
                x: (Math.random() - 0.5) * 180,
                rotation: Math.random() * 720,
                opacity: 0,
                duration: 2.5 + Math.random() * 2,
                delay: Math.random() * 5,
                ease: 'power1.in',
                onComplete: () => emoji.remove()
            });
        }
    },

playClappingSound() {
    AudioManager.playSound('clap');
}
};