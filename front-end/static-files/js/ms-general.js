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
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS general
 */
general.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("general Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
general.procesarHome = function () {
    this.descargarRuta("/general/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
general.procesarAcercaDe = function () {
    this.descargarRuta("/general/acercade", this.mostrarAcercaDe); //ODO
}


// general para poner los datos de varios arqueros dentro de una tabla
general.generalTablaJugadores = {}

// Cabecera de la tabla para solo los nombres
general.generalTablaJugadores.cabeceraNombres = `<table width="100%" class="listado_arqueros">
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
general.sustituyeTagsGeneral = function (tiroConArco, jugador) {
    return tiroConArco
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), jugador.data.apellido)
        
}
/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombres = function (player) {
    return general.sustituyeTagsGeneral(this.cuerpoNombres, player)
}

/**
 * Función que recuperar todos los arqueros llamando al MS general
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

general.recupera = async function (callBackFn, direccion) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + direccion
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los arqueros que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores  = await response.json()
        callBackFn(vectorArqueros.data)
    }
}

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vector_de_arqueros} vector 
 */
general.imprimeSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = general.generalTablaJugadores.cabeceraNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += general.generalTablaJugadores.actualizaNombres(e));
    }
    msj += general.generalTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de los nombres de todos los arqueros", msj)
}

/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
general.procesarListaNombre = function () {
    general.recupera(general.imprimeSoloNombres,"/general/get_arqueros");
}
