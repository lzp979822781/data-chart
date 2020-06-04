export default [
    // app
    {
        path: "/",
        component: "../layouts/BasicLayout",
        Routes: ["src/pages/Authorized"],
        authority: ["admin", "user"],
        routes: [
            // dashboard
            { path: "/", icon: "home", component: "./chart/Home" },
            {
                name: "exception",
                icon: "warning",
                path: "/exception",
                routes: [
                    // exception
                    {
                        path: "/exception/403",
                        name: "not-permission",
                        component: "./Exception/403",
                    },
                    {
                        path: "/exception/404",
                        name: "not-find",
                        component: "./Exception/404",
                    },
                    {
                        path: "/exception/500",
                        name: "server-error",
                        component: "./Exception/500",
                    },
                    {
                        path: "/exception/trigger",
                        name: "trigger",
                        hideInMenu: true,
                        component: "./Exception/TriggerException",
                    },
                ],
            },
            {
                component: "404",
            },
        ],
    },
];
