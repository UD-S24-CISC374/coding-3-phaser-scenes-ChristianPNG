import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("sky", "assets/background2.png");
        this.load.image("gameOverBack", "assets/sky.png");
        this.load.image("menuScene", "assets/background4.png");
        this.load.image("platform", "assets/platform.png");
        this.load.image("space", "assets/background3.jpg");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("ship", "assets/ship.png", {
            frameHeight: 24,
            frameWidth: 16,
        });
    }

    create() {
        this.scene.start("SpaceTravelScene");
    }
}
