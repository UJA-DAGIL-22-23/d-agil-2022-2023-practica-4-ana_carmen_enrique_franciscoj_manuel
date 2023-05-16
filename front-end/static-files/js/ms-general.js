/**
 * @file general.js
 * @description Funciones para el procesamiento de la info enviada por el MS general
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let general = {};

// general de datosDescargados vacíos
general.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// general de datosGenerales vacíos
general.datosGeneralesNulos = {
    nombre: "undefined",
    apellido: "undefined"
}

// general de tags 
general.generalTags = {

    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###"
  
}




/**
 * Función que descarga la info MS general al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
general.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio general
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS general
 */
general.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("general Home", datosDescargados.mensaje)
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
general.procesarHome = function () {
    this.descargarRuta("/general/", this.mostrarHome);
}


// general para poner los datos de varios arqueros dentro de una tabla
general.generalTablaJugadores = {}

// Cabecera de la tabla para solo los nombres
general.generalTablaJugadores.cabeceraNombres = `<table width="100%" class="listado_general">
<thead>
    <th width="15%">Nombre</th>
    <th width="15%">Apellido</th>
</thead>
<tbody>`;

//Elementos RT que muestra los nombre y apellido de un Arquero
general.generalTablaJugadores.cuerpoNombres = `
<tr title="${general.generalTags.NOMBRE}">
    
    <td>${general.generalTags.NOMBRE}</td>
    <td>${general.generalTags.APELLIDO}</td>
</tr>
`;
//Elementos RT que muestra los datos de un Arquero
general.generalTablaJugadores.cuerpoCompleto = `
<tr title="${general.generalTags.NOMBRE}">
    <td>${general.generalTags.NOMBRE}</td>
    <td>${general.generalTags.APELLIDO}</td>
   
</tr>
`;
//pie de la tabla 
general.generalTablaJugadores.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la general deseada con los datos del arquero que se le pasa
 * @param {String} general Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsArqueros = function (tagsArquero, arquero) {
    return tagsArquero
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), arquero.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), arquero.data.apellido)
        
}

/**
 * Actualiza el cuerpo de la general deseada con los datos del arquero que se le pasa
 * @param {String} general Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsJugadores = function (tagsJugador, jugador) {
    return tagsJugador
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), jugador.data.name)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), jugador.data.surname)
        
}

/**
 * Actualiza el cuerpo de la general deseada con los datos del arquero que se le pasa
 * @param {String} general Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsPilotos = function (tagsPiloto, piloto) {
    return tagsPiloto
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), piloto.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), piloto.data.apellido)
        
}

/**
 * Actualiza el cuerpo de la general deseada con los datos del arquero que se le pasa
 * @param {String} general Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsFutbolistas = function (tagsFutbolista, futbolista) {
    return tagsFutbolista
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), futbolista.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), futbolista.data.apellidos)
        
}

/**
 * Actualiza el cuerpo de la general deseada con los datos del arquero que se le pasa
 * @param {String} general Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsAtletas = function (tagsAtleta, atleta) {
    return tagsAtleta
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), atleta.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), atleta.data.apellido)
        
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresArqueros = function (player) {
    return general.sustituyeTagsArqueros(this.cuerpoNombres, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresJugadores = function (player) {
    return general.sustituyeTagsJugadores(this.cuerpoNombres, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresPilotos = function (player) {
    return general.sustituyeTagsPilotos(this.cuerpoNombres, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresFutbolistas = function (player) {
    return general.sustituyeTagsFutbolistas(this.cuerpoNombres, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresAtletas = function (player) {
    return general.sustituyeTagsAtletas(this.cuerpoNombres, player)
}

/**
 * Función que recuperar todos los arqueros llamando al MS general
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

general.recupera = async function (callBackFn) {
    let response_tiro_con_arco = null
    let response_balonmano = null
    let response_motonautica = null
    let response_futbol = null
    let response_gimnasia = null

    // Intento conectar con el microservicio 
    try {
        const url_tiro_con_arco = Frontend.API_GATEWAY + "/tiro_con_arco/get_arqueros"
        const url_balonmano = Frontend.API_GATEWAY + "/balonmano/get_lista_jugadores"
        const url_motonautica = Frontend.API_GATEWAY + "/motonautica/get_pilotos"
        const url_futbol = Frontend.API_GATEWAY + "/futbol/get_jugadores"
        const url_gimnasia = Frontend.API_GATEWAY + "/gimnasia/get_Atletas"

        response_tiro_con_arco = await fetch(url_tiro_con_arco)
        response_balonmano = await fetch(url_balonmano)
        response_motonautica = await fetch(url_motonautica)
        response_futbol = await fetch(url_futbol)
        response_gimnasia = await fetch(url_gimnasia)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }


    let vectorArqueros = null
    let vectorJugadores = null
    let vectorPilotos = null
    let vectorFutbolistas = null
    let vectorAtletas = null

    if (response_tiro_con_arco && response_balonmano && response_motonautica && response_futbol && response_gimnasia) {
        vectorArqueros  = await response_tiro_con_arco.json()
        vectorJugadores  = await response_balonmano.json()
        vectorPilotos  = await response_motonautica.json()
        vectorFutbolistas  = await response_futbol.json()
        vectorAtletas  = await response_gimnasia.json()
        callBackFn(vectorArqueros.data, vectorJugadores.data, vectorPilotos.data, vectorFutbolistas.data, vectorAtletas.data)
    }
}

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vector_de_arqueros} vector 
 */
general.imprimeSoloNombres = function (vectorArqueros, vectorJugadores, vectorPilotos, vectorFutbolistas, vectorAtletas) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = general.generalTablaJugadores.cabeceraNombres
    if (Array.isArray(vectorArqueros) && Array.isArray(vectorJugadores) && Array.isArray(vectorPilotos) && Array.isArray(vectorFutbolistas) && Array.isArray(vectorAtletas)) {
        vectorArqueros.forEach(e => msj += general.generalTablaJugadores.actualizaNombresArqueros(e));
        vectorJugadores.forEach(e => msj += general.generalTablaJugadores.actualizaNombresJugadores(e));
        vectorPilotos.forEach(e => msj += general.generalTablaJugadores.actualizaNombresPilotos(e));
        vectorFutbolistas.forEach(e => msj += general.generalTablaJugadores.actualizaNombresFutbolistas(e));
        vectorAtletas.forEach(e => msj += general.generalTablaJugadores.actualizaNombresAtletas(e));
    }
    msj += general.generalTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de los nombres de todos los jugadores de todos los deportes", msj)
}

/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
general.procesarListaNombre = function () {
    general.recupera(general.imprimeSoloNombres);
}
