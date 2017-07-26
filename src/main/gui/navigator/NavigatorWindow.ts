///<reference path="../../../definitions/EZGUI.d.ts" />

import * as template from "./template";
import * as gui from "../";
import * as CLIENT from "../../";

export default class NavigatorWindow extends PIXI.Container {
    private theme: string;
    private window: any;

    public constructor(theme: string) {
        super();

        this.theme = theme;

        this.window = EZGUI.create(template.template(), theme);

        this.fillPrivateNavigator();

        this.handleEvents();

        this.addChild(this.window);
    }

    private fillPrivateNavigator() {
        var privateList = EZGUI.components.navigatorPrivateTab;

        for (let i = 0; i < 20; i++) {
            var inroomMax = 10;
            var inroom = Math.floor(Math.random() * inroomMax);

            let privateItem = EZGUI.create(template.privateItem(i, inroom, inroomMax, "This is a test room name"), this.theme);

            privateItem.on("click", () => {
                CLIENT.loadRoom(i % 2);
            });

            privateList.addChild(privateItem);
        }
    }

    private handleEvents() {
        EZGUI.components.navigatorCloseButton.on("click", () => {
            gui.displayWindow(gui.WINDOW_NAVIGATOR, false);
        });
    }
}