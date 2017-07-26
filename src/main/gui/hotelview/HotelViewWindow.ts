export default class HotelViewWindow extends PIXI.Container {
    private backgroundLeft: PIXI.Sprite;
    private backgroundRight: PIXI.Sprite;
    private backgroundGradient: PIXI.extras.TilingSprite;

    public constructor() {
        super();

        this.initBackgroundGradient("/assets/images/backgrounds/default_gradient.png");
        this.initBackgroundLeft("/assets/images/backgrounds/easter17_left.png");
        this.initBackgroundRight("/assets/images/backgrounds/default_right.png");
    }
    private initBackgroundGradient(image: string) {
        let texture = PIXI.Texture.fromImage(image);

        this.backgroundGradient = new PIXI.extras.TilingSprite(texture, window.innerWidth, window.innerHeight);
        this.addChild(this.backgroundGradient);
    }

    private initBackgroundLeft(image: string) {
        this.backgroundLeft = PIXI.Sprite.fromImage(image);
        this.backgroundLeft.anchor.set(0, 1);
        this.backgroundLeft.position.set(70, window.innerHeight);
        this.addChild(this.backgroundLeft);
    }

    private initBackgroundRight(image: string) {
        this.backgroundRight = PIXI.Sprite.fromImage(image);
        this.backgroundRight.anchor.set(1, 1);
        this.backgroundRight.position.set(window.innerWidth, window.innerHeight);
        this.addChild(this.backgroundRight);
    }
}