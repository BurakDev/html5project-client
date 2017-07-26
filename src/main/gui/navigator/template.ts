export function template(): object {
    return {
        id: "navigatorWindow",
        component: "Window",

        header: {
            skin: "windowheader",
            position: {
                x: 0,
                y: 0
            },

            height: 40,
            text: "Navigator",
            children: [
                {
                    id: "navigatorCloseButton",
                    component: "Button",
                    skin: "buttonred",
                    position: {
                        x: 368,
                        y: 6
                    },
                    width: 25,
                    height: 25,
                    text: "✖"
                }
            ]
        },

        draggable: true,
        position: {
            x: 100,
            y: 80
        },

        width: 400,
        height: 550,
        layout: [1, 1],
        children: [
            {
                id: "navigatorTabs",
                component: "Tabs",
                tabHeight: 40,

                padding: 0,
                position: {
                    x: 0,
                    y: 0
                },
                width: "100%",
                height: "100%",

                children: [
                    {
                        id: "navigatorPublicTab",
                        component: "Text",

                        position: "center",
                        width: "100%",
                        height: "100%",

                        text: "Public rooms",
                        title: "Public"
                    },
                    {
                        id: "navigatorPrivateTab",
                        component: "List",

                        active: true,

                        dragX: false,

                        position: "center",
                        width: "100%",
                        height: "100%",

                        title: "Private",

                        layout: [1, 19],
                        children: []
                    }
                ]
            }
        ]
    };
}

export function privateItem(index: number, inroom: number, inroomMax: number, name: string): object {
    let layoutSkin = "navigatorprivateodditem";
    if (index % 2 == 0) {
        layoutSkin = "navigatorprivateevenitem";
    }

    let inroomSkin = "navigatoremptyroom";
    if (inroom > 0) {
        let ratio = inroom / inroomMax;

        if (ratio < 0.5) {
            inroomSkin = "navigatorlowroom";
        }
        else if (ratio >= 0.5 && ratio < 0.90) {
            inroomSkin = "navigatormediumroom";
        }
        else if (ratio >= 0.90) {
            inroomSkin = "navigatorhighroom";
        }
    }

    return {
        component: "Button",
        skin: layoutSkin,
        position: {
            x: 0,
            y: 0
        },
        width: 375,
        height: 24,
        text: name,
        children: [
            {
                component: "Window",
                skin: inroomSkin,
                position: {
                    x: 0,
                    y: 1
                },
                text: inroom,
                width: 50,
                height: 22
            }
        ]
    };
}