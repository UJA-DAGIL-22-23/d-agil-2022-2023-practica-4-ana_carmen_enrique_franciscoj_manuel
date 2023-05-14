/**
 * @file ms-motonautica-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS motonautica en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "motonautica Home"
const TITULO_ACERCA_DE = "motonautica Acerca de"
const TITULO_LISTA_NOMBRE = "Nombres de los pilotos"
const TITULO_LISTA_NOMBRE_C = "Datos de los pilotos"
const TITULO_LISTA_ORDEN = "Nombres en orden"
const EMPTY = ''

const datosDescargadosPruebaMotonautica = {
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

describe("motonautica.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            motonautica.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(motonautica.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            motonautica.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(motonautica.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            motonautica.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(motonautica.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            motonautica.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(motonautica.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            motonautica.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(.mensaje)
        })
})


describe("motonautica.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            motonautica.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            motonautica.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            motonautica.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            motonautica.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            motonautica.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            motonautica.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            motonautica.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(motonautica.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            motonautica.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(.fecha) >= 0).toBeTrue()
        })
})

describe("motonautica.imprimenombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            motonautica.imprimenombres([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTA_NOMBRE)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            motonautica.imprimenombres(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTA_NOMBRE)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
})



describe("motonautica.imprimenombrescompleto: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            motonautica.imprimenombrescompleto([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTA_NOMBRE_C)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            motonautica.imprimenombrescompleto(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTA_NOMBRE_C)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
})


describe("motonautica.imprimeorden: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            motonautica.imprimeorden([])
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTA_ORDEN)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            motonautica.imprimeorden(10)
            expect(elementoTitulo.innerHTML).toBe(TITULO_LISTA_ORDEN)
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - motonautica.descargarRuta
 - motonautica.procesarAcercaDe
 - motonautica.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
