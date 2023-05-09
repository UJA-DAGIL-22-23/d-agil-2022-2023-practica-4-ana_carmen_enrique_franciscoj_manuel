/**
 * @file motonautica.js
 * @description Funciones para el procesamiento de la info enviada por el MS motonautica
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let motonautica = {};

// motonautica de datosDescargados vacíos
motonautica.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS motonautica al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
motonautica.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio motonautica
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS motonautica
 */
motonautica.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("motonautica Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS motonautica
 */
motonautica.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("motonautica Acerca de", mensajeAMostrar)
}

/**
 * Función que recuperar todos los pilotos llamando al MS motonautica
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

motonautica.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/motonautica/get_pilotos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los pilotos que se han descargado
    let vectorPilotos = null
    if (response) {
        vectorPilotos = await response.json()
        callBackFn(vectorPilotos.data)
    }
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
motonautica.procesarHome = function () {
    this.descargarRuta("/motonautica/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
motonautica.procesarAcercaDe = function () {
    this.descargarRuta("/motonautica/acercade", this.mostrarAcercaDe);
}

/**
 * Actualiza el cuerpo de la motonautica deseada con los datos del piloto que se le pasa
 * @param {String} motonautica Cadena conteniendo HTML en la que se desea cambiar lso campos de la motonautica por datos
 * @param {motonautica} piloto Objeto con los datos del piloto que queremos escribir en el TR
 * @returns La motonautica del cuerpo de la tabla con los datos actualizados 
 */ 
motonautica.sustituyeTags = function (motonautica, piloto) {
    return motonautica
        .replace(new RegExp(motonautica.motonauticaTags.nombre, 'g'), piloto.data.nombre)
        .replace(new RegExp(motonautica.motonauticaTags.apellido, 'g'), piloto.data.apellido)
}

// Tags que voy a usar para sustituir los campos
motonautica.motonauticaTags = {
    "nombre": "### nombre ###",
    "apellido": "### apellido ###",
    "edad": "### edad ###",
    "motos": "### motos ###",
    "playasvisitadas": "### playasvisitadas ###",
}

/// motonautica para poner los datos de varios pilotos dentro de una tabla
motonautica.motonauticaTablaPilotos = {}

// Cabecera de la tabla de pilotos
motonautica.motonauticaTablaPilotos.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                    </thead>
                    <tbody>`;

// Elemento TR que muestra los nombres y apellidos de los pilotos
motonautica.motonauticaTablaPilotos.cuerpo = `
    <tr title="${motonautica.motonauticaTags.nombre}">
        <td>${motonautica.motonauticaTags.nombre}</td>
        <td>${motonautica.motonauticaTags.apellido}</td>
        <td>
                    <div></div>
        </td>
    </tr>
    `;

// Pie de la tabla
motonautica.motonauticaTablaPilotos.pie = `</tbody></table>`;

/**
 * Función para mostrar en pantalla todos los nombres de pilotos que se han recuperado de la BBDD.
 * @param {Vector_de_pilotos} vector Vector con los datos de los pilotos a mostrar
 */

motonautica.imprimenombres = function (vector) {
    let msj = motonautica.motonauticaTablaPilotos.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += motonautica.motonauticaTablaPilotos.actualizapiloto(e));
    }
    msj += motonautica.motonauticaTablaPilotos.pie

    Frontend.Article.actualizar("Nombres de los pilotos", msj)
}

/**
 * Actualiza el formulario con los datos del piloto que se le pasa
 * @param {motonautica} motonautica Objeto con los datos del piloto que queremos escribir en el TR
 * @returns La motonautica del cuerpo de la tabla con los datos actualizados 
 */
motonautica.motonauticaTablaPilotos.actualizapiloto = function (piloto) {
    return motonautica.sustituyeTags(this.cuerpo, piloto)
}

/**
 * Función principal para recuperar los pilotos desde el MS y, posteriormente, imprimirlos.
 */
motonautica.procesarlistado = function () {
    motonautica.recupera(motonautica.imprimenombres);
}

/**
 * Función que recuperar todos los pilotos llamando al MS motonautica
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

motonautica.recuperacom = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/motonautica/get_pilotos_completos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los pilotos que se han descargado
    let vectorPilotos = null
    if (response) {
        vectorPilotos = await response.json()
        callBackFn(vectorPilotos.data)
    }
}

/**
 * Actualiza el cuerpo de la motonautica deseada con los datos del piloto que se le pasa
 * @param {String} motonautica Cadena conteniendo HTML en la que se desea cambiar los campos de la motonautica por datos
 * @param {motonautica} piloto Objeto con los datos del piloto que queremos escribir en el TR
 * @returns La motonautica del cuerpo de la tabla con los datos actualizados 
 */ 
motonautica.sustituyeTagscompleto = function (motonautica, piloto) {
    return motonautica
        .replace(new RegExp(motonautica.motonauticaTags.nombre, 'g'), piloto.data.nombre)
        .replace(new RegExp(motonautica.motonauticaTags.apellido, 'g'), piloto.data.apellido)
        .replace(new RegExp(motonautica.motonauticaTags.edad, 'g'), piloto.data.edad)
        .replace(new RegExp(motonautica.motonauticaTags.motos, 'g'), piloto.data.motos.nombre+"/"
        +piloto.data.motos.plazas+"/"+piloto.data.motos.peso)
        .replace(new RegExp(motonautica.motonauticaTags["playasvisitadas"], 'g'), piloto.data.playasvisitadas)
}

/// motonautica para poner los datos de varios pilotos dentro de una tabla
motonautica.motonauticaTablaPilotoscom = {}

// Cabecera de la tabla de pilotos
motonautica.motonauticaTablaPilotoscom.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="20%">Edad</th>
                        <th width="20%">Motos</th>
                        <th width="20%">Playas visitadas</th>
                    </thead>
                    <tbody>`;

// Elemento TR que muestra los datos de los pilotos
motonautica.motonauticaTablaPilotoscom.cuerpo = `
    <tr title="${motonautica.motonauticaTags.nombre}">
        <td>${motonautica.motonauticaTags.nombre}</td>
        <td>${motonautica.motonauticaTags.apellido}</td>
        <td>${motonautica.motonauticaTags.edad}</td>
        <td>${motonautica.motonauticaTags.motos}</td>
        <td>${motonautica.motonauticaTags["playasvisitadas"]}</td>
        <td><div></div>
        </td>
    </tr>
    `;

// Pie de la tabla
motonautica.motonauticaTablaPilotoscom.pie = `</tbody>
</table>`;

/**
 * Actualiza el formulario con los datos del piloto que se le pasa
 * @param {motonautica} motonautica Objeto con los datos del piloto que queremos escribir en el TR
 * @returns La motonautica del cuerpo de la tabla con los datos actualizados 
 */

motonautica.motonauticaTablaPilotoscom.actualizapilotocom = function (piloto) {
    return motonautica.sustituyeTagscompleto(this.cuerpo, piloto)
}


/**
 * Función para mostrar en pantalla todos los datos de pilotos que se han recuperado de la BBDD.
 * @param {Vector_de_pilotos} vector Vector con los datos de los pilotos a mostrar
 */

motonautica.imprimenombrescompleto = function (vector) {
    let msj = motonautica.motonauticaTablaPilotoscom.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += motonautica.motonauticaTablaPilotoscom.actualizapilotocom(e));
    }
    msj += motonautica.motonauticaTablaPilotoscom.pie

    Frontend.Article.actualizar("Datos de los pilotos", msj)
}


/**
 * Función principal para recuperar los pilotos desde el MS y, posteriormente, imprimirlos.
 */
motonautica.procesarlistadocompleto = function () {
    motonautica.recuperacom(motonautica.imprimenombrescompleto);
}

/**
 * Función que imprime todos los datos de todos los pilotos ordenados alfabéticamente
 * @param {Vector_de_pilotos} vector 
 */
motonautica.imprimeorden = function(vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = motonautica.motonauticaTablaPilotos.cabecera
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a, b) {
            let nombreA = a.data.nombre.toUpperCase(); 
            let nombreB = b.data.nombre.toUpperCase(); 
            if (nombreA > nombreB) {
                return 1;
            }
            if (nombreA < nombreB) {
                return -1;
            }
            return 0;
        });

        vector.forEach(e => msj += motonautica.motonauticaTablaPilotos.actualizapiloto(e));
    }
    msj += motonautica.motonauticaTablaPilotos.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Nombres en orden", msj)
}


/**
 * Función principal para recuperar los pilotos desde el MS y, posteriormente, ordenarlos.
 */
motonautica.ordenarlistado = function () {
    motonautica.recupera(motonautica.imprimeorden);
}

/**
 * Función que recuperar pilotos por nombre.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
motonautica.recuperanombre = async function (callBackFn,nombre) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/motonautica/get_pilotos_completos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los pilotos que se han descargado
    let vectorPilotos = null
    if (response) {
        vectorPilotos = await response.json()
        const filtro = vectorPilotos.data.filter(piloto => piloto.data.nombre === nombre)
        callBackFn(filtro)
    }
}

/**
 * Función principal para encontrar piloto por nombre.
 */
motonautica.busquedaporNombre = function (nombre) {
    motonautica.recuperanombre(motonautica.imprimenombrescompleto,nombre);
}

/**
 * Función que recupera todos los pilotos llamando al MS motonautica
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {string} criterio1 El primer criterio que se busca
 * @param {string} criterio2 El segundo criterio que se busca
 * @param {string} criterio3 El tercer criterio que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
motonautica.Buscaporcrit = async function (criterio1, criterio2, criterio3, tipo, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/motonautica/get_pilotos_completos"
        const response = await fetch(url);
        let vectorPilotos = null
        if (response) {
            vectorPilotos = await response.json()
            if(tipo){
                const filtro = vectorPilotos.data.filter(piloto => piloto.data.nombre === criterio1 || piloto.data.apellido === criterio2 || piloto.data.edad === parseInt(criterio3))
                callBackFn(filtro)    
            }else{
            const filtro = vectorPilotos.data.filter(piloto => piloto.data.nombre === criterio1 && piloto.data.apellido === criterio2 && piloto.data.edad === parseInt(criterio3))
            callBackFn(filtro)}
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}


/**
 * Función principal para encontrar piloto por criterios
 * @param {string} crit1 El primer criterio que se busca
 * @param {string} crit2 El segundo criterio que se busca
 * @param {string} crit3 El tercer criterio que se busca
 * @param {bool} tipo Tipo de busqueda a realizar
 */
motonautica.buscaCriterio = function (crit1, crit2, crit3, tipo) {
    this.Buscaporcrit(crit1, crit2, crit3, tipo, this.imprimenombrescompleto); 
}