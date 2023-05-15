/**
 * @file ms-balonmano-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloBalonmano = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoBalonmano = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_BALONMANO = "Plantilla Home"
const TITULO_ACERCA_DE_BALONMANO = "Plantilla Acerca de"

const datosDescargadosPruebaBalonmano = {
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

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Balonmano.mostrarHome()
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(Balonmano.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Balonmano.mostrarHome(23)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(Balonmano.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Balonmano.mostrarHome({})
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(Balonmano.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Balonmano.mostrarHome({ foo: "bar" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(Balonmano.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Balonmano.mostrarHome(datosDescargadosPruebaBalonmano)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(datosDescargadosPruebaBalonmano.mensaje)
        })
})


describe("Balonmano.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Balonmano.mostrarAcercaDe()
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Balonmano.mostrarAcercaDe(23)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Balonmano.mostrarAcercaDe({})
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Balonmano.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Balonmano.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Balonmano.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Balonmano.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(Balonmano.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })


    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Balonmano.mostrarAcercaDe(datosDescargadosPruebaBalonmano)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoBalonmano.innerHTML.search(datosDescargadosPruebaBalonmano.autor) >= 0).toBeTrue()
            expect(elementoContenidoBalonmano.innerHTML.search(datosDescargadosPruebaBalonmano.email) >= 0).toBeTrue()
            expect(elementoContenidoBalonmano.innerHTML.search(datosDescargadosPruebaBalonmano.fecha) >= 0).toBeTrue()
        })


})

describe("Balonmano.ordena: ", function () {

    it("ordena correctamente un vector",
        function () {
            vector = [
                {data: {name: 'Arno'}},
                {data: {name: 'Admes'}},
                {data: {name: 'Sobunar'}},
                {data: {name: 'Cairbre'}},
            ];

            vectorOrdenado = [
                {data: {name: 'Admes'}},
                {data: {name: 'Arno'}},
                {data: {name: 'Cairbre'}},
                {data: {name: 'Sobunar'}},
            ];

            Balonmano.ordena(vector)
            expect(vector).toEqual(vectorOrdenado)
        })
})

describe("Balonmano.muestraSoloNombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            Balonmano.muestraSoloNombres([])
            expect(elementoTituloBalonmano.innerHTML).toBe("Balonmano del listado de los nombres de todos los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            Balonmano.muestraSoloNombres(10)
            expect(elementoTituloBalonmano.innerHTML).toBe("Balonmano del listado de los nombres de todos los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
})



describe("Balonmano.muestraTodo: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            Balonmano.muestraTodo([])
            expect(elementoTituloBalonmano.innerHTML).toBe("Balonmano del listado de todos los datos de los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            Balonmano.muestraTodo(10)
            expect(elementoTituloBalonmano.innerHTML).toBe("Balonmano del listado de todos los datos de los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
})


describe("Balonmano.muestraOrdenado: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            Balonmano.muestraOrdenado([])
            expect(elementoTituloBalonmano.innerHTML).toBe("Balonmano del listado de los datos de todos los jugadores de balonmano ordenados alfabeticamente")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            Balonmano.muestraOrdenado(10)
            expect(elementoTituloBalonmano.innerHTML).toBe("Balonmano del listado de los datos de todos los jugadores de balonmano ordenados alfabeticamente")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
})




/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Balonmano.descargarRuta
 - Balonmano.procesarAcercaDe
 - Balonmano.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
