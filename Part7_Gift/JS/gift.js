const GiftScene = {
    stage: null,
    giftDrop: null,
    giftBox: null,
    closedGift: null,
    openGiftImage: null,
    instruction: null,
    note: null,
    focusBlur: null,
    balloon: null,
    balloonString: null,
    finalButton: null,
    hoverCount: 0,
    isOpened: false,
    wasInsideGift: false,

    init() {
        this.stage = document.getElementById('gift-stage');
        this.giftDrop = document.getElementById('gift-drop');
        this.giftBox = document.getElementById('gift-box');
        this.closedGift = document.getElementById('gift-closed-image');
        this.openGiftImage = document.getElementById('gift-open-image');
        this.instruction = document.getElementById('gift-instruction');
        this.note = document.getElementById('gift-note');
        this.focusBlur = document.getElementById('gift-focus-blur');
        this.balloon = this.stage.querySelector('.pink-balloon');
        this.balloonString = this.stage.querySelector('.balloon-string');
        this.finalButton = document.getElementById('go-final-part-button');

        this.hoverCount = 0;
        this.isOpened = false;
        this.wasInsideGift = false;

        gsap.set(this.stage, { opacity: 1, pointerEvents: 'auto' });
        gsap.set(this.giftDrop, { bottom: '120vh', rotation: -5 });
        gsap.set(this.closedGift, { opacity: 1, scale: 1 });
        gsap.set(this.openGiftImage, { opacity: 0, scale: 0.94 });
        gsap.set(this.instruction, { opacity: 0, y: 15 });
        gsap.set(this.focusBlur, { opacity: 0 });
        gsap.set(this.note, { opacity: 0, y: 25, scale: 0.94 });

        gsap.timeline()
            .to(this.giftDrop, {
                bottom: '14vh',
                rotation: 0,
                duration: 3.2,
                ease: 'bounce.out'
            })
            .to(this.instruction, {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'back.out(1.5)'
            });

        window.addEventListener('mousemove', (event) => {
            if (this.isOpened) return;

            const box = this.giftBox.getBoundingClientRect();

            const insideGift =
                event.clientX >= box.left &&
                event.clientX <= box.right &&
                event.clientY >= box.top &&
                event.clientY <= box.bottom;

            if (insideGift && !this.wasInsideGift) {
                this.hoverCount += 1;

                if (this.hoverCount < 3) {
                    this.instruction.textContent =
                        `Hover ${3 - this.hoverCount} more time${3 - this.hoverCount === 1 ? '' : 's'} to open the gift.`;
                } else {
                    this.openGift();
                }
            }

            this.wasInsideGift = insideGift;
        });
        this.finalButton.onclick = () => {
    FinalVideoScene.init();
};
    },

    openGift() {
        this.isOpened = true;

        gsap.timeline()
            .to(this.instruction, {
                opacity: 0,
                y: -10,
                duration: 0.25
            }, 0)

            .to([this.balloon, this.balloonString], {
                opacity: 0,
                y: -20,
                duration: 0.35,
                ease: 'power2.in'
            }, 0)

            .to(this.closedGift, {
                opacity: 0,
                scale: 0.92,
                duration: 0.4,
                ease: 'power2.inOut'
            }, 0)

            .to(this.openGiftImage, {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                ease: 'back.out(1.4)'
            }, 0.22)

            .to({}, { duration: 1 })

            .to(this.focusBlur, {
                opacity: 1,
                duration: 0.4
            })

            .to(this.note, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: 'back.out(1.5)'
            }, '-=0.15');
    }
};