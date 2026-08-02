const AudioManager = {
    bgMusic: null,
    sounds: {},
    isMuted: false,

    init() {
        /* ---------- Background Music ---------- */
        this.bgMusic = new Howl({
            src: ['Audio/bg_birthday_theme.mp3'],
            loop: true,
            volume: 0.25,
           autoplay: true
        });

        /* ---------- Cake Drop ---------- */
        this.sounds.cakeDrop = new Howl({
            src: ['Audio/cake_drop.wav'],
            volume: 0.65,
            html5: true
        });

        /* ---------- Clap ---------- */
        this.sounds.clap = new Howl({
            src: ['Part4_Candle/clap.mp3'],
            volume: 0.80,
            html5: true
        });

        /* ---------- Mute Button ---------- */
        const muteBtn = document.getElementById('btn-mute');

        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                this.isMuted = !this.isMuted;

                if (this.bgMusic) {
                    this.bgMusic.mute(this.isMuted);
                }

                muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
            });
        }

        this.playBgMusic();
    },

    /* =======================================
       BACKGROUND MUSIC
    ======================================= */

    playBgMusic() {
        if (
            this.bgMusic &&
            !this.isMuted &&
            !this.bgMusic.playing()
        ) {
            this.bgMusic.play();
        }
    },

pauseBgMusic() {
    if (this.bgMusic) {
        this.bgMusic.mute(true);
    }
},

resumeBgMusic() {
    if (this.bgMusic) {
        this.bgMusic.mute(this.isMuted);
    }
},

    stopBgMusic() {
        if (this.bgMusic) {
            this.bgMusic.stop();
        }
    },

    /* =======================================
       SOUND EFFECTS
    ======================================= */

    playSound(soundName) {
        const sound = this.sounds[soundName];

        if (!sound) return;

        sound.stop();
        sound.play();
    },

    stopSound(soundName) {
        const sound = this.sounds[soundName];

        if (!sound) return;

        sound.stop();
    },

    /* =======================================
       VOLUME
    ======================================= */

    setBgVolume(volume) {
        if (!this.bgMusic) return;

        this.bgMusic.volume(
            Math.max(0, Math.min(1, volume))
        );
    },

    setSoundVolume(soundName, volume) {
        const sound = this.sounds[soundName];

        if (!sound) return;

        sound.volume(
            Math.max(0, Math.min(1, volume))
        );
    },

    /* =======================================
       VIDEO HELPERS
    ======================================= */

    pauseForVideo(video) {
        this.pauseBgMusic();

        if (video) {
            video.pause();
            video.currentTime = 0;
            video.loop = false;
        }
    },

    playVideo(video) {
        this.pauseBgMusic();

        if (!video) return;

        video.loop = false;
        video.currentTime = 0;

        video.play().catch(() => {});

        video.onended = () => {
            this.resumeBgMusic();
        };
    },

    stopVideo(video) {
        if (!video) return;

        video.pause();
        video.currentTime = 0;

        this.resumeBgMusic();
    }
};