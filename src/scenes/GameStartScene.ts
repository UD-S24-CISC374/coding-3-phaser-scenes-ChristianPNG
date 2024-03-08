import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class GameStartScene extends Phaser.Scene {
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private fpsText: FpsText;

    constructor() {
        super({ key: "GameStartScene" });
    }

    create() {
        this.add.image(1, 170, "menuScene");
        this.add.text(300, 200, "Main Menu", {
            fontSize: "32px",
            color: "red",
        });

        this.add
            .text(300, 300, "Start Game", { fontSize: "24px", color: "#000" })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("SpaceTravelScene");
            });

        this.add.text(16, 16, "score: " + this.registry.get("score"), {
            fontSize: "32px",
            color: "#000",
            strokeThickness: 2,
            stroke: "#000",
        });
    }
}
