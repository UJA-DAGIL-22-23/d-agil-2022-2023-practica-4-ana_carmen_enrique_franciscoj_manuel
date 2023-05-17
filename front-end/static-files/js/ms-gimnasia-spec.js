/**
 * @file ms-gimnasia-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS gimnasia en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo_gimnasia = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido_gimnasia = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_gimnasia = "gimnasia Home"
const TITULO_ACERCA_DE_gimnasia = "gimnasia Acerca de"

const datosDescargadosPrueba_gimnasia = {
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

describe("gimnasia.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            gimnasia.mostrarHome()
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_HOME_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML).toBe(gimnasia.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            gimnasia.mostrarHome(23)
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_HOME_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML).toBe(gimnasia.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            gimnasia.mostrarHome({})
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_HOME_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML).toBe(gimnasia.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            gimnasia.mostrarHome({ foo: "bar" })
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_HOME_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML).toBe(gimnasia.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            gimnasia.mostrarHome(datosDescargadosPrueba_gimnasia)
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_HOME_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML).toBe(datosDescargadosPrueba_gimnasia.mensaje)
        })
})


describe("gimnasia.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            gimnasia.mostrarAcercaDe()
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            gimnasia.mostrarAcercaDe(23)
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            gimnasia.mostrarAcercaDe({})
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            gimnasia.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            gimnasia.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            gimnasia.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            gimnasia.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)
            expect(elementoContenido_gimnasia.innerHTML.search(gimnasia.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            gimnasia.mostrarAcercaDe(datosDescargadosPrueba_gimnasia)
            expect(elementoTitulo_gimnasia.innerHTML).toBe(TITULO_ACERCA_DE_gimnasia)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido_gimnasia.innerHTML.search(datosDescargadosPrueba_gimnasia.autor) >= 0).toBeTrue()
            expect(elementoContenido_gimnasia.innerHTML.search(datosDescargadosPrueba_gimnasia.email) >= 0).toBeTrue()
            expect(elementoContenido_gimnasia.innerHTML.search(datosDescargadosPrueba_gimnasia.fecha) >= 0).toBeTrue()
        })
})

describe("gimnasia.sustituyeTags: ", function() {
    it("Sustituye correctamente los tags",
        function() {
            let vecJugador = {
                data: {
                    "nombre": "Ana",
                    "apellido": "Romero",
                    "dni": "01234567H",
                    "rankingmundial": "19",
                    "edad": 22,
                    "nacionalidad": {
                      "calle": "Calle A",
                      "numero": "123",
                      "ciudad": "Sevilla",
                      "pais": "España"
                    },
                    "medallas": [2018]
                }
            }
            let plantillaTagsSpec = {
                "NOMBRE": "### NOMBRE ###",
                "APELLIDO": "### APELLIDO ###",
                "EDAD": "### EDAD ###",
                "DNI": "### DNI ###",
                "MEDALLAS": "### MEDALLAS ###",
                "DIRECCION": "### DIRECCION ###",
                "RANKINGMUNDIAL": "### RANKINGMUNDIAL ###"
                }


        let vecFinal = `
        <tr title="${plantillaTagsSpec.NOMBRE}">
            <td>${plantillaTagsSpec.APELLIDO}</td>
            <td>${plantillaTagsSpec.EDAD}</td>
            <td>${plantillaTagsSpec.DNI}</td>
            <td>${plantillaTagsSpec.MEDALLAS}</td>
            <td>${plantillaTagsSpec.RANKINGMUNDIAL}</td>
            <td>${plantillaTagsSpec["DIRECCION"]}</td>
           
        </tr>
        `;

        let msj = gimnasia.sustituyeTags(vecFinal,vecJugador);
        expect(msj.includes("Ana")).toBeTrue();
        expect(msj.includes("Romero")).toBeTrue();
        expect(msj.includes("01234567H")).toBeTrue();
        expect(msj.includes("19")).toBeTrue();
        expect(msj.includes("22")).toBeTrue();
        expect(msj.includes("Calle A,123,Sevilla,España")).toBeTrue();
        expect(msj.includes("2018")).toBeTrue();

        })
})

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - gimnasia.descargarRuta
 - gimnasia.procesarAcercaDe
 - gimnasia.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
