export function template(): object {
    return {
        id: "mainMenuWindow",
        component: "Window",
        skin: "mainmenu",

        height: 1000,
        layout: [1, 2],
        children: [
            {
                component: "Layout",

                position: {
                    x: 1,
                    y: 5
                },

                width: 67,
                height: "100%",

                layout: [1, 4],
                children: [
                    {
                        id: "mainMenuNavigatorButton",
                        component: "Button",
                        skin: "buttonnavigator",

                        position: "center",

                        width: 46
                    }
                ]
            }
        ]
    };
}