import { default as MainMenuWindow } from "./mainmenu/MainMenuWindow";
import { default as NavigatorWindow } from "./navigator/NavigatorWindow";
import { default as HotelViewWindow } from "./hotelview/HotelViewWindow";

export {
    MainMenuWindow,
    NavigatorWindow,
    HotelViewWindow
};

export const THEME = "h5client";

export const WINDOW_NAVIGATOR = 0;
export const WINDOW_HOTELVIEW = 1;

let container: PIXI.Container;

let mainMenu: MainMenuWindow;
let navigator: NavigatorWindow;
let hotelView: HotelViewWindow;

export function initialize(guicontainer: PIXI.Container) {
    container = guicontainer;

    hotelView = new HotelViewWindow();
    container.addChild(hotelView);

    mainMenu = new MainMenuWindow(THEME);
    container.addChild(mainMenu);

    navigator = new NavigatorWindow(THEME);
    container.addChild(navigator);

    displayWindow(WINDOW_NAVIGATOR, false);
}

export function displayWindow(windowId: number, visible: boolean) {
    let window: PIXI.Container;
    switch (windowId) {
        case WINDOW_NAVIGATOR: window = navigator; break;
        case WINDOW_HOTELVIEW: window = hotelView; break;
            
        default: throw 'Unknown window';
    }

    window.visible = visible;
    window.renderable = visible;
}