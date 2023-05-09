/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const ROUTES = [
    {
        url: '/tiro_con_arco',
        proxy: {
            target: "http://localhost:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/tiro_con_arco`]: '',
            },
        }
    },
    {
        url: '/motonautica',
        proxy: {
            target: "http://localhost:8003",
            changeOrigin: true,
            pathRewrite: {
                [`^/motonautica`]: '',
            },
        }
    },
    {
        url: '/balonmano',
        proxy: {
            target: "http://localhost:8004",
            changeOrigin: true,
            pathRewrite: {
                [`^/balonmano`]: '',
            },
        }
    },
    {
        url: '/futbol',
        proxy: {
            target: "http://localhost:8005",
            changeOrigin: true,
            pathRewrite: {
                [`^/futbol`]: '',
            },
        }
    },
    {
        url: '/gimnasia',
        proxy: {
            target: "http://localhost:8006",
            changeOrigin: true,
            pathRewrite: {
                [`^/gimnasia`]: '',
            },
        }
    }
]

exports.routes = ROUTES;