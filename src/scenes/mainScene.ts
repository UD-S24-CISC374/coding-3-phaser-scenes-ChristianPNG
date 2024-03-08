import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private GameOver: boolean = false;
    private portals: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.add.image(400, 300, "sky");

        this.portals = this.physics.add.staticGroup();
        let portal: Phaser.Physics.Arcade.Sprite = this.portals.create(
            700,
            90,
            "portal"
        );
        portal.body?.setSize(0.2, 0.2);
        portal.setScale(0.2, 0.2);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, "platform").setScale(2).refreshBody();
        this.platforms.create(600, 400, "platform");
        this.platforms.create(50, 250, "platform");
        this.platforms.create(750, 220, "platform");

        //implementing player
        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.collider(this.player, this.portals, () => {
            this.anims.remove("left");
            this.anims.remove("right");
            this.anims.remove("turn");
            this.scene.start("GameOverScene");
        });

        //implementing player animation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        //keyboard input
        this.cursor = this.input.keyboard?.createCursorKeys();

        const curr: number = this.registry.get("score");
        this.registry.set("score", curr + 50);

        this.add.text(16, 16, "score: " + this.registry.get("score"), {
            fontSize: "32px",
            color: "#000",
            strokeThickness: 2,
            stroke: "#000",
        });
    }

    update() {
        if (!this.GameOver) {
            if (this.cursor?.left.isDown) {
                this.player.setVelocityX(-260);
                this.player.anims.play("left", true);
            } else if (this.cursor?.right.isDown) {
                this.player.setVelocityX(260);
                this.player.anims.play("right", true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("turn");
            }
            if (this.cursor?.up.isDown && this.player.body?.touching.down) {
                this.player.setVelocityY(-330);
            }
        }
    }
}
