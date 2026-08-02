const SceneManager = {
    currentScene: 'welcome',

    goToScene(sceneName) {
        console.log(`Switching to scene: ${sceneName}`);
        
        document.querySelectorAll('.scene').forEach(scene => {
            scene.classList.remove('active');
        });
        
        const newSceneEl = document.getElementById(`scene-${sceneName}`);
        if (newSceneEl) {
            newSceneEl.classList.add('active');
            console.log(`Scene ${sceneName} is now active`);
        } else {
            console.error(`Scene ${sceneName} not found!`);
        }
        
        this.currentScene = sceneName;
    }
};