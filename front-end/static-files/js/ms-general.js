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
    "APELLIDO": "### APELLIDO ###",
    "DEPORTE": "### DEPORTE ###"
  
}




/**
 * Función que descarga la info MS general al llamar a una de sus rutas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
general.descargarRuta = async function (callBackFn) {
    let response_tiro_con_arco = null
    let response_balonmano = null
    let response_motonautica = null
    let response_futbol = null
    let response_gimnasia = null

    // Intento conectar con el microservicio 
    try {
        const url_tiro_con_arco = Frontend.API_GATEWAY + "/tiro_con_arco/acercade"
        const url_balonmano = Frontend.API_GATEWAY + "/balonmano/acercade"
        const url_motonautica = Frontend.API_GATEWAY + "/motonautica/acercade"
        const url_futbol = Frontend.API_GATEWAY + "/futbol/acercade"
        const url_gimnasia = Frontend.API_GATEWAY + "/gimnasia/acercade"

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


    let acercadeArqueros = null
    let acercadeJugadores = null
    let acercadePilotos = null
    let acercadeFutbolistas = null
    let acercadeAtletas = null

    if (response_tiro_con_arco && response_balonmano && response_motonautica && response_futbol && response_gimnasia) {
        acercadeArqueros  = await response_tiro_con_arco.json()
        acercadeJugadores  = await response_balonmano.json()
        acercadePilotos  = await response_motonautica.json()
        acercadeFutbolistas  = await response_futbol.json()
        acercadeAtletas  = await response_gimnasia.json()
        callBackFn(acercadeArqueros, acercadeJugadores, acercadePilotos, acercadeFutbolistas, acercadeAtletas)
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

/**
 * Función principal para mostrar los datos enviados por la ruta "AcercaDe" de MS general
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
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
general.procesarAcercaDe = function () {
    this.descargarRuta("/motonautica/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
general.mostrarAcercaDe = function (datosArqueros, datosJugadores, datosPilotos, datosFutbolistas, datosAtletas) {
    // Si no se ha proporcionado valor para datosDescargados
    datosArqueros = datosArqueros || this.datosDescargadosNulos
    datosJugadores = datosJugadores || this.datosDescargadosNulos
    datosPilotos = datosPilotos || this.datosDescargadosNulos
    datosFutbolistas = datosFutbolistas || this.datosDescargadosNulos
    datosAtletas = datosAtletas || this.datosDescargadosNulos

    let datosDescargados = general.datosDescargadosNulos;

    let comprueba = true;
        // Si datos descargados NO es un objeto
    if (typeof datosArqueros !== "object"){
        datosArqueros = this.datosDescargadosNulos
        comprueba = false;
    }

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosArqueros.mensaje === "undefined" ||
        typeof datosArqueros.autor === "undefined" ||
        typeof datosArqueros.email === "undefined" ||
        typeof datosArqueros.fecha === "undefined"
    ){ datosArqueros = this.datosDescargadosNulos;
        comprueba = false;
    }

    if (typeof datosJugadores !== "object"){
        datosJugadores = this.datosDescargadosNulos;
        comprueba = false;
    }

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosJugadores.mensaje === "undefined" ||
        typeof datosJugadores.autor === "undefined" ||
        typeof datosJugadores.email === "undefined" ||
        typeof datosJugadores.fecha === "undefined"
    ){
        datosJugadores = this.datosDescargadosNulos;
        comprueba = false;
    }

    if (typeof datosPilotos !== "object"){
        datosPilotos = this.datosDescargadosNulos;
        comprueba = false;
    }

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosPilotos.mensaje === "undefined" ||
        typeof datosPilotos.autor === "undefined" ||
        typeof datosPilotos.email === "undefined" ||
        typeof datosPilotos.fecha === "undefined"
    ){
        datosPilotos = this.datosDescargadosNulos;
        comprueba = false;
    }

    if (typeof datosFutbolistas !== "object"){
        datosFutbolistas = this.datosDescargadosNulos;
        comprueba = false;
    }

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosFutbolistas.mensaje === "undefined" ||
        typeof datosFutbolistas.autor === "undefined" ||
        typeof datosFutbolistas.email === "undefined" ||
        typeof datosFutbolistas.fecha === "undefined"
    ){
        datosFutbolistas = this.datosDescargadosNulos;
        comprueba = false;
    }

    if (typeof datosAtletas !== "object"){
        datosAtletas = this.datosDescargadosNulos;
        comprueba = false;
    }

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosAtletas.mensaje === "undefined" ||
        typeof datosAtletas.autor === "undefined" ||
        typeof datosAtletas.email === "undefined" ||
        typeof datosAtletas.fecha === "undefined"
    ) {
        datosAtletas = this.datosDescargadosNulos
        comprueba = false;
    }

    if(comprueba){
        datosDescargados.mensaje =  "Proyecto Multiples Microservicios: acerca de";
        datosDescargados.autor = datosArqueros.autor+ ", " +datosJugadores.autor + ", " +datosPilotos.autor + ", " +datosFutbolistas.autor + ", " +datosAtletas.autor;
        datosDescargados.email = datosArqueros.email + ", " +datosJugadores.email + ", " +datosPilotos.email + ", " +datosFutbolistas.email + ", " +datosAtletas.email;
        datosDescargados.fecha = "18/4/2023";
    }


    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autores</b>: ${datosDescargados.autor}</li>
        <li><b>E-mails</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Acerca de todos los miembros de proyecto", mensajeAMostrar)
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
general.procesarAcercaDe = function () {
    this.descargarRuta(this.mostrarAcercaDe);
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

//Elementos RT que muestra los nombre y apellido de un Deportista
general.generalTablaJugadores.cuerpoNombres = `
<tr title="${general.generalTags.NOMBRE}">
    
    <td>${general.generalTags.NOMBRE}</td>
    <td>${general.generalTags.APELLIDO}</td>
</tr>
`;

// Cabecera de la tabla para solo los nombres y deporte
general.generalTablaJugadores.cabeceraCompleto = `<table width="100%" class="listado_general">
<thead>
    <th width="15%">Nombre</th>
    <th width="15%">Apellido</th>
    <th width="15%">Deporte</th>
</thead>
<tbody>`;
//Elementos RT que muestra los nombre y apellido y deporte de un Deportista
general.generalTablaJugadores.cuerpoCompleto = `
<tr title="${general.generalTags.NOMBRE}">
    <td>${general.generalTags.NOMBRE}</td>
    <td>${general.generalTags.APELLIDO}</td>
    <td>${general.generalTags.DEPORTE}</td>
   
</tr>
`;
//pie de la tabla 
general.generalTablaJugadores.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la tagsArquero deseada con los datos del arquero que se le pasa
 * @param {String} tagsArquero Cadena conteniendo HTML en la que se desea cambiar lso campos de la tagsArquero por datos
 * @param {general} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La tagsArquero del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsArqueros = function (tagsArquero, arquero) {
    return tagsArquero
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), arquero.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), arquero.data.apellido)
        .replace(new RegExp(general.generalTags.DEPORTE, 'g'), "Tiro con Arco")
        
}

/**
 * Actualiza el cuerpo de la general deseada con los datos del jugador que se le pasa
 * @param {String} tagsJugador Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} jugador Objeto con los datos del jugador que queremos escribir en el TR
 * @returns La tagsJugador del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsJugadores = function (tagsJugador, jugador) {
    return tagsJugador
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), jugador.data.name)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), jugador.data.surname)
        .replace(new RegExp(general.generalTags.DEPORTE, 'g'), "Balonmano")
}

/**
 * Actualiza el cuerpo de la general deseada con los datos del piloto que se le pasa
 * @param {String} tagsPiloto Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} piloto Objeto con los datos del piloto que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsPilotos = function (tagsPiloto, piloto) {
    return tagsPiloto
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), piloto.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), piloto.data.apellido)
        .replace(new RegExp(general.generalTags.DEPORTE, 'g'), "Motonáutica")
}

/**
 * Actualiza el cuerpo de la tagsFutbolista deseada con los datos del futbolista que se le pasa
 * @param {String} tagsFutbolista Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} futbolista Objeto con los datos del futbolista que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsFutbolistas = function (tagsFutbolista, futbolista) {
    return tagsFutbolista
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), futbolista.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), futbolista.data.apellidos)
        .replace(new RegExp(general.generalTags.DEPORTE, 'g'), "Fútbol")
}

/**
 * Actualiza el cuerpo de la tagsAtleta deseada con los datos del atleta que se le pasa
 * @param {String} tagsAtleta Cadena conteniendo HTML en la que se desea cambiar lso campos de la general por datos
 * @param {general} atleta Objeto con los datos del atleta que queremos escribir en el TR
 * @returns La general del cuerpo de la tabla con los datos actualizados 
 */ 
general.sustituyeTagsAtletas = function (tagsAtleta, atleta) {
    return tagsAtleta
        .replace(new RegExp(general.generalTags.NOMBRE, 'g'), atleta.data.nombre)
        .replace(new RegExp(general.generalTags.APELLIDO, 'g'), atleta.data.apellido)
        .replace(new RegExp(general.generalTags.DEPORTE, 'g'), "Gimnasia")
}

/**
 * Actualiza el cuerpo de la tabla con los datos del player que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresArqueros = function (player) {
    return general.sustituyeTagsArqueros(this.cuerpoNombres, player)
}

general.generalTablaJugadores.actualizaNombresArquerosCompletos = function (player) {
    return general.sustituyeTagsArqueros(this.cuerpoCompleto, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del player que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresJugadores = function (player) {
    return general.sustituyeTagsJugadores(this.cuerpoNombres, player)
}


general.generalTablaJugadores.actualizaNombresJugadoresCompletos = function (player) {
    return general.sustituyeTagsJugadores(this.cuerpoCompleto, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del player que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresPilotos = function (player) {
    return general.sustituyeTagsPilotos(this.cuerpoNombres, player)
}


general.generalTablaJugadores.actualizaNombresPilotosCompletos = function (player) {
    return general.sustituyeTagsPilotos(this.cuerpoCompleto, player)
}
/**
 * Actualiza el cuerpo de la tabla con los datos del player que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresFutbolistas = function (player) {
    return general.sustituyeTagsFutbolistas(this.cuerpoNombres, player)
}

general.generalTablaJugadores.actualizaNombresFutbolistasCompletos = function (player) {
    return general.sustituyeTagsFutbolistas(this.cuerpoCompleto, player)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del player que se le pasa
 * @param {player} player Objeto con los datos de la persona que queremos escribir el TR
 * @returns La general de cuerpo de la tabla con los datos actualizados
 */
general.generalTablaJugadores.actualizaNombresAtletas = function (player) {
    return general.sustituyeTagsAtletas(this.cuerpoNombres, player)
}

general.generalTablaJugadores.actualizaNombresAtletasCompletos = function (player) {
    return general.sustituyeTagsAtletas(this.cuerpoCompleto, player)
}
/**
 * Función que recuperar todos los jugadores llamando al MS general
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
 * @param {vectorArqueros} vectorArqueros
 * @param {vectorJugadores} vectorJugadores
 * @param {vectorPilotos} vectorPilotos
 * @param {vectorFutbolistas} vectorFutbolistas
 * @param {vectorAtletas} vectorAtletas
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

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vectorArqueros} vectorArqueros
 * @param {vectorJugadores} vectorJugadores
 * @param {vectorPilotos} vectorPilotos
 * @param {vectorFutbolistas} vectorFutbolistas
 * @param {vectorAtletas} vectorAtletas
 */
general.imprimeBusca = function (vectorArqueros, vectorJugadores, vectorPilotos, vectorFutbolistas, vectorAtletas) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = general.generalTablaJugadores.cabeceraCompleto


    if (Array.isArray(vectorArqueros) && Array.isArray(vectorJugadores) && Array.isArray(vectorPilotos) && Array.isArray(vectorFutbolistas) && Array.isArray(vectorAtletas)) {
        vectorArqueros.forEach(e => msj += general.generalTablaJugadores.actualizaNombresArquerosCompletos(e));
        vectorJugadores.forEach(e => msj += general.generalTablaJugadores.actualizaNombresJugadoresCompletos(e));
        vectorPilotos.forEach(e => msj += general.generalTablaJugadores.actualizaNombresPilotosCompletos(e));
        vectorFutbolistas.forEach(e => msj += general.generalTablaJugadores.actualizaNombresFutbolistasCompletos(e));
        vectorAtletas.forEach(e => msj += general.generalTablaJugadores.actualizaNombresAtletasCompletos(e));
    }
    msj += general.generalTablaJugadores.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de los nombres de los jugadores que incluyen una cadena y su deporte correspondiente", msj)
}

/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
general.procesarListaBusca = function (cadena) {
    general.recuperaCadena(general.imprimeBusca, cadena);
}

/**
 * Función que recuperar todos los arqueros llamando al MS general
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

general.recuperaCadena = async function (callBackFn, cadena) {
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

        const filtroArqueros = vectorArqueros.data.filter(player => player.data.nombre.includes(cadena) === true || player.data.apellido.includes(cadena) === true );
        const filtroJugadores = vectorJugadores.data.filter(player => player.data.name.includes(cadena) === true || player.data.surname.includes(cadena) === true );
        const filtroPilotos= vectorPilotos.data.filter(player => player.data.nombre.includes(cadena) === true || player.data.apellido.includes(cadena) === true );
        const filtroFutbolistas = vectorFutbolistas.data.filter(player => player.data.nombre.includes(cadena) === true || player.data.apellidos.includes(cadena) === true );
        const filtroAtletas = vectorAtletas.data.filter(player => player.data.nombre.includes(cadena) === true || player.data.apellido.includes(cadena) === true );

        callBackFn(filtroArqueros, filtroJugadores, filtroPilotos, filtroFutbolistas, filtroAtletas)
    }
}