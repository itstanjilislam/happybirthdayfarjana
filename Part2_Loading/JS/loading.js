const LoadingScene = {
    init() {
        console.log("Loading Scene Initialized!");
        this.preloadAssets();
        this.animate();
    },

    preloadAssets() {
        const assetsToPreload = [
            'Part3_CakeIntro/Assets/Boy_Walking/boy_leftfoot_front.png',
            'Part3_CakeIntro/Assets/Boy_Walking/boy_rightfoot_front.png',
            'Part3_CakeIntro/Assets/Boy_Walking/boy_walking_middle_Possition.png',
            'Part3_CakeIntro/Assets/Boy_Walking/boy_standing.png',
            'Part3_CakeIntro/Assets/Boy_Walking/boy_peacking.png',
            'Part3_CakeIntro/Assets/Cake/full_cake.png',
            'Part3_CakeIntro/Assets/Cake/midle _cut_cake.png'
        ];

        assetsToPreload.forEach((src) => {
            const image = new Image();
            image.src = src;
        });
    },

    animate() {
        const countdown = document.getElementById('loading-countdown');

        const timeline = gsap.timeline({
            paused: true,
            onComplete: () => {
                SceneManager.goToScene('cake-intro');

                if (typeof CakeScene !== 'undefined') {
                    CakeScene.init();
                }
            }
        });

        timeline
            .to('.loading-title', {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out'
            })

            .to({}, { duration: 1.5 })

            .to('.glow-effect', {
                opacity: 1,
                duration: 2,
                ease: 'power2.inOut'
            }, '-=1')

            .to('.premium-text-box', {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: 'expo.out'
            }, '-=1.5')

            .to('.bengali-line:nth-child(1)', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.5')

            .to('.bengali-line:nth-child(2)', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '+=0.6')

            .to({}, { duration: 1.5 })

            .to('.loading-container, .glow-effect', {
                opacity: 0,
                duration: 1.2,
                ease: 'power2.in'
            });

        const totalDuration = timeline.duration();

        timeline.to('.ring-progress', {
            strokeDashoffset: 100,
            duration: totalDuration,
            ease: 'none'
        }, 0);

        const updateCountdown = () => {
            const remaining = Math.max(
                0,
                Math.ceil(totalDuration - timeline.time())
            );

            countdown.textContent = remaining;
        };

        timeline.eventCallback('onUpdate', updateCountdown);

        gsap.set('.ring-progress', { strokeDashoffset: 0 });

        updateCountdown();
        timeline.play();
    }
};