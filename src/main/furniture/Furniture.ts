///<reference types="pixi.js" />

import * as FurnitureData from "./furnitureData";

export default class Furniture {

    private data: FurnitureData.IData;

    public constructor(data: FurnitureData.IData) {
        this.data = data;
    }

    public getLayerCount(): number {
        return this.data.visualization.layerCount;
    }

    public getAngle(): number {
        return this.data.visualization.angle;
    }

    public getDirections(): number[] {
        return this.data.directions.map((direction) => direction / 90 * 2);
        // move map to actuall json data (ffconverter)
    }

    public hasDirection(direction: number): boolean {
        direction = direction / 2 * 90;
        // move above values (see map) to actuall json data (ffconverter)

        return this.data.directions.indexOf(direction) >= 0;
    }

    public hasAnimations(): boolean {
        return this.data.visualization.animations != null;
    }

    public hasAnimation(animation: number): boolean {
        return this.hasAnimations()
            && this.data.visualization.animations[animation] != null;
    }

    public hasAnimationForLayer(animation: number, layer: number): boolean {
        return this.hasAnimation(animation)
            && this.data.visualization.animations[animation].layers[layer] != null;
    }

    public getAnimations(): string[] {
        return Object.keys(this.data.visualization.animations);
    }

    public getFrameFrom(animation: number, layer: number, frameCount: number): number {
        if (this.hasAnimationForLayer(animation, layer)) {
            let animationLayer = this.data.visualization.animations[animation].layers[layer];
            if (animationLayer.frames.length < 1) {
                return 0;
            }

            let frameRepeat = animationLayer.frameRepeat || 1;

            let frameIndex = Math.floor((frameCount % (animationLayer.frames.length * frameRepeat)) / frameRepeat);

            return animationLayer.frames[frameIndex];
        }

        return 0;
    }

    public hasColors(): boolean {
        return this.data.visualization.colors != null;
    }

    public hasColor(color: number): boolean {
        return this.hasColors()
            && this.data.visualization.colors[color] != null;
    }

    public hasColorForLayer(color: number, layer: number): boolean {
        return this.hasColor(color)
            && this.data.visualization.colors[color].layers[layer] != null;
    }

    public getColorFrom(color: number, layer: number): number {
        if (this.hasColorForLayer(color, layer)) {
            return this.data.visualization.colors[color].layers[layer].color;
        }

        return 0xFFFFFF;
    }

    public getColors(): string[] {
        return Object.keys(this.data.visualization.colors);
    }

    private layerFromNumber(layer: number): string {
        return String.fromCharCode(layer + 97); // a
    }

    private assetNameFrom(size: number|string, layer: number, direction?: number, frame?: number): string {
        let layerChar = this.layerFromNumber(layer);
        let assetName = this.data.name + "_" + size + "_" + layerChar;
        if (direction != null && frame != null) {
            assetName += "_" + direction + "_" + frame;
        }

        return assetName;
    }

    private hasAsset(assetName: string) {
        return this.data.assets[assetName] != null;
    }

    public getSpriteFrom(size: number|string, layer: number, direction?: number, frame?: number): PIXI.Sprite {
        let assetName = this.assetNameFrom(size, layer, direction, frame);

        if (this.hasAsset(assetName)) {
            let asset = this.data.assets[assetName];
            let sourceName = assetName;
            if (asset.source != null) {
                sourceName = asset.source;
            }

            try {
                let layerSprite = PIXI.Sprite.fromFrame(this.data.name + "_" + sourceName + ".png");

                layerSprite.x = -asset.x;
                layerSprite.y = -asset.y;
                layerSprite.z = 0;

                if (asset.flipH) {
                    layerSprite.scale.x = -1;
                    layerSprite.x *= -1;
                }

                return layerSprite;
            }
            catch (e) {
                return null;
            }
        }

        return null;
    }

    public hasLayers(): boolean {
        return this.data.visualization.layers != null;
    }

    public hasLayer(layer: number): boolean {
        return this.hasLayers()
            && this.data.visualization.layers[layer] != null;
    }

    public hasVisualDirections(): boolean {
        return this.data.visualization.directions != null;
    }

    public hasVisualDirection(direction: number): boolean {
        return this.hasVisualDirections()
            && this.data.visualization.directions[direction] != null;
    }

    public hasVisualDirectionLayer(direction: number, layer: number): boolean {
        return this.hasVisualDirection(direction)
            && this.data.visualization.directions[direction].layers[layer] != null;
    }

    private doUpdateSprite(sprite: PIXI.Sprite, layer:FurnitureData.ILayer) {
        if (layer.alpha != null) {
            sprite.alpha = layer.alpha / 255;
        }

        if (layer.ink != null && PIXI.BLEND_MODES[layer.ink] != null) {
            sprite.blendMode = PIXI.BLEND_MODES[layer.ink];
        }

        if (layer.x != null) {
            sprite.x += layer.x;
        }

        if (layer.y != null) {
            sprite.y += layer.y;
        }

        if (layer.z != null) {
            sprite.z = layer.z;
        }

        if (layer.ignoreMouse != null) {
            sprite.interactive = !layer.ignoreMouse;
        }
    }

    public updateSpriteFrom(sprite: PIXI.Sprite, layer: number) {
        if (this.hasLayer(layer)) {
            this.doUpdateSprite(sprite, this.data.visualization.layers[layer]);
        }
    }

    public updateSpriteFromDirection(sprite: PIXI.Sprite, direction: number, layer: number) {
        if (this.hasVisualDirectionLayer(direction, layer)) {
            this.doUpdateSprite(sprite, this.data.visualization.directions[direction].layers[layer]);
        }
    }
}