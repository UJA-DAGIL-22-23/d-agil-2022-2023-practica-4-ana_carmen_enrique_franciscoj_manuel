/**
 * @file ms-general-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS general en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoGeneral = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const generalContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_GENERAL = "general Home"
const ACERCA_DE_GENERAL = "general Acerca de"

const datosDescargadosPruebaGeneral = {
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

describe("general.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            general.mostrarHome()
            expect(elementoGeneral.innerHTML).toBe(TITULO_HOME_GENERAL)
            expect(generalContenido.innerHTML).toBe(general.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            general.mostrarHome(23, 23, 23, 23, 23)
            expect(elementoGeneral.innerHTML).toBe(TITULO_HOME_GENERAL)
            expect(generalContenido.innerHTML).toBe(general.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            general.mostrarHome({}, {}, {}, {}, {})
            expect(elementoGeneral.innerHTML).toBe(TITULO_HOME_GENERAL)
            expect(generalContenido.innerHTML).toBe(general.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            general.mostrarHome({ foo: "bar" })
            expect(elementoGeneral.innerHTML).toBe(TITULO_HOME_GENERAL)
            expect(generalContenido.innerHTML).toBe(general.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            general.mostrarHome(datosDescargadosPruebaGeneral)
            expect(elementoGeneral.innerHTML).toBe(TITULO_HOME_GENERAL)
            expect(generalContenido.innerHTML).toBe(datosDescargadosPruebaGeneral.mensaje)
        })
})


describe("general.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            general.mostrarAcercaDe()
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            general.mostrarAcercaDe(23)
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            general.mostrarAcercaDe({})
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            general.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            general.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            general.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            general.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")
            expect(generalContenido.innerHTML.search(general.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            general.mostrarAcercaDe(datosDescargadosPruebaGeneral, )
            expect(elementoGeneral.innerHTML).toBe("Acerca de todos los miembros de proyecto")

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(generalContenido.innerHTML.search(datosDescargadosPruebaGeneral.autor) >= 0).toBeTrue()
            expect(generalContenido.innerHTML.search(datosDescargadosPruebaGeneral.email) >= 0).toBeTrue()
            expect(generalContenido.innerHTML.search("18/4/2023") >= 0).toBeTrue()
        })
    
})


describe("general.imprimeSoloNombres: ", function() {
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
    function() {
        general.imprimeSoloNombres(10)
        expect(elementoGeneral.innerHTML).toBe("Listado de los nombres de todos los jugadores de todos los deportes")
        expect(generalContenido.querySelector('tbody').innerHTML).toBe('')
})
    it("Mostrar datos nulos cuando le pasamos vector nulo", 
    function() {
    general.imprimeSoloNombres([])
    expect(elementoGeneral.innerHTML).toBe("Listado de los nombres de todos los jugadores de todos los deportes")
    expect(generalContenido.querySelector('tbody').innerHTML).toBe('')
    })
})



describe("general.SustituyeTagArqueros: ", function() {
                it("Sustituye correctamente los tags",
                    function() {
                        let vecJugador = {
                            data: {
                                nombre: "Arno",
                                apellido: "Sommer",
                            }
                        }
                        let plantillaTagsSpec = {
                            "NOMBRE": "### NOMBRE ###",
                            "APELLIDO": "### APELLIDO ###",
                            "DEPORTE": "### DEPORTE ###"

                        }

            let vecFinal = `
            <tr title="${plantillaTagsSpec.NOMBRE}">
            <td>${plantillaTagsSpec.NOMBRE}</td>
            <td>${plantillaTagsSpec.APELLIDO}</td>
            <td>${plantillaTagsSpec.DEPORTE}</td>
        </tr>`;

                        let msj = general.sustituyeTagsArqueros(vecFinal, vecJugador);
                        expect(msj.includes("Arno")).toBeTrue();
                        expect(msj.includes("Sommer")).toBeTrue();
                        expect(msj.includes("Tiro con Arco")).toBeTrue();
                    })
})



describe("general.SustituyeTagsJugadores: ", function() {
                it("Sustituye correctamente los tags",
            function() {
                        let vecJugador = {
                            data: {
                                name: "Arno",
                                surname: "Sommer",
                            }
                        }
                        let plantillaTagsSpec = {
                            "NOMBRE": "### NOMBRE ###",
                            "APELLIDO": "### APELLIDO ###",
                            "DEPORTE": "### DEPORTE ###"

                        }

                        let vecFinal = `
            <tr title="${plantillaTagsSpec.NOMBRE}">
            <td>${plantillaTagsSpec.NOMBRE}</td>
            <td>${plantillaTagsSpec.APELLIDO}</td>
            <td>${plantillaTagsSpec.DEPORTE}</td>
        </tr>`;

                        let msj = general.sustituyeTagsJugadores(vecFinal, vecJugador);
                        expect(msj.includes("Arno")).toBeTrue();
                        expect(msj.includes("Sommer")).toBeTrue();
                        expect(msj.includes("Balonmano")).toBeTrue();
                    })
 })




describe("general.SustituyeTagsPilotos: ", function() {
                it("Sustituye correctamente los tags",
                    function() {
                        let vecJugador = {
                            data: {
                                nombre: "Arno",
                                apellido: "Sommer",
                            }
                        }
                        let plantillaTagsSpec = {
                            "NOMBRE": "### NOMBRE ###",
                            "APELLIDO": "### APELLIDO ###",
                            "DEPORTE": "### DEPORTE ###"

                        }

                        let vecFinal = `
            <tr title="${plantillaTagsSpec.NOMBRE}">
            <td>${plantillaTagsSpec.NOMBRE}</td>
            <td>${plantillaTagsSpec.APELLIDO}</td>
            <td>${plantillaTagsSpec.DEPORTE}</td>
        </tr>`;

                        let msj = general.sustituyeTagsPilotos(vecFinal, vecJugador);
                        expect(msj.includes("Arno")).toBeTrue();
                        expect(msj.includes("Sommer")).toBeTrue();
                        expect(msj.includes("Motonáutica")).toBeTrue();
                    })
})



describe("general.SustituyeTagsFutbolistas: ", function() {
                it("Sustituye correctamente los tags",
                    function() {
                        let vecJugador = {
                            data: {
                                nombre: "Arno",
                                apellidos: "Sommer",
                            }
                        }
                        let plantillaTagsSpec = {
                            "NOMBRE": "### NOMBRE ###",
                            "APELLIDO": "### APELLIDO ###",
                            "DEPORTE": "### DEPORTE ###"

                        }

                        let vecFinal = `
            <tr title="${plantillaTagsSpec.NOMBRE}">
            <td>${plantillaTagsSpec.NOMBRE}</td>
            <td>${plantillaTagsSpec.APELLIDO}</td>
            <td>${plantillaTagsSpec.DEPORTE}</td>
        </tr>`;

                        let msj = general.sustituyeTagsFutbolistas(vecFinal, vecJugador);
                        expect(msj.includes("Arno")).toBeTrue();
                        expect(msj.includes("Sommer")).toBeTrue();
                        expect(msj.includes("Fútbol")).toBeTrue();
                    })
            })



describe("general.SustituyeTagsAtletas: ", function() {
                it("Sustituye correctamente los tags",
                    function() {
                        let vecJugador = {
                            data: {
                                nombre: "Arno",
                                apellido: "Sommer",
                            }
                        }
                        let plantillaTagsSpec = {
                            "NOMBRE": "### NOMBRE ###",
                            "APELLIDO": "### APELLIDO ###",
                            "DEPORTE": "### DEPORTE ###",
                        }

                        let vecFinal = `
            <tr title="${plantillaTagsSpec.NOMBRE}">
            <td>${plantillaTagsSpec.NOMBRE}</td>
            <td>${plantillaTagsSpec.APELLIDO}</td>
            <td>${plantillaTagsSpec.DEPORTE}</td>
        </tr>`;

                        let msj = general.sustituyeTagsAtletas(vecFinal, vecJugador);
                        expect(msj.includes("Arno")).toBeTrue();
                        expect(msj.includes("Sommer")).toBeTrue();
                        expect(msj.includes("Gimnasia")).toBeTrue();
                    })
        })



describe("general.imprimeBusca: ", function() {
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            general.imprimeBusca(10)
            expect(elementoGeneral.innerHTML).toBe("Listado de los nombres de los jugadores que incluyen una cadena y su deporte correspondiente")
            expect(generalContenido.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            general.imprimeBusca([])
            expect(elementoGeneral.innerHTML).toBe("Listado de los nombres de los jugadores que incluyen una cadena y su deporte correspondiente")
            expect(generalContenido.querySelector('tbody').innerHTML).toBe('')
        })
})

describe("general.imprimeTodosOrdenados: ", function() {
    it("Mostrar datos nulos cuando le pasamos vector nulo",
        function() {
            general.imprimeTodosOrdenados([])
            expect(elementoTitulo.innerHTML).toBe("Listado de los nombres de todos los jugadores de todos los deportes ordenados alfabeticamente")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
    it("Mostrar datos nulos cuando le pasamos un valor que no es un objeto",
        function() {
            general.imprimeTodosOrdenados(10)
            expect(elementoTitulo.innerHTML).toBe("Listado de los nombres de todos los jugadores de todos los deportes ordenados alfabeticamente")
            expect(elementoContenido.querySelector('tbody').innerHTML).toBe('')
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - general.descargarRuta
 - general.procesarAcercaDe
 - general.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
