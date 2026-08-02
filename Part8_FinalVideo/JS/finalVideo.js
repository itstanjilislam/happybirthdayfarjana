const FinalVideoScene = {

    stage: null,
    video: null,
    endButton: null,

    init() {

        this.stage = document.getElementById("final-video-stage");
        this.video = document.getElementById("final-message-video");
        this.endButton = document.getElementById("btn-the-end");

        this.video.pause();
        this.video.currentTime = 0;
        this.video.loop = false;

        gsap.set(this.stage, {
            opacity: 0,
            pointerEvents: "auto"
        });

        gsap.fromTo(
            this.stage,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.45,
                ease: "power2.out"
            }
        );

        gsap.fromTo(
            ".final-video-popup",
            {
                opacity: 0,
                y: 30,
                scale: 0.92
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                ease: "back.out(1.3)"
            }
        );

        // Stop background music
AudioManager.pauseBgMusic();

// Play the video
this.video.loop = false;
this.video.currentTime = 0;
this.video.play().catch(() => {});

// Resume music when video finishes
this.video.onended = () => {
    AudioManager.resumeBgMusic();
};

this.endButton.onclick = () => {

    this.video.pause();
    this.video.currentTime = 0;

    AudioManager.resumeBgMusic();

    window.location.reload();

};

    }

};