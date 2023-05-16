/**
 * @file gimnasia.js
 * @description Funciones para el procesamiento de la info enviada por el MS gimnasia
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let gimnasia = {};

// gimnasia de datosDescargados vacíos
gimnasia.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


// gimnasia de datosAtletas vacíos
gimnasia.datosAtletasNulos = {
    nombre: "undefined",
    apellido: "undefined",
    edad: "undefined",
    dni: "undefined",
    medallas: "undefined",
    direccion: "undefined",
    rankingMundial: "undefined",
}

// gimnasia de tags 
gimnasia.gimnasiaTags = {

    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###",
    "EDAD": "### EDAD ###",
    "DNI": "### DNI ###",
    "MEDALLAS": "### MEDALLAS ###",
    "DIRECCION": "### DIRECCION ###",
    "RANKINGMUNDIAL": "### RANKINGMUNDIAL ###"

}


/**
 * Función que descarga la info MS gimnasia al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
gimnasia.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio gimnasia
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
 * Función principal para mostrar los datos enviados por la ruta "home" de MS gimnasia
 */
gimnasia.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("gimnasia Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS gimnasia
 */
gimnasia.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("gimnasia Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
gimnasia.procesarHome = function () {
    this.descargarRuta("/gimnasia/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
gimnasia.procesarAcercaDe = function () {
    this.descargarRuta("/gimnasia/acercade", this.mostrarAcercaDe);
}



gimnasia.gimnasiaTablaAtletas = {}

// Cabecera de la tabla para solo los nombres
gimnasia.gimnasiaTablaAtletas.cabeceraNombres = `<table width="100%" class="listado-atletas">
<thead>
    <th width="15%">Nombre</th>
    <th width="15%">Apellido</th>
</thead>
<tbody>`;

// Cabecera de la tabla para todos los datos
gimnasia.gimnasiaTablaAtletas.cabeceraCompleta = `<table width="100%" class="listado-atletas-completo">
<thead>
    <th >Dni</th>
    <th >Nombre</th>
    <th >Apellido</th>
    <th >RankingMundial</th>
    <th >Edad</th>
    <th >Direccion</th>
    <th >medallas</th>
</thead>
<tbody>`;

gimnasia.gimnasiaTablaAtletas.cuerpoNombres = `
<tr title="${gimnasia.gimnasiaTags.NOMBRE}">
    
    <td>${gimnasia.gimnasiaTags.NOMBRE}</td>
    <td>${gimnasia.gimnasiaTags.APELLIDO}</td>
</tr>
`;
//pie de la tabla 
gimnasia.gimnasiaTablaAtletas.pie = `</tbody>
</table>
`;
//Elementos RT que muestra los datos de un Atleta
gimnasia.gimnasiaTablaAtletas.cuerpoCompleto = `
<tr title="${gimnasia.gimnasiaTags.NOMBRE}">
    <td>${gimnasia.gimnasiaTags.DNI}</td>
    <td>${gimnasia.gimnasiaTags.NOMBRE}</td>
    <td>${gimnasia.gimnasiaTags.APELLIDO}</td>
    <td>${gimnasia.gimnasiaTags.RANKINGMUNDIAL}</td>
    <td>${gimnasia.gimnasiaTags.EDAD}</td>
    <td>${gimnasia.gimnasiaTags.DIRECCION}</td>
    <td>${gimnasia.gimnasiaTags["MEDALLAS"]}</td>
</tr>
`;



/**
 * @param {String} gimnasia Cadena conteniendo HTML en la que se desea cambiar lso campos de la gimnasia por datos
 * @param {gimnasia} Atleta Objeto con los datos del Atleta que queremos escribir en el TR
 * @returns La gimnasia del cuerpo de la tabla con los datos actualizados 
 */ 
gimnasia.sustituyeTags = function (gim, Atleta) {
    return gim
        .replace(new RegExp(gimnasia.gimnasiaTags.DNI, 'g'), Atleta.data.dni)
        .replace(new RegExp(gimnasia.gimnasiaTags.NOMBRE, 'g'), Atleta.data.nombre)
        .replace(new RegExp(gimnasia.gimnasiaTags.APELLIDO, 'g'), Atleta.data.apellido)
        .replace(new RegExp(gimnasia.gimnasiaTags.RANKINGMUNDIAL, 'g'), Atleta.data.rankingMundial)
        .replace(new RegExp(gimnasia.gimnasiaTags.EDAD, 'g'), Atleta.data.edad)
        .replace(new RegExp(gimnasia.gimnasiaTags.DIRECCION, 'g'), Atleta.data.direccion.calle +", "+Atleta.data.direccion.numero +", "+Atleta.data.direccion.ciudad+", "+Atleta.data.direccion.pais)
        .replace(new RegExp(gimnasia.gimnasiaTags["MEDALLAS"], 'g'), Atleta.data.medallas)

}
/**
 * Actualiza el cuerpo de la tabla con los datos de el Atleta que se le pasa
 * @param {Atleta} Atleta Objeto con los datos de la persona que queremos escribir el TR
 * @returns La gimnasia des cuerpo de la tabla con los datos actualizados
 */
gimnasia.gimnasiaTablaAtletas.actualiza = function (Atleta) {
    return gimnasia.sustituyeTags(this.cuerpoCompleto, Atleta)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del Atleta que se le pasa
 * @param {Atleta} Atleta Objeto con los datos de la persona que queremos escribir el TR
 * @returns La gimnasia de cuerpo de la tabla con los datos actualizados
 */
gimnasia.gimnasiaTablaAtletas.actualizaNombres = function (Atleta) {
    return gimnasia.sustituyeTags(this.cuerpoNombres, Atleta)
}


/**
 * Actualiza el cuerpo de la tabla con los datos del Atleta que se le pasa
 * @param {Atleta} Atleta Objeto con los datos de la persona que queremos escribir el TR
 * @returns La gimnasia de cuerpo de la tabla con los datos actualizados
 */
gimnasia.gimnasiaTablaAtletas.actualizaNombresOrdenados = function (Atleta) {
    return gimnasia.sustituyeTags(this.cuerpoNombres, Atleta)
}
/**
 * Función para mostrar solo los nombre de todos los Atletas
 * que se recuperan de la BBDD
 * @param {vector_de_Atletas} vector 
 */
gimnasia.imprimeCompleto = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = gimnasia.gimnasiaTablaAtletas.cabeceraCompleta
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += gimnasia.gimnasiaTablaAtletas.actualiza(e));
    }
    msj += gimnasia.gimnasiaTablaAtletas.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("gimnasia del listado de todos los datos de todos los Atletas", msj)
}


/**
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

gimnasia.recupera = async function (callBackFn, direccion) {
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

    
    let vectorAtletas = null
    if (response) {
        vectorAtletas  = await response.json()
        callBackFn(vectorAtletas.data)
    }
}


/**
 * Función principal para recuperar solo los nombres de los Atletas desde el MS, y posteriormente imprimirlos
 */
gimnasia.procesarListaEntera = function () {
    gimnasia.recupera(gimnasia.imprimeCompleto,"/gimnasia/get_Atletas_completos");}
    
/**
 * @param {vector_de_Atletas} vector 
 */
gimnasia.imprimeSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = gimnasia.gimnasiaTablaAtletas.cabeceraNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += gimnasia.gimnasiaTablaAtletas.actualizaNombres(e));
    }
    msj += gimnasia.gimnasiaTablaAtletas.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("gimnasia del listado de los nombres de todos los Atletas", msj)
}



/**
 * Función que recupera todos los Atletas llamando al MS gimnasia
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} nombreBuscado El nombre que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
gimnasia.BuscaPorNombre = async function (nombreBuscado, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/get_Atletas_completos"
        const response = await fetch(url);
        let vectorAtletas = null
        if (response) {
            vectorAtletas = await response.json()

                const filtro = vectorAtletas.data.filter(Atleta => Atleta.data.nombre === nombreBuscado)
                callBackFn(filtro)    


        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

/**






/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_Atletas} vector 
 */
gimnasia.imprimeOrdenados = function(vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = gimnasia.gimnasiaTablaAtletas.cabeceraNombres
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

        vector.forEach(e => msj += gimnasia.gimnasiaTablaAtletas.actualizaNombresOrdenados(e));
    }
    msj += gimnasia.gimnasiaTablaAtletas.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("gimnasia del listado de los nombres de todos los Atletas ordenados", msj)
}

/**
 * Función que recupera todos los Atletas llamando al MS gimnasia
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recperados.
 * @param {string} criterio1 El primer criterio que se busca
 * @param {string} criterio2 El segundo criterio que se busca
 * @param {string} criterio3 El tercer criterio que se busca
 * @param {funcion} callBackFn Función a la que se llamará una vez recibidos los datos
 */
gimnasia.BuscaPorCriteriosTodos = async function (criterio1, criterio2, criterio3,tipo, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/gimnasia/get_Atletas_completos"
        const response = await fetch(url);
        let vectorAtletas = null
        if (response) {
            vectorAtletas = await response.json()

            if(tipo){
                const filtro = vectorAtletas.data.filter(Atleta => Atleta.data.nombre === criterio1 && Atleta.data.apellido === criterio2 && Atleta.data.edad === parseInt(criterio3))
                callBackFn(filtro)    
            }else{
            const filtro = vectorAtletas.data.filter(Atleta => Atleta.data.nombre === criterio1 || Atleta.data.apellido === criterio2 || Atleta.data.edad === parseInt(criterio3))
            callBackFn(filtro)}
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Geteway")
        console.error(error)
    }
}

gimnasia.procesarListaCriteriosPrecisa = function (aspecto1, aspecto2, aspecto3, tipo) {
    this.BuscaPorCriteriosTodos(aspecto1, aspecto2, aspecto3,tipo, this.imprimeCompleto); 
}


/**
 * Función que muestra los arqueros con los criterios indicados exactamente
 * @param {string} nombre El nombre que se busca
 */
gimnasia.procesarListaBusquedaNombre = function (nombre) {
    this.BuscaPorNombre(nombre, this.imprimeCompleto); 
}


/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_Atletas} vector 
 */
gimnasia.Ordena = function(vector) {

    vector.sort(function(min, max) {
        let nameMin = min.data.name.toUpperCase(); 
        let nameMax = max.data.name.toUpperCase(); 
        if (nameMin < nameMax) {
            return -1;
        }
        if (nameMin > nameMax) {
            return 1;
        }
        return 0;
    });

}


/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_Atletas} vector 
 */
gimnasia.imprimeOrdenados = function(vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = gimnasia.gimnasiaTablaAtletas.cabeceraNombres
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

        vector.forEach(e => msj += gimnasia.gimnasiaTablaAtletas.actualizaNombresOrdenados(e));
    }
    msj += gimnasia.gimnasiaTablaAtletas.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("gimnasia del listado de los nombres de todos los atletas ordenados", msj)
}

/**
 * Función principal para recuperar solo los nombres de los Atleta desde el MS, y posteriormente imprimirlos
 */
gimnasia.procesarListaNombre = function () {
    gimnasia.recupera(gimnasia.imprimeSoloNombres,"/gimnasia/get_Atletas");
}


/**
 * Funcion que lista los nombres de los Atletas ordenados alfabéticamente
 */
gimnasia.procesarListaNombreOrdenado = function() {
    gimnasia.recupera(gimnasia.imprimeOrdenados,"/gimnasia/get_Atletas");
}

/**
 * Funcion que lista los nombres de los Atletas ordenados alfabéticamente
 */
gimnasia.procesarListaNombreOrdenado = function() {
    gimnasia.recupera(gimnasia.imprimeOrdenados,"/gimnasia/get_Atletas");
}


