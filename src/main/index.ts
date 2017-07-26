/// <reference path="../definitions/EZGUI.d.ts" />

import * as furniture from "./furniture";
import * as loaders from "./loaders";
import * as room from "./room";
import * as gui from "./gui";

let application: PIXI.Application;

export {
    furniture,
    loaders,
    room,
    gui,
    application
};

let roomContainer: PIXI.Container;
let guiContainer: PIXI.Container;

export function initialize(window: Window, canvas: HTMLCanvasElement) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    application = new PIXI.Application(window.innerWidth, window.innerHeight, {
        view: canvas,
        backgroundColor: 0x000000,
        resolution: 1
    });

    window.addEventListener("resize", () => {
        application.renderer.resize(window.innerWidth, window.innerHeight);
    });

    roomContainer = new PIXI.Container();
    roomContainer.x = Math.floor(window.innerWidth / 2);
    roomContainer.y = Math.floor(window.innerHeight / 2);
    application.stage.addChild(roomContainer);

    guiContainer = new PIXI.Container();
    application.stage.addChild(guiContainer);

    EZGUI.Theme.load(["/assets/h5client-theme/h5client-theme.json"], () => {
        gui.initialize(guiContainer);

        PIXI.loader.use(loaders.furnitureLoader)
            .add([
                "/furnitures/ads_calip_fan/ads_calip_fan.json",
                "/furnitures/ads_calip_cola/ads_calip_cola.json",
                "/furnitures/ads_cllava2/ads_cllava2.json",
                "/furnitures/army_c15_officetent/army_c15_officetent.json",
                "/furnitures/ads_calip_pool/ads_calip_pool.json"])
            .load();
    });
}

let roomDatas = [
    {
        heightmap: [
            "0000000X",
            "0000000X",
            "0000000X",
            "0000000X",
            "0000000X",
            "0000000X",
            "0000000X",
            "0000000X",
            "0000000X",
            "XXXXXXXX"
        ],
        furnitures: [{
            name: "ads_calip_fan",
            roomX: 0,
            roomY: 0,
            direction: 4,
            animation: 1
        }, {
            name: "ads_calip_cola",
            roomX: 4,
            roomY: 2,
            color: 4
        }, {
            name: "ads_calip_cola",
            roomX: 4,
            roomY: 3,
            color: 3
        }, {
            name: "ads_calip_cola",
            roomX: 4,
            roomY: 4,
            color: 2
        }, {
            name: "ads_calip_cola",
            roomX: 4,
            roomY: 5,
            color: 1
        }]
    }, {
        heightmap: [
            "000000XXXXXX",
            "000000XXXXXX",
            "000000XXXXXX",
            "000000XXXXXX",
            "00000000000X",
            "00000000000X",
            "00000000000X",
            "00000000000X",
            "00000000000X",
            "XXXXXXXXXXXX"
        ],
        furnitures: [{
            name: "ads_calip_fan",
            roomX: 3,
            roomY: 8,
            direction: 2,
            animation: 1
        }, {
            name: "ads_cllava2",
            roomX: 0,
            roomY: 0,
            animation: 0
        }, {
            name: "ads_cllava2",
            roomX: 1,
            roomY: 0
        }, {
            name: "ads_cllava2",
            roomX: 2,
            roomY: 0
        }, {
            name: "ads_calip_pool",
            roomX: 8,
            roomY: 6
        }]
    }
];

let roomSprite: room.RoomSprite;

export function loadRoom(roomId: number) {
    if (roomSprite) {
        roomSprite.stop();
    }

    roomContainer.removeChildren();

    gui.displayWindow(gui.WINDOW_NAVIGATOR, false);
    gui.displayWindow(gui.WINDOW_HOTELVIEW, false);

    let roomData = roomDatas[roomId];
    roomSprite = new room.RoomSprite(roomData.heightmap);

    roomData.furnitures.forEach((furnitureData) => {
        let furnitureSprite = furniture.createSprite(furnitureData.name);
        
        if (furnitureData.animation !== null || furnitureData.animation !== undefined) {
            furnitureSprite.animateAndStart(furnitureData.animation);
        }
        
        if (furnitureData.color) {
            furnitureSprite.setColor(furnitureData.color);
        }

        if (furnitureData.direction) {
            furnitureSprite.setDirection(furnitureData.direction);
        }

        roomSprite.addFurnitureSprite(furnitureSprite, furnitureData.roomX, furnitureData.roomY);

    });

    roomSprite.start();

    roomContainer.addChild(roomSprite);
}

global.CLIENT = exports;