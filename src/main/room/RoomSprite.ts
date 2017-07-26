/// <reference types="pixi.js" />

import * as furniture from "../furniture/";

export default class RoomSprite extends PIXI.Container {
    private heightmap: string[];

    private roomContainer: PIXI.Container;
    private furnitureContainer: PIXI.Container;

    private static tileFloor = PIXI.Texture.fromImage("/assets/images/floor_tile.png");
    private static leftWall = PIXI.Texture.fromImage("/assets/images/wall_l.png");
    private static rightWall = PIXI.Texture.fromImage("/assets/images/wall_r.png");

    private static realTileWidth = 64;
    private static realTileHeight = 32;
    private static tileWidth = RoomSprite.realTileWidth / 2;
    private static tileHeight = RoomSprite.realTileHeight / 2;

    public constructor(heightmap: string[]) {
        super();

        this.heightmap = heightmap;

        this.roomContainer = new PIXI.Container();
        this.furnitureContainer = new PIXI.Container();

        this.addChild(this.roomContainer);
        this.addChild(this.furnitureContainer);

        this.initializeRoomHeightmap(this.roomContainer, this.heightmap);
    }

    private initializeRoomHeightmap(container: PIXI.Container, heightmap: string[]) {
        let floorMaxY = heightmap.length;
        let floorMaxX = heightmap[0].length;

        let tileModules = floorMaxX;

        let floorIndex = 0;
        do {
            let tileX = Math.floor(floorIndex % tileModules);
            let tileY = Math.floor(floorIndex / tileModules);

            let tileData = heightmap[tileY].charAt(tileX);

            let screenX = this.getScreenX(tileX, tileY);
            let screenY = this.getScreenY(tileX, tileY);

            if (tileData != "X") {
                if (tileX < 1) {
                    let leftWallSprite = new PIXI.Sprite(RoomSprite.leftWall);
                    leftWallSprite.x = screenX - 8;
                    leftWallSprite.y = screenY - 122;

                    container.addChild(leftWallSprite);
                }

                if (tileY < 1) {
                    let rightWallSprite = new PIXI.Sprite(RoomSprite.rightWall);

                    rightWallSprite.x = screenX + 32,
                    rightWallSprite.y = screenY - 122;

                    container.addChild(rightWallSprite);
                }

                let floorSprite = new PIXI.Sprite(RoomSprite.tileFloor);
                floorSprite.x = screenX;
                floorSprite.y = screenY;

                container.addChild(floorSprite);
            }
        }
        while (++floorIndex < floorMaxX * floorMaxY);
    }

    private getScreenX(x: number, y: number): number {
        return x * RoomSprite.tileWidth - y * RoomSprite.tileWidth;
    }

    private getScreenXWithZ(x: number, y: number, z: number): number {
        return this.getScreenX(x, y);
    }

    private getScreenY(x: number, y: number): number {
        return x * RoomSprite.tileHeight + y * RoomSprite.tileHeight;
    }

    private getScreenYWithZ(x: number, y: number, z: number): number {
        return this.getScreenY(x, y) - z * RoomSprite.tileWidth;
    }

    public addFurnitureSprite(furnitureSprite: furniture.FurnitureSprite, roomX: number, roomY: number) {
        furnitureSprite.x = this.getScreenX(roomX, roomY) + 32;
        furnitureSprite.y = this.getScreenY(roomX, roomY) + 16;

        this.furnitureContainer.addChild(furnitureSprite);
    }

    public start() {
        this.furnitureContainer.children.forEach((furnitureSprite) => {
            (furnitureSprite as furniture.FurnitureSprite).start();
        });
    }

    public stop() {
        this.furnitureContainer.children.forEach((furnitureSprite) => {
            (furnitureSprite as furniture.FurnitureSprite).stop();
        });
    }
}