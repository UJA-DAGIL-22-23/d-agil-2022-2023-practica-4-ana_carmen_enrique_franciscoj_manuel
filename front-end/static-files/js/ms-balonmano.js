/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let BalonmanoJugador = {};

// Plantilla de datosDescargados vacíos
BalonmanoJugador.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}



/* Plantilla de datosJugadoresvacíos */
BalonmanoJugador.datosJugadoresNulos = {
    playerId: "undefined",
    name: "undefined",
    surname: "undefined",
    dateBirth: "undefined",
    seasonsPlayed: "undefined",
    goalSeason: "undefined",
    disqualified: "undefined"
}



// Plantilla de tags
BalonmanoJugador.plantillaTags = {
    "ID": "### ID ###",
    "PLAYERID": "### PLAYERID ###",
    "NAME": "### NAME ###",
    "SURNAME": "### SURNAME ###",
    "DATE_BIRTH": "### DATE_BIRTH ###",
    "SEASONS_PLAYED": "### SEASONS_PLAYED ###",
    "GOAL_SEASON": "### GOAL_SEASON ###",
    "DISQUALIFIED": "### DISQUALIFIED ###"
}



/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 *
 */
BalonmanoJugador.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
BalonmanoJugador.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
BalonmanoJugador.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
BalonmanoJugador.procesarHome = function () {
    this.descargarRuta("/balonmano/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
BalonmanoJugador.procesarAcercaDe = function () {
    this.descargarRuta("/balonmano/acercade", this.mostrarAcercaDe);
}

//Tabla donde irán los jugadores
BalonmanoJugador.plantillaTablaJugadores = {}

// Cabecera de la tabla para solo los nombres
BalonmanoJugador.plantillaTablaJugadores.headerNombres = `<table width="100%" class="listado-jugadores-balonmano">
<thead>
    <th width="5%">ID</th>
    <th width="15%">Nombre</th>
    <th width="15%">Apellidos</th>
</thead>
<tbody>`;

// Cabecera de la tabla para solo los nombres
BalonmanoJugador.plantillaTablaJugadores.headerTodosDatos = `<table width="100%" class="listado-jugadores-balonmano_completo">
<thead>
    <th width="5%">ID</th>
    <th width="10%">Nombre</th>
    <th width="10%">Apellidos</th>
    <th width="10%">Fecha de Nacimiento</th>
    <th width="20%">Temporadas Jugadas</th>
    <th width="20%">Goles por Temporada</th>
    <th width="10%">Descalificado</th>
</thead>
<tbody>`;


//Elementos RT que muestra los datos de un jugador de balonmano
BalonmanoJugador.plantillaTablaJugadores.cuerpoNombres = `
<tr title="${BalonmanoJugador.plantillaTags.NAME}">
    <td>${BalonmanoJugador.plantillaTags.PLAYERID}</td>
    <td>${BalonmanoJugador.plantillaTags.NAME}</td>
    <td>${BalonmanoJugador.plantillaTags.SURNAME}</td>
</tr>`;



//Elementos RT que muestra los datos de un jugador de balonmano
BalonmanoJugador.plantillaTablaJugadores.cuerpoCompleto = `
<tr title="${BalonmanoJugador.plantillaTags.NAME}">
    <td>${BalonmanoJugador.plantillaTags.PLAYERID}</td>
    <td>${BalonmanoJugador.plantillaTags.NAME}</td>
    <td>${BalonmanoJugador.plantillaTags.SURNAME}</td>
    <td>${BalonmanoJugador.plantillaTags.DATE_BIRTH}</td>
    <td>${BalonmanoJugador.plantillaTags["SEASONS_PLAYED"]}</td>
    <td>${BalonmanoJugador.plantillaTags["GOAL_SEASON"]}</td>
    <td>${BalonmanoJugador.plantillaTags.DISQUALIFIED}</td>
</tr>`;


//pie de la tabla
BalonmanoJugador.plantillaTablaJugadores.footer = `</tbody>
</table>
`;



/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de los jugadores de balonmano que se le pasa
 * @param {String} plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {BalonmanoJugador} player Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 * TODO TDD
 */
BalonmanoJugador.sustituyeTags = function (playerBalonmano, player) {
    return playerBalonmano
        .replace(new RegExp(BalonmanoJugador.plantillaTags.ID, 'g'), player.ref['@ref'].id)
        .replace(new RegExp(BalonmanoJugador.plantillaTags.PLAYERID, 'g'), player.data.playerId)
        .replace(new RegExp(BalonmanoJugador.plantillaTags.NAME, 'g'), player.data.name)
        .replace(new RegExp(BalonmanoJugador.plantillaTags.SURNAME, 'g'), player.data.surname)
        .replace(new RegExp(BalonmanoJugador.plantillaTags.DATE_BIRTH, 'g'), player.data.dateBirth.day + "/" + player.data.dateBirth.month +
        "/" + player.data.dateBirth.year)
        .replace(new RegExp(BalonmanoJugador.plantillaTags["SEASONS_PLAYED"], 'g'), player.data.seasonsPlayed)
        .replace(new RegExp(BalonmanoJugador.plantillaTags["GOAL_SEASON"], 'g'), player.data.goalSeason)
        .replace(new RegExp(BalonmanoJugador.plantillaTags.DISQUALIFIED, 'g'), player.data.disqualified)
}



/**
 * Actualiza el cuerpo de la tabla con los datos del jugador de balonmano que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla de cuerpo de la tabla con los datos actualizados
 * TODO TDD
 */
BalonmanoJugador.plantillaTablaJugadores.actualizaNombres = function (player) {
    return BalonmanoJugador.sustituyeTags(this.cuerpoNombres, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del jugador de balonmano que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla de cuerpo de la tabla con los datos actualizados
 * TODO TDD
 */
BalonmanoJugador.plantillaTablaJugadores.actualizaTodo = function (player) {
    return BalonmanoJugador.sustituyeTags(this.cuerpoCompleto, player)
}


/**
 * Función que recuperar todos los jugadores llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 *
 */

BalonmanoJugador.recupera = async function (callBackFn, direccion) {
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

    // Muestro todos los jugadores de balonmano que se han descargado
    let vectorPlayers = null
    if (response) {
        vectorPlayers  = await response.json()
        callBackFn(vectorPlayers.data)
    }
}



/**
 * Función para mostrar el id, nombre y apellido de los jugadores de balonmano
 * que se recuperan de la BBDD
 * @param {vector_players} vector
 * TODO TDD
 */
BalonmanoJugador.muestraSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = BalonmanoJugador.plantillaTablaJugadores.headerNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += BalonmanoJugador.plantillaTablaJugadores.actualizaNombres(e));
    }
    msj += BalonmanoJugador.plantillaTablaJugadores.footer

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los nombres de todos los jugadores de balonmano", msj)
}



/**
 * Función principal para recuperar solo los nombres de los jugadores de balonmano desde el MS, y posteriormente imprimirlos
 */
BalonmanoJugador.procesarListaNombres = function () {
    BalonmanoJugador.recupera(BalonmanoJugador.muestraSoloNombres, "/balonmano/get_lista_jugadores");
}

/**
 * Función principal para recuperar todos los datos de los jugadores de balonmano desde el MS, y posteriormente imprimirlos
 */
BalonmanoJugador.procesarListaCompleta = function () {
    BalonmanoJugador.recupera(BalonmanoJugador.muestraTodo, "/balonmano/get_lista_completa");
}

/**
 * Función para mostrar todos los datos de los jugadores de balonmano
 * que se recuperan de la BBDD
 * @param {vector_players} vector
 * TODO TDD
 */
BalonmanoJugador.muestraTodo = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = BalonmanoJugador.plantillaTablaJugadores.headerTodosDatos
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += BalonmanoJugador.plantillaTablaJugadores.actualizaTodo(e));
    }
    msj += BalonmanoJugador.plantillaTablaJugadores.footer

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de todos los datos de los jugadores de balonmano", msj)
}


/**
 * Función principal para mostrar ordenados por nombretodos los datos de los jugadores de balonmano desde el MS, y posteriormente imprimirlos
 */
BalonmanoJugador.procesarListaOrdenada = function () {
    BalonmanoJugador.recupera(BalonmanoJugador.muestraOrdenado, "/balonmano/get_lista_ordenada");
}



/**
 * Función para mostrar todos los datos de los jugadores de balonmano
 * que se recuperan de la BBDD
 * @param {vector_players} vector
 * TODO TDD
 */
BalonmanoJugador.muestraOrdenado = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = BalonmanoJugador.plantillaTablaJugadores.headerTodosDatos
    if (vector && Array.isArray(vector)) {
        BalonmanoJugador.ordena(vector)
        vector.forEach(e => msj += BalonmanoJugador.plantillaTablaJugadores.actualizaTodo(e));
    }
    msj += BalonmanoJugador.plantillaTablaJugadores.footer

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los datos de todos los jugadores de balonmano ordenados alfabeticamente", msj)
}


/**
 * Función que ordena un vector según el nombre
 * TODO TDD
 * */
BalonmanoJugador.ordena = function(vector){
    vector.sort(function (min, max) {
        let nameMin = min.data.name.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
        let nameMax = max.data.name.toUpperCase(); // convertir a mayúsculas para evitar problemas de ordenamiento
        if (nameMin < nameMax) {
            return -1;
        }
        if (nameMin > nameMax) {
            return 1;
        }
        return 0;
    });
}

/** Funcion para buscar jugadores con un cierto nombre
 *
 * */
BalonmanoJugador.busquedaNombre = function(nombre){
    BalonmanoJugador.recuperaDato(BalonmanoJugador.muestraTodo, nombre, "/balonmano/get_busqueda_nombre");
}

/**Función que recuperar todos los jugadores con cierto nombre
 @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.*/
BalonmanoJugador.recuperaDato = async function (callBackFn, nombre, direccion) {
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

    // Muestro todos los jugadores de balonmano que se han descargado
    let vectorPlayers = null
    if (response) {
        vectorPlayers  = await response.json()
        const filtro = vectorPlayers.data.filter(player => player.data.name === nombre)
        callBackFn(filtro)
    }
}

BalonmanoJugador.BuscaCriterios = function(criterio1, criterio2, criterio3, modo){
    BalonmanoJugador.recuperaDatoCriterios(BalonmanoJugador.muestraTodo, criterio1, criterio2, criterio3, modo, "/balonmano/get_busqueda_criterios");
}

BalonmanoJugador.recuperaDatoCriterios = async function(callBackFn, criterio1, criterio2, criterio3, modo, direccion){
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

    // Muestro todos los jugadores de balonmano que se han descargado
    let vectorPlayers = null
    if (response) {
        vectorPlayers  = await response.json()
        if(criterio3 == "true"){
            criterio3 = true
        }else{
            criterio3 = false
        }
        if(modo){
            const filtro = vectorPlayers.data.filter(player => player.data.surname === criterio1 || player.data.dateBirth.day + "/" + player.data.dateBirth.month +
                "/" + player.data.dateBirth.year === criterio2 || player.data.disqualified === criterio3)
            callBackFn(filtro)
        }else{
            const filtro = vectorPlayers.data.filter(player => player.data.surname === criterio1 && player.data.dateBirth.day + "/" + player.data.dateBirth.month +
                "/" + player.data.dateBirth.year === criterio2 && player.data.disqualified === criterio3)
            callBackFn(filtro)
        }
    }

}
