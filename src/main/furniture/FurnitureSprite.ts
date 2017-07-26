import { default as Furniture } from "./Furniture";

export default class FurnitureSprite extends PIXI.Container {
    private static FPS = 24;
    private static FPS_TIME_MS = 60 / FurnitureSprite.FPS; // ms
    private static DEFAULT_SIZE = 64;

    private furniture: Furniture;
    private playing: boolean;

    private frameCount: number;
    private totalTimeRunning: number;

    private animation: number;
    private direction: number;
    private color: number;

    public constructor(furniture: Furniture) {
        super();

        this.furniture = furniture;
        this.playing = false;

        this.frameCount = 0;
        this.totalTimeRunning = 0;
        
        this.animation = null;
        this.setDirection(this.furniture.getDirections()[0]);
        this.color = null;
    }

    public start() {
        if (!this.playing) {
            this.playing = true;

            PIXI.ticker.shared.add(this.update, this);
        }
    }

    public stop() {
        if (this.playing) {
            this.playing = false;

            PIXI.ticker.shared.remove(this.update);
        }
    }

    public animateAndStart(animation: number) {
        if (this.furniture.hasAnimation(animation)
            || animation == null) {
            
            if (this.animation != animation) {
                this.animation = animation;

                this.updateFurnitureView();
            }

            this.start();
        }
    }

    public animateAndStop(animation: number) {
        if (this.furniture.hasAnimation(animation)
            || animation == null) {
            this.stop();

            if (this.animation != animation) {
                this.animation = animation;

                this.updateFurnitureView();
            }
        }
    }

    public setAnimation(animation: number) {
        if (this.furniture.hasAnimation(animation)) {
            this.animation = animation;
        }
    }

    public setDirection(direction: number) {
        if (this.furniture.hasDirection(direction)) {
            this.direction = direction;
        }
    }

    public setColor(color: number) {
        if (this.furniture.hasColor(color)
            || this.color == null) {
            this.color = color;
        }
    }

    public update(deltaTime: number) {
        this.totalTimeRunning += deltaTime;
        let frameCount = Math.round(this.totalTimeRunning / FurnitureSprite.FPS_TIME_MS);
        if (this.frameCount != frameCount) {
            this.frameCount = frameCount;

            this.updateFurnitureView();
        }
    }

    public updateFurnitureView() {
        this.removeChildren();

        for (let layerId = 0; layerId < this.furniture.getLayerCount(); layerId++) {
            let frameIndex = this.furniture.getFrameFrom(this.animation, layerId, this.frameCount);
            let layerSprite = this.furniture.getSpriteFrom(FurnitureSprite.DEFAULT_SIZE, layerId, this.direction, frameIndex);

            if (layerSprite != null) {
                this.furniture.updateSpriteFrom(layerSprite, layerId);
                this.furniture.updateSpriteFromDirection(layerSprite, this.direction, layerId);

                if (this.furniture.hasColorForLayer(this.color, layerId)) {
                    let color = this.furniture.getColorFrom(this.color, layerId);

                    layerSprite.tint = color;
                }
            
                this.addChild(layerSprite);
            }
        }

        this.children.sort((a, b) => {
            return a.z - b.z;
        });
    }

    public destroy() {
        this.stop();

        super.destroy();
    }
}