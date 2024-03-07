import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class GameOverScene extends Phaser.Scene {
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private fpsText: FpsText;

    constructor() {
        super({ key: "GameOverScene" });
    }

    create() {
        this.add.image(400, 300, "gameOverBack");
        this.add.text(300, 200, "Game Over", {
            fontSize: "32px",
            color: "red",
        });
    }
}
