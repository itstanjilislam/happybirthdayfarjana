const ShareCakeScene = {
    stage: null,
    girl: null,
    boy: null,
    boyImage: null,
    girlDialogue: null,
    boyDialogue: null,
    rainWorld: null,

    init() {
        this.stage = document.getElementById('share-cake-stage');
        this.girl = document.getElementById('share-girl');
        this.boy = document.getElementById('share-boy');
        this.boyImage = document.getElementById('share-boy-image');
        this.girlDialogue = document.getElementById('girl-share-dialogue');
        this.boyDialogue = document.getElementById('boy-share-dialogue');
        this.rainWorld = document.getElementById('rain-world');

        document.body.classList.remove('cut-cake-mode');

        gsap.to(document.getElementById('candle-instruction'), {
            opacity: 0,
            duration: 0.35
        });

        gsap.set(this.stage, { opacity: 1 });
        gsap.set([this.girl, this.boy], { opacity: 0, y: 35 });
        gsap.set([this.girlDialogue, this.boyDialogue], { opacity: 0 });
        gsap.set(this.rainWorld, { opacity: 0 });

        const timeline = gsap.timeline();

        timeline
            .to(document.getElementById('big-cake'), {
                opacity: 0,
                duration: 1.4,
                ease: 'power2.inOut'
            })

            .to({}, { duration: 0.35 })

            .to([this.girl, this.boy], {
                opacity: 1,
                y: 0,
                duration: 2.3,
                stagger: 0.35,
                ease: 'power2.out'
            })

            .call(() => {
                this.showDialogue(
                    this.girlDialogue,
                    "You Know I can't eat it.. it's Fake? 😤"
                );
            })

            .to({}, { duration: 4 })

            .call(() => {
                this.boyImage.src = 'Part6_ShareCake/Assets/boy_standing.png';

                this.showDialogue(
                    this.boyDialogue,
                    'So, what should I do??? Miss Heartless… এমন না যে আমি যদি বলি বের হও কেক কাটবো তুমি বের হবা । বলবা তো পারবা না আর আমি সবাইকে এমন বলে বেরাই'
                );
            })

            .to({}, { duration: 6.5 })

            .call(() => {
                this.showDialogue(
                    this.girlDialogue,
                    'Okay then, 😒😒 At least Give me my gift…'
                );
            })

            .to({}, { duration: 4 })

            .call(() => {
                this.showDialogue(
                    this.boyDialogue,
                    'Okay Okay খেতে হবে না তোমার এই কার্টুন কেক… Your Gift is falling from the Sky… 😤'
                );
            })

            .to({}, { duration: 5.5 })

            .to(
                [
                    this.girl,
                    this.boy,
                    this.girlDialogue,
                    this.boyDialogue
                ],
                {
                    opacity: 0,
                    y: 15,
                    duration: 0.65,
                    stagger: 0.06
                }
            )

            .call(() => {
                this.formRainWorld();
            })

            .to({}, { duration: 5 })

            .call(() => {
                GiftScene.init();
            });
    },

    showDialogue(dialogueElement, text) {
        const textElement = dialogueElement.querySelector('p');

        gsap.to(dialogueElement, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                textElement.textContent = text;

                gsap.fromTo(
                    dialogueElement,
                    { opacity: 0, y: 12 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'back.out(1.5)'
                    }
                );
            }
        });
    },

    formRainWorld() {
        const cloudLayer = document.getElementById('cloud-layer');
        const grassLayer = document.getElementById('grass-layer');

        gsap.to(this.rainWorld, {
            opacity: 1,
            duration: 0.7
        });

        gsap.fromTo(
            cloudLayer,
            {
                opacity: 0,
                scale: 1.18
            },
            {
                opacity: 1,
                scale: 1,
                duration: 5,
                ease: 'power2.out'
            }
        );

        gsap.to(grassLayer, {
            opacity: 1,
            y: 0,
            duration: 5,
            ease: 'power2.out'
        });
    }
};