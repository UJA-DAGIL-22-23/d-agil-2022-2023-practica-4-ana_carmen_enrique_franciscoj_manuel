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
            BalonmanoJugador.mostrarHome()
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(BalonmanoJugador.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            BalonmanoJugador.mostrarHome(23)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(BalonmanoJugador.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            BalonmanoJugador.mostrarHome({})
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(BalonmanoJugador.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            BalonmanoJugador.mostrarHome({ foo: "bar" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(BalonmanoJugador.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            BalonmanoJugador.mostrarHome(datosDescargadosPruebaBalonmano)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_HOME_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML).toBe(datosDescargadosPruebaBalonmano.mensaje)
        })
})


describe("BalonmanoJugador.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            BalonmanoJugador.mostrarAcercaDe()
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            BalonmanoJugador.mostrarAcercaDe(23)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            BalonmanoJugador.mostrarAcercaDe({})
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            BalonmanoJugador.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            BalonmanoJugador.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            BalonmanoJugador.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            BalonmanoJugador.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)
            expect(elementoContenidoBalonmano.innerHTML.search(BalonmanoJugador.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })


    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            BalonmanoJugador.mostrarAcercaDe(datosDescargadosPruebaBalonmano)
            expect(elementoTituloBalonmano.innerHTML).toBe(TITULO_ACERCA_DE_BALONMANO)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenidoBalonmano.innerHTML.search(datosDescargadosPruebaBalonmano.autor) >= 0).toBeTrue()
            expect(elementoContenidoBalonmano.innerHTML.search(datosDescargadosPruebaBalonmano.email) >= 0).toBeTrue()
            expect(elementoContenidoBalonmano.innerHTML.search(datosDescargadosPruebaBalonmano.fecha) >= 0).toBeTrue()
        })


})

describe("BalonmanoJugador.ordena: ", function () {

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

            BalonmanoJugador.ordena(vector)
            expect(vector).toEqual(vectorOrdenado)
        })
})

describe("BalonmanoJugador.muestraSoloNombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            BalonmanoJugador.muestraSoloNombres([])
            expect(elementoTituloBalonmano.innerHTML).toBe("Plantilla del listado de los nombres de todos los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })

    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            BalonmanoJugador.muestraSoloNombres(10)
            expect(elementoTituloBalonmano.innerHTML).toBe("Plantilla del listado de los nombres de todos los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
})



describe("BalonmanoJugador.muestraTodo: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            BalonmanoJugador.muestraTodo([])
            expect(elementoTituloBalonmano.innerHTML).toBe("Plantilla del listado de todos los datos de los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            BalonmanoJugador.muestraTodo(10)
            expect(elementoTituloBalonmano.innerHTML).toBe("Plantilla del listado de todos los datos de los jugadores de balonmano")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
})


describe("BalonmanoJugador.muestraOrdenado: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            BalonmanoJugador.muestraOrdenado([])
            expect(elementoTituloBalonmano.innerHTML).toBe("Plantilla del listado de los datos de todos los jugadores de balonmano ordenados alfabeticamente")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            BalonmanoJugador.muestraOrdenado(10)
            expect(elementoTituloBalonmano.innerHTML).toBe("Plantilla del listado de los datos de todos los jugadores de balonmano ordenados alfabeticamente")
            expect(elementoContenidoBalonmano.querySelector('tbody').innerHTML).toBe('')
        })
})


describe("BalonmanoJugador.sustituyeTags: ", function() {
    it("Sustituye correctamente los tags",
        function() {
            let vecJugador = {
                ref: {
                    "@ref": {
                        id: "1"
                    }
                },
                data: {
                    playerId: 1,
                    name: "Arno",
                    surname: "Sommer",
                    dateBirth: {
                        day: 22,
                        month: 9,
                        year: 1921
                    },
                    seasonsPlayed: [1998, 1999, 2000, 2001, 2002, 2003, 2004],
                    goalSeason: [2, 5, 11, 7, 3, 4, 14],
                    disqualified: true
                }
            }
            let plantillaTagsSpec = {
                    "ID": "### ID ###",
                    "PLAYERID": "### PLAYERID ###",
                    "NAME": "### NAME ###",
                    "SURNAME": "### SURNAME ###",
                    "DATE_BIRTH": "### DATE_BIRTH ###",
                    "SEASONS_PLAYED": "### SEASONS_PLAYED ###",
                    "GOAL_SEASON": "### GOAL_SEASON ###",
                    "DISQUALIFIED": "### DISQUALIFIED ###"
                }

        let vecFinal = `
            <tr title="${plantillaTagsSpec.NAME}">
            <td>${plantillaTagsSpec.PLAYERID}</td>
            <td>${plantillaTagsSpec.NAME}</td>
            <td>${plantillaTagsSpec.SURNAME}</td>
            <td>${plantillaTagsSpec.DATE_BIRTH}</td>
            <td>${plantillaTagsSpec["SEASONS_PLAYED"]}</td>
            <td>${plantillaTagsSpec["GOAL_SEASON"]}</td>
            <td>${plantillaTagsSpec.DISQUALIFIED}</td>
        </tr>`;

        let msj = BalonmanoJugador.sustituyeTags(vecFinal, vecJugador);
        expect(msj.includes("1")).toBeTrue();
        expect(msj.includes("Arno")).toBeTrue();
        expect(msj.includes("Sommer")).toBeTrue();
        expect(msj.includes("22/9/1921")).toBeTrue();
        expect(msj.includes("1998,1999,2000,2001,2002,2003,2004")).toBeTrue();
        expect(msj.includes("2,5,11,7,3,4,14")).toBeTrue();
        expect(msj.includes("true")).toBeTrue();

        })
})





/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - BalonmanoJugador.descargarRuta
 - BalonmanoJugador.procesarAcercaDe
 - BalonmanoJugador.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
