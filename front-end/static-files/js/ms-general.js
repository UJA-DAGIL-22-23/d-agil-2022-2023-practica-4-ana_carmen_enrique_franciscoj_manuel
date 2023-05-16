/**
 * @file tiro_con_arco.js
 * @description Funciones para el procesamiento de la info enviada por el MS tiro_con_arco
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let tiro_con_arco = {};

// tiro_con_arco de datosDescargados vacíos
tiro_con_arco.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// tiro_con_arco de datosArqueros vacíos
tiro_con_arco.datosArquerosNulos = {
    nombre: "undefined",
    apellido: "undefined",
    id: "undefined",
    nacionalidad: "undefined",
    edad: "undefined",
    disparo: "undefined",
    puntuaciones_de_la_tanda: "undefined"
}

// tiro_con_arco de tags 
tiro_con_arco.tiro_con_arcoTags = {

    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###",
    "ID": "### ID ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "EDAD": "### EDAD ###",
    "DISPARO": "### DISPARO ###",
    "PUNTUACIONES_DE_LA_TANDA": "### PUNTUACIONES DE LA TANDA ###"
  
}




/**
 * Función que descarga la info MS tiro_con_arco al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
tiro_con_arco.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio tiro_con_arco
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS tiro_con_arco
 */
tiro_con_arco.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("tiro_con_arco Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS tiro_con_arco
 */
tiro_con_arco.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("tiro_con_arco Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
tiro_con_arco.procesarHome = function () {
    this.descargarRuta("/tiro_con_arco/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
tiro_con_arco.procesarAcercaDe = function () {
    this.descargarRuta("/tiro_con_arco/acercade", this.mostrarAcercaDe);
}


// tiro_con_arco para poner los datos de varios arqueros dentro de una tabla
tiro_con_arco.tiro_con_arcoTablaArqueros = {}

// Cabecera de la tabla para solo los nombres
tiro_con_arco.tiro_con_arcoTablaArqueros.cabeceraNombres = `<table width="100%" class="listado_arqueros">
<thead>
    <th width="15%">Nombre</th>
    <th width="15%">Apellido</th>
</thead>
<tbody>`;

// Cabecera de la tabla para todos los datos
tiro_con_arco.tiro_con_arcoTablaArqueros.cabeceraCompleta = `<table width="100%" class="listado_arqueros_completo">
<thead>
    <th >Id</th>
    <th >Nombre</th>
    <th >Apellido</th>
    <th >Nacionalidad</th>
    <th >Edad</th>
    <th >Disparo</th>
    <th >Puntuaciones de la Tanda</th>

</thead>
<tbody>`;

//Elementos RT que muestra los nombre y apellido de un Arquero
tiro_con_arco.tiro_con_arcoTablaArqueros.cuerpoNombres = `
<tr title="${tiro_con_arco.tiro_con_arcoTags.NOMBRE}">
    
    <td>${tiro_con_arco.tiro_con_arcoTags.NOMBRE}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags.APELLIDO}</td>
</tr>
`;
//Elementos RT que muestra los datos de un Arquero
tiro_con_arco.tiro_con_arcoTablaArqueros.cuerpoCompleto = `
<tr title="${tiro_con_arco.tiro_con_arcoTags.NOMBRE}">
    <td>${tiro_con_arco.tiro_con_arcoTags.ID}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags.NOMBRE}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags.APELLIDO}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags.NACIONALIDAD}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags.EDAD}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags.DISPARO}</td>
    <td>${tiro_con_arco.tiro_con_arcoTags["PUNTUACIONES_DE_LA_TANDA"]}</td>
   
</tr>
`;
//pie de la tabla 
tiro_con_arco.tiro_con_arcoTablaArqueros.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la tiro_con_arco deseada con los datos del arquero que se le pasa
 * @param {String} tiro_con_arco Cadena conteniendo HTML en la que se desea cambiar lso campos de la tiro_con_arco por datos
 * @param {tiro_con_arco} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La tiro_con_arco del cuerpo de la tabla con los datos actualizados 
 */ 
tiro_con_arco.sustituyeTags = function (tiroConArco, arquero) {
    return tiroConArco
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags.ID, 'g'), arquero.data.id)
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags.NOMBRE, 'g'), arquero.data.nombre)
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags.APELLIDO, 'g'), arquero.data.apellido)
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags.NACIONALIDAD, 'g'), arquero.data.nacionalidad)
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags.EDAD, 'g'), arquero.data.edad)
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags.DISPARO, 'g'), arquero.data.disparo.tipo_de_arco +", "+arquero.data.disparo.distancia_de_tiro+", "+arquero.data.disparo.tipo_de_flecha)
        .replace(new RegExp(tiro_con_arco.tiro_con_arcoTags["PUNTUACIONES_DE_LA_TANDA"], 'g'), arquero.data.puntuaciones_de_la_tanda)
        
}
/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La tiro_con_arco de cuerpo de la tabla con los datos actualizados
 */
tiro_con_arco.tiro_con_arcoTablaArqueros.actualizaNombres = function (arquero) {
    return tiro_con_arco.sustituyeTags(this.cuerpoNombres, arquero)
}
/**
 * Actualiza el cuerpo de la tabla con los datos de el arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La tiro_con_arco des cuerpo de la tabla con los datos actualizados
 */
tiro_con_arco.tiro_con_arcoTablaArqueros.actualiza = function (arquero) {
    return tiro_con_arco.sustituyeTags(this.cuerpoCompleto, arquero)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La tiro_con_arco de cuerpo de la tabla con los datos actualizados
 */
tiro_con_arco.tiro_con_arcoTablaArqueros.actualizaNombresOrdenados = function (arquero) {
    return tiro_con_arco.sustituyeTags(this.cuerpoNombres, arquero)
}

/**
 * Función que recuperar todos los arqueros llamando al MS tiro_con_arco
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

tiro_con_arco.recupera = async function (callBackFn, direccion) {
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
    let vectorArqueros = null
    if (response) {
        vectorArqueros  = await response.json()
        callBackFn(vectorArqueros.data)
    }
}

/**
 * Función que recupera todos los arqueros llamando al MS tiro_con_arco
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} criterio1 El primer criterio que se busca
 * @param {string} criterio2 El segundo criterio que se busca
 * @param {string} criterio3 El tercer criterio que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
tiro_con_arco.BuscaPorCriteriosTodos = async function (criterio1, criterio2, criterio3,tipo, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/tiro_con_arco/get_arqueros_completos"
        const response = await fetch(url);
        let vectorArqueros = null
        if (response) {
            vectorArqueros = await response.json()
            if(tipo){
                const filtro = vectorArqueros.data.filter(arquero => arquero.data.apellido === criterio1 && arquero.data.nacionalidad === criterio2 && arquero.data.edad === parseInt(criterio3))
                callBackFn(filtro)    
            }else{
            const filtro = vectorArqueros.data.filter(arquero => arquero.data.apellido === criterio1 || arquero.data.nacionalidad === criterio2 || arquero.data.edad === parseInt(criterio3))
            callBackFn(filtro)}
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**
 * Función que recupera todos los arqueros llamando al MS tiro_con_arco
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} nombreBuscado El nombre que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
tiro_con_arco.BuscaPorNombre = async function (nombreBuscado, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/tiro_con_arco/get_arqueros_completos"
        const response = await fetch(url);
        let vectorArqueros = null
        if (response) {
            vectorArqueros = await response.json()
            
                const filtro = vectorArqueros.data.filter(arquero => arquero.data.nombre === nombreBuscado)
                callBackFn(filtro)    
            

        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vector_de_arqueros} vector 
 */
tiro_con_arco.imprimeSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = tiro_con_arco.tiro_con_arcoTablaArqueros.cabeceraNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += tiro_con_arco.tiro_con_arcoTablaArqueros.actualizaNombres(e));
    }
    msj += tiro_con_arco.tiro_con_arcoTablaArqueros.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de los nombres de todos los arqueros", msj)
}

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vector_de_arqueros} vector 
 */
tiro_con_arco.imprimeCompleto = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = tiro_con_arco.tiro_con_arcoTablaArqueros.cabeceraCompleta
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += tiro_con_arco.tiro_con_arcoTablaArqueros.actualiza(e));
    }
    msj += tiro_con_arco.tiro_con_arcoTablaArqueros.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de todos los datos de todos los arqueros", msj)
}

/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_arqueros} vector 
 */
tiro_con_arco.imprimeOrdenados = function(vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = tiro_con_arco.tiro_con_arcoTablaArqueros.cabeceraNombres
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

        vector.forEach(e => msj += tiro_con_arco.tiro_con_arcoTablaArqueros.actualizaNombresOrdenados(e));
    }
    msj += tiro_con_arco.tiro_con_arcoTablaArqueros.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Listado de los nombres de todos los arqueros ordenados", msj)
}


/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
tiro_con_arco.procesarListaNombre = function () {
    tiro_con_arco.recupera(tiro_con_arco.imprimeSoloNombres,"/tiro_con_arco/get_arqueros");
}

/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
tiro_con_arco.procesarListaEntera = function () {
    tiro_con_arco.recupera(tiro_con_arco.imprimeCompleto,"/tiro_con_arco/get_arqueros_completos");
}

/**
 * Funcion que lista los nombres de los arqueros ordenados alfabéticamente
 */
tiro_con_arco.procesarListaNombreOrdenado = function() {
    tiro_con_arco.recupera(tiro_con_arco.imprimeOrdenados,"/tiro_con_arco/get_arqueros");
}

/**
 * Función que muestra los arqueros con los criterios indicados exactamente
 * @param {string} aspecto1 El primer criterio que se busca
 * @param {string} aspecto2 El segundo criterio que se busca
 * @param {string} aspecto3 El tercer criterio que se busca
 * @param {bool} tipo Tipo de busqueda a realizar
 */
tiro_con_arco.procesarListaCriteriosPrecisa = function (aspecto1, aspecto2, aspecto3, tipo) {
    this.BuscaPorCriteriosTodos(aspecto1, aspecto2, aspecto3,tipo, this.imprimeCompleto); 
}

/**
 * Función que muestra los arqueros con los criterios indicados exactamente
 * @param {string} nombre El nombre que se busca
 */
tiro_con_arco.procesarListaBusquedaNombre = function (nombre) {
    this.BuscaPorNombre(nombre, this.imprimeCompleto); 
}