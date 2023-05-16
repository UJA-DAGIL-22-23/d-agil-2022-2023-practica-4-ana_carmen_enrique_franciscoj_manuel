/**
 * @file ms-futbol-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS futbol en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloFutbol = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoFutbol = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_FUTBOL = "futbol Home"
const TITULO_ACERCA_DE_FUTBOL = "futbol Acerca de"

const datosDescargadosPruebaFutbol = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("futbol.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            futbol.mostrarHome()
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_HOME_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            futbol.mostrarHome(23)
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_HOME_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            futbol.mostrarHome({})
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_HOME_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            futbol.mostrarHome({ foo: "bar" })
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_HOME_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            futbol.mostrarHome(datosDescargadosPruebaFutbol)
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_HOME_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML).toBe(datosDescargadosPruebaFutbol.mensaje)
        })
})


describe("futbol.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            futbol.mostrarAcercaDe()
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            futbol.mostrarAcercaDe(23)
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            futbol.mostrarAcercaDe({})
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            futbol.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            futbol.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            futbol.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            futbol.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)
            expect(elementoContenidoFutbol.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            futbol.mostrarAcercaDe(datosDescargadosPruebaFutbol)
            expect(elementoTituloFutbol.innerHTML).toBe(TITULO_ACERCA_DE_FUTBOL)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoFutbol.innerHTML.search(datosDescargadosPruebaFutbol.autor) >= 0).toBeTrue()
            expect(elementoContenidoFutbol.innerHTML.search(datosDescargadosPruebaFutbol.email) >= 0).toBeTrue()
            expect(elementoContenidoFutbol.innerHTML.search(datosDescargadosPruebaFutbol.fecha) >= 0).toBeTrue()
        })
})

describe("futbol.imprimenobres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            futbol.imprimenombres([])
            expect(elementoTituloFutbol.innerHTML).toBe("Nombres de los jugadores")
            expect(elementoContenidoFutbol.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            futbol.imprimenombres(10)
            expect(elementoTituloFutbol.innerHTML).toBe("Nombres de los jugadores")
            expect(elementoContenidoFutbol.querySelector('tbody').innerHTML).toBe('')
        })
})

describe("futbol.imprimetodo: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            futbol.imprimetodo([])
            expect(elementoTituloFutbol.innerHTML).toBe("Datos de los jugadores")
            expect(elementoContenidoFutbol.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            futbol.imprimetodo(10)
            expect(elementoTituloFutbol.innerHTML).toBe("Datos de los jugadores")
            expect(elementoContenidoFutbol.querySelector('tbody').innerHTML).toBe('')
        })
})

describe("futbol.imprimeorden: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            futbol.imprimeorden([])
            expect(elementoTituloFutbol.innerHTML).toBe("Nombres de los jugadores ordenados alfabeticamente")
            expect(elementoContenidoFutbol.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            futbol.imprimeorden(10)
            expect(elementoTituloFutbol.innerHTML).toBe("Nombres de los jugadores ordenados alfabeticamente")
            expect(elementoContenidoFutbol.querySelector('tbody').innerHTML).toBe('')
        })
})

describe("futbol.sustituyeTags: ", function() {
    it("Sustituye correctamente los tags",
        function() {
            let vecJugador = {
                ref: {
                    "@ref": {
                        id: "1"
                    }
                },
                data: {
                        nombre: "Leo",
                        apellidos: "Messi",
                        fnac: {
                          dia: 21,
                          mes: 7,
                          anio: 1987
                        },
                        equipos: ["F.C Barcelona", "Paris Saint-Germain F.C."],
                        goles: 701
                    
                }
            }
            let plantillaTagsSpec = {
                "nombre": "### nombre ###",
                "apellidos" : "### apellidos ###",
                "fnac": "### fnac ###",
                "equipos": "### equipos ###",
                "goles": "### goles ###"
                }

        let vecFinal = `
            <tr title="${plantillaTagsSpec.nombre}">
            <td>${plantillaTagsSpec.nombre}</td>
            <td>${plantillaTagsSpec.apellidos}</td>
            <td>${plantillaTagsSpec.fnac}</td>
            <td>${plantillaTagsSpec["equipos"]}</td>
            <td>${plantillaTagsSpec.goles}</td>
        </tr>`;

        let msj = futbol.sustituyeTodosTags(vecFinal, vecJugador);
        expect(msj.includes("Leo")).toBeTrue();
        expect(msj.includes("Messi")).toBeTrue();
        expect(msj.includes("21/7/1987")).toBeTrue();
        expect(msj.includes("F.C Barcelona", "Paris Saint-Germain F.C.")).toBeTrue();
        expect(msj.includes("701")).toBeTrue();
        })
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - futbol.descargarRuta
 - futbol.procesarAcercaDe
 - futbol.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
