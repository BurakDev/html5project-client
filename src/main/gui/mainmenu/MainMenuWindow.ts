///<reference path="../../../definitions/EZGUI.d.ts" />

import { template } from "./template";
import * as gui from "../";

export default class MainMenuWindow extends PIXI.Container {
    private window: any;

    public constructor(theme: string) {
        super();

        this.window = EZGUI.create(template(), theme);

        this.handleEvents();

        this.addChild(this.window);
    }

    private handleEvents() {
        EZGUI.components.mainMenuNavigatorButton.on("click", () => {
            gui.displayWindow(gui.WINDOW_NAVIGATOR, true);
        });
    }
}