/**
 * @file ms-futbol-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS futbol en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "futbol Home"
const TITULO_ACERCA_DE = "futbol Acerca de"

const datosDescargadosPrueba = {
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
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            futbol.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            futbol.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            futbol.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(futbol.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            futbol.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("futbol.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            futbol.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            futbol.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            futbol.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            futbol.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            futbol.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            futbol.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            futbol.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(futbol.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            futbol.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("futbol.imprimenobres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            futbol.imprimenombres([])
            expect(elementoTitulo.innerHTML).toBe("Nombres de los jugadores")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            futbol.imprimenombres(10)
            expect(elementoTitulo.innerHTML).toBe("Nombres de los jugadores")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
})

describe("futbol.imprimetodo: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            futbol.imprimetodo([])
            expect(elementoTitulo.innerHTML).toBe("Datos de los jugadores")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            futbol.imprimetodo(10)
            expect(elementoTitulo.innerHTML).toBe("Datos de los jugadores")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
})

describe("futbol.imprimeorden: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            futbol.imprimeorden([])
            expect(elementoTitulo.innerHTML).toBe("Nombres de los jugadores ordenados alfabeticamente")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            futbol.imprimeorden(10)
            expect(elementoTitulo.innerHTML).toBe("Nombres de los jugadores ordenados alfabeticamente")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
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
