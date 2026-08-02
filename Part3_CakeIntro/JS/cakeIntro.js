const CakeScene = {
    init() {
        this.animate();
    },

    animate() {
        const boy = document.getElementById('boy-container');
        const boyImg = document.getElementById('boy-img');
        const cakeWrapper = document.getElementById('cakeWrapper');
        const bigCake = document.getElementById('big-cake');
        const peekingBoy = document.getElementById('peeking-boy-image');
        const boyDialogue = document.getElementById('boy-dialogue');
        const cakeDialogue = document.getElementById('cake-dialogue');
        const cakeDialogueText = document.getElementById('cake-dialogue-text');

        const walkFrames = [
            'Part3_CakeIntro/Assets/Boy_Walking/boy_leftfoot_front.png',
            'Part3_CakeIntro/Assets/Boy_Walking/boy_walking_middle_Possition.png',
            'Part3_CakeIntro/Assets/Boy_Walking/boy_rightfoot_front.png'
        ];

        let walkInterval;
        let frameIndex = 0;
        let bounceTween;
        let hasPlayedCakeDropSound = false;

        const showCakeDialogue = (text) => {
            gsap.to(cakeDialogue, {
                opacity: 0,
                duration: 0.25,
                onComplete: () => {
                    cakeDialogueText.textContent = text;
                    gsap.to(cakeDialogue, {
                        opacity: 1,
                        duration: 0.4
                    });
                }
            });
        };

        const startWalking = () => {
            cakeWrapper.style.opacity = '1';
            boyDialogue.style.opacity = '1';

            walkInterval = setInterval(() => {
                boyImg.src = walkFrames[frameIndex];
                frameIndex = (frameIndex + 1) % walkFrames.length;
            }, 180);

            bounceTween = gsap.to(boy, {
                y: -6,
                duration: 0.18,
                repeat: -1,
                yoyo: true
            });
        };

        const stopWalking = () => {
            clearInterval(walkInterval);

            if (bounceTween) {
                bounceTween.kill();
                gsap.set(boy, { y: 0 });
            }
        };

        const timeline = gsap.timeline();

        timeline
            .call(startWalking)

            .to(boy, {
                left: '50%',
                duration: 8,
                ease: 'none'
            })

            .call(stopWalking)

            .to({}, { duration: 0.5 })

            .to([boy, boyDialogue], {
                opacity: 0,
                duration: 0.1
            })

            .set(bigCake, { opacity: 1 })

.fromTo(
    bigCake,
    { y: -150 },
    {
        y: 0,
        duration: 1.2,
        ease: 'bounce.out',
        onUpdate: () => {
            const cakeY = Number(gsap.getProperty(bigCake, 'y'));

            if (!hasPlayedCakeDropSound && cakeY >= -0.5) {
                hasPlayedCakeDropSound = true;
                AudioManager.playSound('cakeDrop');
            }
        }
    }
)

            .call(() => showCakeDialogue("Hey! I'm okay... 😵"))
            .to({}, { duration: 3 })

            .call(() => {
                showCakeDialogue("Don't worry... I didn't get smashed by your Birthday cake");
            })
            .to({}, { duration: 3.5 })

            /* Cake remains unchanged. Only the small boy appears behind it. */
            .call(() => {
                bigCake.classList.add('boy-is-peeking');

                gsap.to(peekingBoy, {
                    opacity: 1,
                    x: 0,
                    duration: 0.45,
                    ease: 'power2.out'
                });

                showCakeDialogue("Don't Worry about me Miss Heartless, cut the cake.");
            })

            .to({}, { duration: 3.5 })

            
.call(() => {
    CandleScene.init();
});
    }
}; 