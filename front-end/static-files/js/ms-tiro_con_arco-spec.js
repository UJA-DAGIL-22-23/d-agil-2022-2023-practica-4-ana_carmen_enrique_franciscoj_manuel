/**
 * @file ms-tiro_con_arco-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS tiro_con_arco en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTiroConArco = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const TiroConArcoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_TIROCONARCO = "tiro_con_arco Home"
const ACERCA_DE_TIROCONARCO = "tiro_con_arco Acerca de"

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

describe("tiro_con_arco.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            tiro_con_arco.mostrarHome()
            expect(elementoTiroConArco.innerHTML).toBe(TITULO_HOME_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML).toBe(tiro_con_arco.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            tiro_con_arco.mostrarHome(23)
            expect(elementoTiroConArco.innerHTML).toBe(TITULO_HOME_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML).toBe(tiro_con_arco.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            tiro_con_arco.mostrarHome({})
            expect(elementoTiroConArco.innerHTML).toBe(TITULO_HOME_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML).toBe(tiro_con_arco.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            tiro_con_arco.mostrarHome({ foo: "bar" })
            expect(elementoTiroConArco.innerHTML).toBe(TITULO_HOME_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML).toBe(tiro_con_arco.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            tiro_con_arco.mostrarHome(datosDescargadosPrueba)
            expect(elementoTiroConArco.innerHTML).toBe(TITULO_HOME_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("tiro_con_arco.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            tiro_con_arco.mostrarAcercaDe()
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            tiro_con_arco.mostrarAcercaDe(23)
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            tiro_con_arco.mostrarAcercaDe({})
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            tiro_con_arco.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            tiro_con_arco.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            tiro_con_arco.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            tiro_con_arco.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)
            expect(TiroConArcoContenido.innerHTML.search(tiro_con_arco.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            tiro_con_arco.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTiroConArco.innerHTML).toBe(ACERCA_DE_TIROCONARCO)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(TiroConArcoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(TiroConArcoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(TiroConArcoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
    
})

describe("tiro_con_arco.imprimeOrdenados: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
        function() {
            tiro_con_arco.imprimeOrdenados([])
            expect(elementoTiroConArco.innerHTML).toBe("tiro_con_arco del listado de los nombres de todos los arqueros ordenados")
            expect(TiroConArcoContenido.querySelector('tbody').innerHTML).toBe('')
    })
})

describe("tiro_con_arco.imprimeCompleto: ", function() {
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
    function() {
        tiro_con_arco.imprimeCompleto(10)
        expect(elementoTiroConArco.innerHTML).toBe("tiro_con_arco del listado de todos los datos de todos los arqueros")
        expect(TiroConArcoContenido.querySelector('tbody').innerHTML).toBe('')
})
})


describe("tiro_con_arco.imprimeSoloNombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
    function() {
        tiro_con_arco.imprimeSoloNombres(10)
        expect(elementoTiroConArco.innerHTML).toBe("tiro_con_arco del listado de los nombres de todos los arqueros")
        expect(TiroConArcoContenido.querySelector('tbody').innerHTML).toBe('')
})
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
    function() {
    tiro_con_arco.imprimeSoloNombres([])
    expect(elementoTiroConArco.innerHTML).toBe("tiro_con_arco del listado de los nombres de todos los arqueros")
    expect(TiroConArcoContenido.querySelector('tbody').innerHTML).toBe('')
})
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - tiro_con_arco.descargarRuta
 - tiro_con_arco.procesarAcercaDe
 - tiro_con_arco.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
