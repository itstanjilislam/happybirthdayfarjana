const PeekingScene = {
    start() {
        const boy = document.getElementById('peeking-boy');
        const dialogue = document.getElementById('peeking-dialogue');
        const dialogueText = document.getElementById('peeking-dialogue-text');

        // Reset everything before starting the scene
        gsap.killTweensOf([boy, dialogue]);
        gsap.set(boy, { opacity: 0, x: -20, y: 20 });
        gsap.set(dialogue, { opacity: 0, xPercent: -50, x: 20 });

        const showDialogue = (text) => {
            gsap.to(dialogue, {
                opacity: 0,
                x: -15,
                duration: 0.25,
                onComplete: () => {
                    dialogueText.textContent = text;

                    gsap.fromTo(
                        dialogue,
                        { opacity: 0, x: 20 },
                        {
                            opacity: 1,
                            x: -35,
                            duration: 0.55,
                            ease: 'power2.out'
                        }
                    );
                }
            });
        };

        const timeline = gsap.timeline();

        // Boy appears from behind the left side of the cake
        timeline.to(boy, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.55,
            ease: 'back.out(1.7)'
        });

        // First dialogue is the last dialogue from Part 3
        timeline.call(() => {
            showDialogue("Don't worry... I didn't get smashed by your Birthday cake");
        });

        timeline.to({}, { duration: 3.5 });

        // Second dialogue
        timeline.call(() => {
            showDialogue("Don't Worry about me Miss Heartless, cut the cake.");
        });

        timeline.to({}, { duration: 3.5 });

        // Boy and dialogue vanish, then candle scene begins
        timeline.to([boy, dialogue], {
            opacity: 0,
            y: 15,
            duration: 0.45,
            ease: 'power2.in'
        });

        timeline.call(() => {
            SceneManager.goToScene('candle');

            // This will run automatically once you add CandleScene later.
            if (typeof CandleScene !== 'undefined' && CandleScene.start) {
                CandleScene.start();
            }
        });
    }
};