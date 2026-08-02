const ResponsiveTouchControls = {
    activeTouch: null,

    init() {
        document.addEventListener(
            'touchstart',
            (event) => this.start(event),
            { passive: false }
        );

        document.addEventListener(
            'touchmove',
            (event) => this.move(event),
            { passive: false }
        );

        document.addEventListener(
            'touchend',
            (event) => this.end(event),
            { passive: false }
        );

        document.addEventListener(
            'touchcancel',
            (event) => this.end(event),
            { passive: false }
        );

        document.addEventListener(
            'pointerover',
            (event) => {
                if (event.pointerType === 'touch') {
                    event.stopImmediatePropagation();
                }
            },
            true
        );

        document.addEventListener(
            'pointermove',
            (event) => {
                if (event.pointerType === 'touch') {
                    event.stopImmediatePropagation();
                }
            },
            true
        );
    },

    getTouch(touches, id) {
        return Array.from(touches).find(
            (touch) => touch.identifier === id
        );
    },

    isNear(touch, element, extraSpace) {
        const box = element.getBoundingClientRect();

        return (
            touch.clientX >= box.left - extraSpace &&
            touch.clientX <= box.right + extraSpace &&
            touch.clientY >= box.top - extraSpace &&
            touch.clientY <= box.bottom + extraSpace
        );
    },

    start(event) {
        const touch = event.changedTouches[0];

        const flame = document.getElementById('magic-candle-flame');
        const cake = document.getElementById('big-cake-image');
        const gift = document.getElementById('gift-box');

        /* ---------- Candle ---------- */

        if (
            typeof CandleScene !== 'undefined' &&
            flame &&
            document.body.classList.contains('candle-mode') &&
            !CandleScene.isComplete &&
            this.isNear(touch, flame, 45)
        ) {
            event.preventDefault();

            this.activeTouch = {
                type: 'candle',
                id: touch.identifier,
                startX: touch.clientX,
                startY: touch.clientY,
                scratched: false
            };

            return;
        }

        /* ---------- Cake ---------- */

        if (
            typeof CutCakeScene !== 'undefined' &&
            cake &&
            document.body.classList.contains('cut-cake-mode') &&
            !CutCakeScene.isCut &&
            this.isNear(touch, cake, 10)
        ) {
            event.preventDefault();

            this.activeTouch = {
                type: 'cake',
                id: touch.identifier,
                startX: touch.clientX,
                startY: touch.clientY,
                scratched: false
            };

            return;
        }

        /* ---------- Gift ---------- */

        if (
            typeof GiftScene !== 'undefined' &&
            gift &&
            !GiftScene.isOpened &&
            this.isNear(touch, gift, 25)
        ) {
            event.preventDefault();

            GiftScene.hoverCount++;

            if (GiftScene.hoverCount < 3) {

                GiftScene.instruction.textContent =
                    `Touch ${3 - GiftScene.hoverCount} more time${3 - GiftScene.hoverCount === 1 ? '' : 's'} to open the gift.`;

            } else {

                GiftScene.openGift();

            }
        }
    },

    move(event) {

        if (!this.activeTouch || this.activeTouch.scratched) return;

        const touch = this.getTouch(
            event.touches,
            this.activeTouch.id
        );

        if (!touch) return;

        event.preventDefault();

        const distance = Math.hypot(
            touch.clientX - this.activeTouch.startX,
            touch.clientY - this.activeTouch.startY
        );

        if (distance < 20) return;

        this.activeTouch.scratched = true;

        /* ---------- Candle ---------- */

        if (
            this.activeTouch.type === 'candle' &&
            typeof CandleScene !== 'undefined' &&
            !CandleScene.isComplete
        ) {
            CandleScene.addScratch();
        }

        /* ---------- Cake ---------- */

        if (
            this.activeTouch.type === 'cake' &&
            typeof CutCakeScene !== 'undefined' &&
            !CutCakeScene.isCut &&
            CutCakeScene.canCountHover
        ) {
            CutCakeScene.countCakeHover();

            setTimeout(() => {

                if (!CutCakeScene.isCut) {

                    const remaining = 3 - CutCakeScene.hoverCount;

                    CutCakeScene.instruction.textContent =
                        `Scratch the cake ${remaining} more time${remaining === 1 ? '' : 's'} to cut it.`;

                }

            }, 20);
        }
    },

    end(event) {

        if (!this.activeTouch) return;

        const endedIds = Array.from(event.changedTouches).map(
            (touch) => touch.identifier
        );

        if (endedIds.includes(this.activeTouch.id)) {
            this.activeTouch = null;
        }
    }
};

if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {

    const originalEnableBlowing = CandleScene.enableBlowing;

    CandleScene.enableBlowing = function () {

        originalEnableBlowing.call(this);

        this.showInstruction(
            'Touch the candle and rub your finger 3 times to blow it out.'
        );
    };

    const originalCutCakeInit = CutCakeScene.init;

    CutCakeScene.init = function () {

        originalCutCakeInit.call(this);

        this.instruction.textContent =
            'Touch the cake and scratch it 3 times to cut it.';
    };

    const originalCountCakeScratch = CutCakeScene.countCakeHover;

    CutCakeScene.countCakeHover = function () {

        const previousCount = this.hoverCount;

        originalCountCakeScratch.call(this);

        if (this.hoverCount > previousCount && !this.isCut) {

            const remaining = 3 - this.hoverCount;

            this.instruction.textContent =
                `Scratch the cake ${remaining} more time${remaining === 1 ? '' : 's'} to cut it.`;
        }
    };

    /* ---------- Gift Mobile Text ---------- */

    const originalGiftInit = GiftScene.init;

    GiftScene.init = function () {

        originalGiftInit.call(this);

        this.instruction.textContent =
            'Touch the gift box 3 times to open it.';
    };
}

ResponsiveTouchControls.init();