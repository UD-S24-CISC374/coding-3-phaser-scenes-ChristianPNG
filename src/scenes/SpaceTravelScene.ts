import Phaser from "phaser";
import FpsText from "../objects/fpsText";

export default class SpaceTravelScene extends Phaser.Scene {
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private fpsText: FpsText;
    private ship: Phaser.Physics.Arcade.Sprite;
    private GameOver: boolean = false;
    private portals: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "SpaceTravelScene" });
    }

    create() {
        this.add.image(400, 300, "space");

        this.portals = this.physics.add.staticGroup();
        let portal: Phaser.Physics.Arcade.Sprite = this.portals.create(
            400,
            200,
            "portal"
        );
        portal.body!.setSize(70, 70);
        portal.setScale(0.5, 0.5);

        this.ship = this.physics.add.sprite(100, 450, "ship");
        this.ship.setCollideWorldBounds(true);

        this.physics.add.collider(this.ship, this.portals, () => {
            this.anims.remove("left");
            this.anims.remove("right");
            this.anims.remove("up");
            this.anims.remove("down");
            this.anims.remove("turn");
            this.scene.start("MainScene");
        });

        this.anims.create({
            key: "left",
            frames: [{ key: "ship", frame: 0 }],
            frameRate: 20,
        });
        this.anims.create({
            key: "right",
            frames: [{ key: "ship", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "ship", frame: 2 }],
            frameRate: 20,
        });

        this.cursor = this.input.keyboard?.createCursorKeys();
        this.physics.world.gravity.y = 0;

        this.add.text(16, 16, "score: " + this.registry.get("score"), {
            fontSize: "32px",
            color: "#000",
            strokeThickness: 2,
            stroke: "#000",
        });
    }

    update() {
        if (this.cursor?.left.isDown) {
            this.ship.setVelocityX(-260);
            this.ship.anims.play("left", true);
        } else if (this.cursor?.right.isDown) {
            this.ship.setVelocityX(260);
            this.ship.anims.play("right", true);
        } else if (this.cursor?.up.isDown) {
            this.ship.setVelocityY(-260);
        } else if (this.cursor?.down.isDown) {
            this.ship.setVelocityY(260);
        } else {
            this.ship.setVelocity(0);
            this.ship.anims.play("turn");
        }
    }
}
