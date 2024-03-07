import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class SpaceTravelScene extends Phaser.Scene {
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private fpsText: FpsText;
    private ship: Phaser.Physics.Arcade.Sprite;
    private GameOver: boolean = false;

    constructor() {
        super({ key: "SpaceTravelScene" });
    }

    create() {
        this.add.image(400, 300, "space");
        this.add.text(300, 200, "Main Menu", {
            fontSize: "32px",
            color: "red",
        });

        this.add
            .text(300, 300, "Start Game", { fontSize: "24px", color: "#000" })
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("MainScene");
            });

        this.ship = this.physics.add.sprite(100, 450, "ship");
        this.ship.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("ship", {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "ship", frame: 2 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("ship", {
                start: 3,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.cursor = this.input.keyboard?.createCursorKeys();
    }

    update() {
        if (!this.GameOver) {
            if (this.cursor?.left.isDown) {
                this.ship.setVelocityX(-260);
                this.ship.anims.play("left", true);
            } else if (this.cursor?.right.isDown) {
                this.ship.setVelocityX(260);
                this.ship.anims.play("right", true);
            } else {
                this.ship.setVelocityX(0);
                this.ship.anims.play("turn");
            }
            if (this.cursor?.up.isDown && this.ship.body?.touching.down) {
                this.ship.setVelocityY(-330);
            }
        }
    }
}
