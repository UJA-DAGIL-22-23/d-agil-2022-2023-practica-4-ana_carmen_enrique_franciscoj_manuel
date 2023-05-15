/**
 * @file futbol.js
 * @description Funciones para el procesamiento de la info enviada por el MS Futbol
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let futbol = {};

// futbol de datosDescargados vacíos
futbol.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS futbol al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
futbol.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio futbol
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS futbol
 */
futbol.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("futbol Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS futbol
 */
futbol.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("futbol Acerca de", mensajeAMostrar)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "get_jugadores" de MS futbol
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

futbol.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/futbol/get_jugadores"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se ha podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores que se han descargado
    let vjugadores = null
    if (response) {
        vjugadores = await response.json()
        callBackFn(vjugadores.data)
    }
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
futbol.procesarHome = function () {
    this.descargarRuta("/futbol/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
futbol.procesarAcercaDe = function () {
    this.descargarRuta("/futbol/acercade", this.mostrarAcercaDe);
}

// Tags que voy a usar para sustituir los campos
futbol.futbolTags = {
    "nombre": "### nombre ###",
    "apellidos" : "### apellidos ###",
    "fnac": "### fnac ###",
    "equipos": "### equipos ###",
    "goles": "### goles ###",
}
/// futbol para poner los datos de varios jugadores dentro de una tabla
futbol.futbolTablaJugadores = {}

// Cabecera de la tabla de jugadores
futbol.futbolTablaJugadores.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                    </thead>
                    <tbody>`;

// Elemento TR que muestra los nombres y apellidos de los jugadores
futbol.futbolTablaJugadores.cuerpo = `
    <tr title="${futbol.futbolTags.nombre}">
        <td>${futbol.futbolTags.nombre}</td>
        <td>${futbol.futbolTags.apellidos}</td>
    </tr>
    `;

// Pie de la tabla
//pie de la tabla 
futbol.futbolTablaJugadores.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la futbol deseada con los datos del jugador que se le pasa
 * @param {String} futbolin Cadena conteniendo HTML en la que se desea cambiar los campos de la futbol por datos
 * @param {futbol} jugador Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La futbol del cuerpo de la tabla con los datos actualizados 
 */ 
futbol.sustituyeTags = function (futbolin, jugador) {
    return futbolin
        //.replace(new RegExp(futbol.futbolTags.nombre, 'g'), jugador.ref['@ref'].nombre)
        .replace(new RegExp(futbol.futbolTags.nombre, 'g'), jugador.data.nombre)
        .replace(new RegExp(futbol.futbolTags.apellidos, 'g'), jugador.data.apellidos)
}

/**
 * Función para mostrar en pantalla todos los nombres de los jugadores que se han recuperado de la BD.
 * @param {vector-de-jugadores} vector Vector con los datos de los jugadores a mostrar
 */

futbol.imprimenombres = function (vector) {
    let msj = futbol.futbolTablaJugadores.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += futbol.futbolTablaJugadores.actualizajugador(e));
    }
    msj += futbol.futbolTablaJugadores.pie

    Frontend.Article.actualizar("Nombres de los jugadores", msj)
}

/**
 * Actualiza el formulario con los datos del jugador que se le pasa
 * @param {futbol} futbol Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La futbol del cuerpo de la tabla con los datos actualizados 
 */
futbol.futbolTablaJugadores.actualizajugador = function (jugador) {
    return futbol.sustituyeTags(this.cuerpo, jugador)
}

/**
 * Función principal para recuperar los jugadores desde el MS y, posteriormente, imprimirlos.
 */
futbol.procesarListaJugadores = function () {
    futbol.recupera(futbol.imprimenombres);
}

/**
 * Función que recuperar todos los jugadores llamando al MS futbol
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

futbol.recuperatodo = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/futbol/get_jugadores_completa"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        callBackFn(vectorJugadores.data)
    }
}

/**
 * Actualiza el cuerpo de la futbol deseada con los datos del jugador que se le pasa
 * @param {String} futbolin Cadena conteniendo HTML en la que se desea cambiar los campos de la futbol por datos
 * @param {futbol} jugador Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La futbol del cuerpo de la tabla con los datos actualizados 
 */ 
futbol.sustituyeTodosTags = function (futbolin, jugador) {
    return futbolin
        .replace(new RegExp(futbol.futbolTags.nombre, 'g'), jugador.data.nombre)
        .replace(new RegExp(futbol.futbolTags.apellidos, 'g'), jugador.data.apellidos)
        .replace(new RegExp(futbol.futbolTags.fnac, 'g'), jugador.data.fnac.dia+"/"
                                        +jugador.data.fnac.mes+"/"+jugador.data.fnac.anio)
        .replace(new RegExp(futbol.futbolTags["equipos"], 'g'), jugador.data.equipos)
        .replace(new RegExp(futbol.futbolTags.goles, 'g'), jugador.data.goles)
}

/// futbol para poner los datos de varios jugadores dentro de una tabla
futbol.futbolTablaJugadoresAll = {}

// Cabecera de la tabla de jugadores
futbol.futbolTablaJugadoresAll.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="20%">Fecha de nacimiento</th>
                        <th width="20%">Equipos</th>
                        <th width="20%">Goles</th>
                    </thead>
                    <tbody>`;

// Elemento TR que muestra los datos de los jugadores
futbol.futbolTablaJugadoresAll.cuerpo = `
    <tr title="${futbol.futbolTags.nombre}">
        <td>${futbol.futbolTags.nombre}</td>
        <td>${futbol.futbolTags.apellidos}</td>
        <td>${futbol.futbolTags.fnac}</td>
        <td>${futbol.futbolTags["equipos"]}</td>
        <td>${futbol.futbolTags.goles}</td>
        
    `;

// Pie de la tabla
futbol.futbolTablaJugadoresAll.pie = `</tbody>
</table>
`;

             /**
 * Actualiza el formulario con los datos del jugador que se le pasa
 * @param {futbol} futbol Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La futbol del cuerpo de la tabla con los datos actualizados 
 */

futbol.futbolTablaJugadoresAll.actualizatodojugador = function (jugador) {
    return futbol.sustituyeTodosTags(this.cuerpo, jugador)
}

/**
 * Función para mostrar en pantalla todos los datos de jugadores que se han recuperado de la BD.
 * @param {Vector_de_jugadores} vector Vector con los datos de los jugadores a mostrar
 */

futbol.imprimetodo = function (vector) {
    let msj = futbol.futbolTablaJugadoresAll.cabecera
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += futbol.futbolTablaJugadoresAll.actualizatodojugador(e));
    }
    msj += futbol.futbolTablaJugadoresAll.pie

    Frontend.Article.actualizar("Datos de los jugadores", msj)
}

/**
 * Función principal para recuperar los jugadores desde el MS y, posteriormente, imprimirlos.
 */
futbol.procesarListaJugadoresCompleta = function () {
    futbol.recuperatodo(futbol.imprimetodo);
}

/**
 * Función que imprime todos los datos de todos los jugadores ordenados alfabéticamente
 * @param {Vector_de_jugadores} vector 
 */
futbol.imprimeorden = function(vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = futbol.futbolTablaJugadores.cabecera
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

        vector.forEach(e => msj += futbol.futbolTablaJugadores.actualizajugador(e));
    }
    msj += futbol.futbolTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Nombres de los jugadores ordenados alfabeticamente", msj)
}


/**
 * Función principal para recuperar los jugadores desde el MS y, posteriormente, ordenarlos.
 */
futbol.ordenaListaNombresJugadores = function () {
    futbol.recupera(futbol.imprimeorden);
}

/**
 * Función que recupera a los jugadores mediante el nombre.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
futbol.recuperanombre = async function (callBackFn,nombre) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + "/futbol/get_jugadores_completa"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los jugadores que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        const filtro = vectorJugadores.data.filter(jugador => jugador.data.nombre === nombre)
        callBackFn(filtro)
    }
}

/**
 * Función principal para encontrar jugador por nombre.
 */
futbol.busquedaporNombre = function (nombre) {
    futbol.recuperanombre(futbol.imprimetodo,nombre);
}

/**
 * Función que recupera todos los jugadores llamando al MS futbol
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {string} criterio1 El primer criterio por el que que se busca
 * @param {string} criterio2 El segundo criterio por el que se busca
 * @param {string} criterio3 El tercer criterio por el que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
futbol.buscaxCriterio = async function (criterio1, criterio2, criterio3, tipo, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/futbol/get_jugadores_completa"
        const response = await fetch(url);
        let vectorJugadores = null
        if (response) {
            vectorJugadores = await response.json()
            if(tipo){
                const filtro = vectorJugadores.data.filter(jugador => jugador.data.nombre === criterio1 || jugador.data.apellidos === criterio2 || jugador.data.goles === parseInt(criterio3))
                callBackFn(filtro)
            }else{
            const filtro = vectorJugadores.data.filter(jugador => jugador.data.nombre === criterio1 && jugador.data.apellidos === criterio2 && jugador.data.goles === parseInt(criterio3))
            callBackFn(filtro)}
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**
 * Función principal para encontrar jugador por criterios
 * @param {string} crit1 El primer criterio por el que se busca
 * @param {string} crit2 El segundo criterio por el que se busca
 * @param {string} crit3 El tercer criterio por el que se busca
 * @param {bool} tipo Tipo de busqueda a realizar
 */
futbol.buscaCriterio = function (crit1, crit2, crit3, tipo) {
    this.buscaxCriterio(crit1, crit2, crit3, tipo, this.imprimetodo); 
}

