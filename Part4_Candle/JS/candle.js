const CandleScene = {
    flame: null,
    instruction: null,
    cursor: null,
    scratchCount: 0,
    lastX: null,
    lastY: null,
    lastScratchTime: 0,
    flameFrame: 0,
    flameTimer: null,
    isComplete: false,

    flameFrames: [
        'Part3_CakeIntro/Assets/Candle_Flames/Flame_1.png',
        'Part3_CakeIntro/Assets/Candle_Flames/Flame_2.png',
        'Part3_CakeIntro/Assets/Candle_Flames/Flame_3.png',
        'Part3_CakeIntro/Assets/Candle_Flames/Flame_4.png'
    ],

    init() {
        this.flame = document.getElementById('magic-candle-flame');
        this.instruction = document.getElementById('candle-instruction');
        this.cursor = document.getElementById('magic-cursor');

        this.scratchCount = 0;
        this.isComplete = false;
        this.lastX = null;
        this.lastY = null;

        gsap.set(this.flame, {
            opacity: 0,
            scale: 0.6
        });

        gsap.set(this.instruction, {
            opacity: 0,
            y: -20
        });

        // Changes the existing dialogue only. Cake and boy stay fixed.
        const cakeDialogue = document.getElementById('cake-dialogue');
        const cakeDialogueText = document.getElementById('cake-dialogue-text');

        gsap.to(cakeDialogue, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
                cakeDialogueText.textContent =
                    'See the magic candle appeared just blow the candle before cutting the cake.';

                gsap.to(cakeDialogue, {
                    opacity: 1,
                    duration: 0.4
                });
            }
        });

        this.showInstruction('Blow the candle...');

        gsap.to(this.flame, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.8)',
            onComplete: () => {
                this.startFlameAnimation();

                setTimeout(() => {
                    this.showInstruction('Scratch the candle 3 times to blow it out.');
                    this.enableBlowing();
                }, 1400);
            }
        });
    },

    showInstruction(text) {
        this.instruction.textContent = text;

        gsap.to(this.instruction, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    },

    startFlameAnimation() {
        clearInterval(this.flameTimer);

        this.flameTimer = setInterval(() => {
            this.flameFrame = (this.flameFrame + 1) % this.flameFrames.length;
            this.flame.src = this.flameFrames[this.flameFrame];
        }, 130);

        gsap.to(this.flame, {
            rotation: 5,
            duration: 0.16,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    },

    enableBlowing() {
        document.body.classList.add('candle-mode');

        document.onpointermove = (event) => {
            this.cursor.style.left = `${event.clientX}px`;
            this.cursor.style.top = `${event.clientY}px`;
        };

        this.flame.onpointermove = (event) => {
            if (this.isComplete) return;

            if (this.lastX === null) {
                this.lastX = event.clientX;
                this.lastY = event.clientY;
                return;
            }

            const distance = Math.hypot(
                event.clientX - this.lastX,
                event.clientY - this.lastY
            );

            const enoughTimePassed =
                Date.now() - this.lastScratchTime > 550;

            if (distance > 28 && enoughTimePassed) {
                this.lastScratchTime = Date.now();
                this.lastX = event.clientX;
                this.lastY = event.clientY;
                this.addScratch();
            }
        };
    },

    addScratch() {
        this.scratchCount += 1;

        this.createSpark();

        gsap.fromTo(
            this.flame,
            { scaleX: 1.2, rotation: -12 },
            {
                scaleX: 0.8,
                rotation: 12,
                duration: 0.25,
                yoyo: true,
                repeat: 1
            }
        );

        if (this.scratchCount < 3) {
            this.showInstruction(
                `Scratch the candle ${3 - this.scratchCount} more time${3 - this.scratchCount === 1 ? '' : 's'} to blow it out.`
            );
            return;
        }

        this.blowOutCandle();
    },

    createSpark() {
        const flameBox = this.flame.getBoundingClientRect();
        const spark = document.createElement('div');

        spark.className = 'candle-spark';
        spark.textContent = '✨';
        spark.style.left = `${flameBox.left + flameBox.width / 2}px`;
        spark.style.top = `${flameBox.top + flameBox.height / 2}px`;

        document.body.appendChild(spark);

        gsap.to(spark, {
            x: (Math.random() - 0.5) * 80,
            y: -40 - Math.random() * 45,
            rotation: Math.random() * 180,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => spark.remove()
        });
    },

blowOutCandle() {
    this.isComplete = true;

    gsap.to(this.instruction, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: 'power2.in'
    });

    clearInterval(this.flameTimer);
    gsap.killTweensOf(this.flame);

    gsap.to(this.flame, {
        opacity: 0,
        scale: 0.2,
        x: 25,
        duration: 0.45,
        ease: 'power2.in'
    });

    this.playSuccessSound();
    this.createEmojiRain();

    if (typeof Fireworks !== 'undefined') {
        for (let i = 0; i < 30; i += 1) {
            setTimeout(() => Fireworks.launchRocket(), i * 170);
        }
    }

    gsap.to(
        [
            document.getElementById('peeking-boy-image'),
            document.getElementById('cake-dialogue')
        ],
        {
            opacity: 0,
            duration: 0.45
        }
    );

    document.body.classList.remove('candle-mode');

    setTimeout(() => {
        CutCakeScene.init();
    }, 5000);
},


   createEmojiRain() {
    const emojis = ['🎉', '✨', '💕', '🎊', '🌟'];

    for (let i = 0; i < 180; i += 1) {
        const emoji = document.createElement('div');

        emoji.className = 'candle-celebration';
        emoji.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.fontSize = `${18 + Math.random() * 16}px`;

        document.body.appendChild(emoji);

        gsap.to(emoji, {
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 150,
            rotation: Math.random() * 720,
            opacity: 0,
            duration: 1.5 + Math.random(),
            delay: Math.random() * 2.5,
            ease: 'power1.in',
            onComplete: () => emoji.remove()
        });
    }
},

playSuccessSound() {
    AudioManager.playSound('clap');
}}