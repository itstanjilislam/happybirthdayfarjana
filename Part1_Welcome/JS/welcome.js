const WelcomeScene = {
    init() {
        this.popup = document.getElementById('welcome-popup');
        this.btnReady = document.getElementById('btn-ready');
        this.video = document.getElementById('welcome-video');

        if (this.video) {
            this.video.loop = false;
            this.video.currentTime = 0;

            // Pause background music while the welcome video plays
            AudioManager.pauseBgMusic();

            this.video.play().catch(() => {});

            // If the user watches the whole video,
            // start the background music afterwards.
            this.video.onended = () => {
                AudioManager.resumeBgMusic();
            };
        }

        this.animatePopup();
        this.bindEvents();
    },

    animatePopup() {
        gsap.to(this.popup, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: 0.5
        });
    },

    bindEvents() {
        this.btnReady.onclick = () => {

            if (this.video) {
                this.video.pause();
                this.video.currentTime = 0;
            }

            // Resume background music after leaving the welcome screen
            AudioManager.resumeBgMusic();

            gsap.to(this.popup, {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "power2.in",
                onComplete: () => {
                    this.popup.style.display = "none";
                    SceneManager.goToScene("loading");
                    LoadingScene.init();
                }
            });
        };
    }
};