[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hCaQWL7N)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10906934&assignment_repo_type=AssignmentRepo)

# **Práctica 4**

* Trello: https://trello.com/b/vTlpqkXG/desarrollo-ágil-practica-4
* GitHub: https://github.com/UJA-DAGIL-22-23/d-agil-2022-2023-practica-4-ana_carmen_enrique_franciscoj_manuel

# *Datos del equipo*

## Estudiante 1:
- **Nombre y apellidos**: Carmen Huesa Guardiola
- **Correo Electronico**: chg00016@red.ujaen.es
- **Deporte**: Tiro con arco

## Estudiante 2:
- **Nombre y apellidos**: Francisco Javier Gálvez Marín
- **Correo Electronico**: fjgm0038@red.ujaen.es
- **Deporte**: Balonmano


## Estudiante 3:
- **Nombre y apellidos**: Ana León Pulido
- **Correo Electrónico**: alp00054@red.ujaen.es
- **Deporte**: Motonaútica


## Estudiante 4:
- **Nombre y apellidos**: Manuel Lara Torres
- **Correo Electrónico**: mlt00024@red.ujaen.es
- **Deporte**: Fútbol


## Estudiante 5:
- **Nombre y apellidos**: Enrique Fernández Fernández
- **Correo Electrónico**: eff00007@red.ujaen.es
- **Deporte**: Gimasia Rítmica

# **Sprint Review**

# *Capturas de Trello al inicio:*
En PRODUCT BACKLOG se encuentran todas las historias de usuario que se van a implementar. Estas pasan al sprint backlog al inicio del sprint.
<br></br>
<img src=./assets\img\trelloInicio.png>
<br></br>
En esta imagen queda reflejado dicho proceso.
<br></br>
<img src=./assets\img\trelloInicioSprint.png>

# *Historias de usuario elegidas a implementar:* 
* HU01. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Carmen.
* HU02. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Francisco Javier.
* HU03. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Ana.
* HU04. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Manuel.
* HU05. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Enrique.
* HU06. Ver en una sola página la información de todos los autores de la aplicación al pulsar en el botón “Acerca de”.
* HU07. Ver un listado solo con los nombres de todos los jugadores/equipos de todos los deportes incluidos en la app.
* HU08. Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente de todos los deportes incluidos en la app.
* HU09. Mostrar el nombre y el deporte de todos los jugadores/equipos que contengan una determinada cadena introducida por el usuario. (Por ejemplo, si el usuario introduce “EST” se mostrarán todos los nombres junto con el deporte practicado de todos los jugadores/equipos cuyo nombre incluya “EST”).
* HU10. Modificar la visualización de la app con un modo ALTO CONTRASTE.


## HU01. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Carmen
Implementada por Carmen Huesa Guardiola

Para implementar toda la funcionalidad de mi práctica individual he tenido que:

- Modificaciones en front-end
  * Añadir la carpeta front-end de mi práctica indivual al repositorio para realizar las modificaciones a partir de ella.
  * Añadir mis ficheros ms-tiro_con_arco.js y ms-tiro_con_arco-spec.js en la carpeta js.
  * Cambiar el nombre de todas las funciones del ms-tiro_con_arco.js para que al llamarlas en el index.html no provoque ningún problema con las llamadas de mi equipo.
  * Cambiar el nombre de las definiciones de unos parametros en ms-tiro_con_arco-spec.js para que no genere problemas con los de mi equipo.
  * Modificar el fichero ms-plantilla.css de la carpeta css para llamarlo ms-tiro_con_arco.css.
  * En ms-tiro_con_arco.css crear tablas de color morado para mejorar la visualización de mi funcionalidad, tanto de los botones como de las listas resultantes de pulsarlos.
  * Cargar mis ficheros ms-tiro_con_arco.css, ms-tiro_con_arco.js y ms-tiro_con_arco-spec.js en index.html.
  * Modificar la presentación de mi microservicio en index.html.

- Modificaciones en api-gateway
  * Añadir la carpeta api-gateway de mi práctica indivual al repositorio para realizar las modificaciones a partir de ella.
  * Añadir a proxy-routes.js mi ruta.
  * Añadir a proxy-routes.js las rutas de mis compañeros de equipo, con un puerto distinto a cada uno.

- Modificaciones en ms-tiro_con_arco (anteriormente ms-plantilla en la práctica individual)
  * Añadir la carpeta ms-tiro_con_arco al proyecto.
  * Cambiar el nombre ms-plantilla por ms-tiro_con_arco tanto en package.json como en package-lock.json

- Modificaciones en assests
  * Subir las capturas de mi funcionalidad en img.

La siguiente captura muestra el estado de Trello una vez terminada la historia de usuario.

<img src=./assets\img\HU01trello.png>


En estas capturas muestro la funcionalidad de mi microservicio. La primera muestra los distintos botones tanto para mostras las listas como los de búsqueda.

<img src=./assets\img\HU01terminada.png>


Esta segunda, muestra el resultado de hacer una búsqueda por algún criterio, siendo el criterio por el que buscar de entre los arqueros que tengan nacionalidad española.

<img src=./assets\img\HU01terminadadatos.png>

<br></br>

## HU02. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Fran
Implementada por Francisco Javier Gálvez Marín

Para implementar la HU 02, he tenido que implementar mi ms-plantilla de la práctica anterior, para ello he realizado las siguientes moficicaciones:

- Modificaciones en front-end
  * Añadir los ficheros ms-balonmano.js y ms-balonmano-spec.js en la carpeta js.
  * Cambiar el nombre de todas las funciones de ms-balonmano.js para que cuando sean llamadas en index.html no cause conflicto ningún problema con las llamadas de los otros microservicios. Además Plantilla ahora se llama BalonmanoJugador.
  * Cambiar los spec en ms-balonmano-spec.js para adaptarse y reflejar los cambios anteriores.
  * Añadido el fichero ms-balonmano.css.
  * Modificar los contenidos de ms-balonmano.css para que los colores sean diferentes a los del resto de microservicios, en este caso tomando diferentes tonalidades de verde.
  * Cargar los ficheros ms-balonmano.css, ms-balonmano.js y ms-balonmano-spec.js en index.html.
  * Modificada la presentación del microservicio de balonmano en index.html, incluyendo los cambios en el nombre de Plantilla a BalonmanoJugador y de las variables para que tengan nombres únicos que no coincidan con el resto de microservicios.

- Modificaciones en api-gateway
  * Carmen cambió el número de la ruta de este microservicio mientras realizaba el cambio del suyo

- Modificaciones en ms-balonmano (anteriormente ms-plantilla en la práctica individual)
  * Añadir la carpeta ms-balonmano al proyecto.
  * Cambiar el nombre ms-plantilla por ms-balonmano tanto en package.json como en package-lock.json

- Modificaciones en assests
  * Capturas subidas de la funcionalidad y el trello.

En estas capturas se muestran la funcionalidad de este microservicio. La primera muestra los distintos botones y 
búsqueda dentro de la nueva tabla mientras que la segunda captura muestra la lista de todos los jugadores de 
balonmano ordenados alfabéticamente como ejemplo de que las diferentes funcionalidades operan correctamente. 
Finalmente está la captura de trello en el instante en el que esta HU pasó de IN PROCESS a DONE
![Captura_HU_02_tabla](./assets/img/HU02_funcional_tabla.png)
![Captura_HU_02_ejemplo1](./assets/img/HU02_funcional_ejemplo1.png)
![Captura_HU_02_trello](./assets/img/CapturaTrello_HU02_final.png)

<br></br>

## HU03. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Ana
Implementada por Ana León Pulido

Para implementar la HU03, he tenido que implementar mi ms-plantilla de la práctica anterior, para ello he realizado las siguientes moficicaciones:

- Modificaciones en front-end
  * Añadir los ficheros ms-motonautica.js y ms-motonautica-spec.js en la carpeta js.
  * Cambiar el nombre de las funciones de ms-motonautica.js para que al ser llamadas no cause ningún problema con las llamadas de los otros microservicios. Además la Plantilla ahora se llama motonautica.
  * Cambiar los spec en ms-motonautica-spec.js para adaptarse y reflejar los cambios anteriores.
  * Añadido el fichero ms-motonautica.css.
  * Modificar los contenidos de ms-motonautica.css para que los colores sean diferentes a los del resto de microservicios, en mi caso he utilizado el color amarillo.
  * Cargar los ficheros ms-motonautica.css, ms-motonautica.js y ms-motonautica-spec.js en index.html.
  * Modificada la presentación del microservicio de motonautica en index.html, incluyendo los cambios en el nombre de Plantilla a motonautica y de las variables para que tengan nombres únicos que no coincidan con el resto de microservicios.

- Modificaciones en api-gateway
  * Carmen cambió el número de la ruta de este microservicio mientras realizaba el cambio del suyo

- Modificaciones en ms-motonautica (anteriormente ms-plantilla en la práctica individual)
  * Añadir la carpeta ms-motonautica al proyecto.
  * Cambiar el nombre ms-plantilla por ms-motonautica tanto en package.json como en package-lock.json

- Modificaciones en assests
  * Capturas subidas de la funcionalidad y el trello.

En estas capturas se muestran la funcionalidad de este microservicio. 

La primera captura muestra la barra de búsqueda e la que se probaran las distintas funcionalidades: 

<img src=./assets\img\HU03Barra.PNG>


La segunda captura muestra una funcionalidad siendo probada, todas funcionan:

<img src=./assets\img\HU03terminada.PNG>


Finalmente está la captura de trello en el instante en el que esta HU pasó de IN PROCESS a DONE:

<img src=./assets\img\HU03trello.png>

<br></br>

## HU04. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Manuel
Implementada por Manuel Lara Torres

Para implementar la HU04, he tenido que implementar mi ms-plantilla de la práctica anterior, para ello he realizado las siguientes moficicaciones:

- Modificaciones en front-end
  * Añadir los ficheros ms-futbol.js y ms-futbol-spec.js en la carpeta js.
  * Cambiar el nombre de las funciones de ms-futbol.js para que al ser llamadas no cause ningún problema con las llamadas de los otros microservicios. Además la Plantilla ahora se llama futbol.
  * Cambiar los spec en ms-futbol-spec.js para adaptarse y reflejar los cambios anteriores.
  * Añadido el fichero ms-futbol.css.
  * Modificar los contenidos de ms-futbol.css para que los colores sean diferentes a los del resto de microservicios, en mi caso he utilizado el color naranja.
  * Cargar los ficheros ms-futbol.css, ms-futbol.js y ms-futbol-spec.js en index.html.
  * Modificada la presentación del microservicio de futbol en index.html, incluyendo los cambios en el nombre de Plantilla a futbol y de las variables para que tengan nombres únicos que no coincidan con el resto de microservicios.

- Modificaciones en api-gateway
  * Carmen cambió el número de la ruta de este microservicio mientras realizaba el cambio del suyo

- Modificaciones en ms-futbol (anteriormente ms-plantilla en la práctica individual)
  * Añadir la carpeta ms-futbol al proyecto.
  * Cambiar el nombre ms-plantilla por ms-futbol tanto en package.json como en package-lock.json

- Modificaciones en assests
  * Capturas subidas de la funcionalidad y el trello.

En estas capturas se muestran la funcionalidad de este microservicio. 

La primera captura muestra la barra de búsqueda e la que se probaran las distintas funcionalidades: 

<img src=./assets\img\HU04-Tabla.png>


La segunda captura muestra una funcionalidad de listado siendo probada, todas funcionan:

<img src=./assets\img\HU04-JugadoresCompletaEjemplo.png>


La segunda captura muestra una funcionalidad de busqueda siendo probada, todas funcionan:

<img src=./assets\img\HU04-BusquedaCriterioEjemplo.png>


Finalmente está la captura de trello en el instante en el que esta HU pasó de IN PROCESS a DONE:

<img src=./assets\img\HU04-TrelloDone.png>

<br></br>

## HU05. Ofrecer en la aplicación toda la funcionalidad de la práctica individual creada por Enrique

Implementada por Enrique Fernández Fernández

Para implementar la HU05, he tenido que implementar mi ms-plantilla de la práctica anterior, para ello he realizado las siguientes moficicaciones:

- Modificaciones en front-end
  * Añadir los ficheros ms-gimnasia.js y ms-gimnasia-spec.js en la carpeta js.
  * Cambiar el nombre de las funciones de ms-gimnasia.js para que al ser llamadas no cause ningún problema con las llamadas de los otros microservicios. Además la Plantilla ahora se llama gimnasia.
  * Cambiar los spec en ms-gimnasia-spec.js para adaptarse y reflejar los cambios anteriores.
  * Añadido el fichero ms-gimnasia.css.
  * Modificar los contenidos de ms-gimnasia.css para que los colores sean diferentes a los del resto de microservicios, en mi caso he utilizado el color amarillo.
  * Cargar los ficheros ms-gimnasia.css, ms-gimnasia.js y ms-gimnasia-spec.js en index.html.
  * Modificada la presentación del microservicio de gimnasia en index.html, incluyendo los cambios en el nombre de Plantilla a gimnasia y de las variables para que tengan nombres únicos que no coincidan con el resto de microservicios.

- Modificaciones en api-gateway
  * Carmen cambió el número de la ruta de este microservicio mientras realizaba el cambio del suyo

- Modificaciones en ms-gimnasia (anteriormente ms-plantilla en la práctica individual)
  * Añadir la carpeta ms-gimnasia al proyecto.
  * Cambiar el nombre ms-plantilla por ms-gimnasia tanto en package.json como en package-lock.json

- Modificaciones en assests
  * Capturas subidas de la funcionalidad y el trello.

En estas capturas se muestran la funcionalidad de este microservicio. 

La primera captura muestra la barra de búsqueda e la que se probaran las distintas funcionalidades: 

<img src=./assets\img\HU_05_tabla.png>


La segunda captura muestra la funcionalidad de la lista ordenada:

<img src=./assets\img\HU_05_lista_ordenada.png>


La tercera captura muestra la funcionalidad de la lista completa:

<img src=./assets\img\HU_05_lista_completa.png>


Finalmente está la captura de trello en el instante en el que esta HU pasó de IN PROCESS a DONE:

<img src=./assets\img\HU_05_terminada_Trello.png>

<br></br>

## HU06. Ver en una sola página la información de todos los autores de la aplicación al pulsar en el botón “Acerca de”
Implementada por Ana León Pulido y Manuel Lara Torres

- Modificaciones en front-end
  * Para implementar esta HU hemos modificado los archivos creados en la HU07, ms-general y ms-general-spec.
  * Hemos adaptado los spec de uno de los acerca de individuales para contener los datos de todos los miembros del proyecto.
  * Hemos modificado la funcion descargaRuta de ms-general para que accediera a los acerca de de los 5 microservicios de deportes.
  * Hemos creado las funciones mostrarAcercaDe y procesarAcercaDe para concatenar los datos recibidos de los 5 microservicios.
  * Por último, comprobamos que las funciones y sus correspondientes spec no fallan.

  En la siguiente captura se puede ver el botón para esta nueva funcionalidad.
    ![HU06_boton_acercade](./assets/img/HU06_boton_acercade.PNG)

La siguiente captura muestra el funcionamiento del Acerca de una vez accionado el botón.
    ![HU06_funcionamiento_acercade](./assets/img/HU06_funcionamiento_acercade.PNG)

Finalmente tenemos una captura que muestra el estado del tablero trello al finalizar esta HU.
    ![HU06_trello](./assets/img/HU06_trello.PNG)

<br></br>

## HU07. Ver un listado solo con los nombres de todos los jugadores/equipos de todos los deportes incluidos en la app
Implementada por Carmen Huesa Guardiola y Francisco Javier Gálvez Marín

- Modificaciones en front-end
  * Para implementar esta HU hemos creado dos nuevos archivos en la carpeta js llamados ms-general.js y su correspondiente ms-general-spec.js.
  * En ms-general.js hemos creado _generalTags_ que sirve para identificar de el nombre y apellidos de los jugadores de cada una de las bases de datos.
  * Hemos creado una tabla con cuerpo llamado _cuerpoNombres_ y cabecera llamada _cabeceraNombres_ para que muestre los nombre y apellidos.
  * Implementada las funciones que actualizan los jugadores con la tabla.
  * También, hemos implementado una función que sustituye los tags por cada deporte.
  * La función _recupera_ que carga todos los jugadores de los diferentes microservicios.
  * Por último, hemos creado la función _imprimeSoloNombres_ que llama a las funciones de actualizar para que se puedan ver en la página los nombres y apellidos de los jugadores y _procesarListaNombre_ que es la función que llamaremos desde index.html.
  * En ms-general-spec nos aseguramos de que se asignen correctamente los valores al sustituir los tags y que _imprimeSoloNombres_ funcione correctamente.
  * ms-general incluye todas las funciones necesarias para llamar a todos los microservicios y recibir los jugadores.
  * El ms-general se llama así de forma provisional, el que sea un microservicio finalmente o no dependerá del desarrollo de las otras HU.
  * Creamos ms-general.css para que la lista resultante de nombre y apellido se muestre mejor.

En la siguiente captura se puede ver el botón para esta nueva funcionalidad.
    ![Captura_HU_07_terminada](./assets/img/HU07terminada.png)

Las dos capturas a continuación muestran el principio y final de la nueva lista (no hemos hecho captura de los datos intermedios por comodidad) que incluye a los 50 jugadores de todos los microservicios del proyecto. Los spec que se puede apreciar que fallan es porque hemos aprovechado para preparar el que será necesario para la funcionalidad HU06 que implementaremos posteriormente.
    ![Captura_HU_07_ini](./assets/img/HU07terminadaDatos.png)
    ![Captura_HU_07_fin](./assets/img/HU07terminadaDatos2.png)

Finalmente tenemos una captura que muestra el estado del tablero trello al finalizar esta HU
    ![Captura_HU_07_trello](./assets/img/HU07trello.png)

<br></br>

## HU08. Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente de todos los deportes incluidos en la app
Implementada por Enrique Fernandez Fernandez, Manuel Lara Torres y Ana León Pulido

- Modificaciones en front-end
  * En ms-general-spec.js se han implementado las pruebas para la funcion que tendrá la funcionalidad.
  * En index.html se ha implementado el boton correspondiente a esta funcionalidad.
  * Se ha implementado la funcion _imprimeTodosOrdenados_ que muestra el listado de deportistas de todos los deportes ordenados.
  * Se han implementado las funciones _procesagenerico_, _procesajug_, y _procesafutbolista_ para convertir todos los deportistas con atributos distintos a uno generico con los atributos comunes.
  * Se ha implementaod la funcion _ordena_ que ordena los nombres de los deportistas alfabeticamente.
  * Se ha comprobado que las funciones implementadas satisfacen los spec y que todo funciona correctamente.

  La siguiente captura muestra el estado de Trello una vez terminada la historia de usuario.

<img src=./assets\img\HU08_trello.PNG>

  En la siguiente imagen se puede ver el boton correspondiente a la funcionalidad de la HU.

<img src=./assets\img\HU08_boton.PNG>

  Y en la siguiente imagen se puede observar el funcionamiento de la HU una vez implementada, mostrando los nobres de todos los deportistas de los 5 microservicios ordenados alfabeticamente.

<img src=./assets\img\HU08_en_funcionamiento.PNG>

<br></br>

## HU09. Mostrar el nombre y el deporte de todos los jugadores/equipos que contengan una determinada cadena introducida por el usuario. 
Implementada por Carmen Huesa Guardiola y Francisco Javier Gálvez Marín

- Modificaciones en front-end
  * En ms-general.js hemos añadido un tag adicional llamado DEPORTE que sirve para identificar de que MS viene cada jugador. 
  * Hemos creado una cabecera y cuerpo nuevos para mostrar adecuadamente este nuevo tag
  * Hemos adaptado las funciones ya implementadas que sustituían tags para funcionar con el nuevo tag DEPORTE según de que ms provenga
  * Implementada una nueva función que actualiza los jugadores con el nuevo cuerpo (y por tanto el deporte).
  * Implementada la función _recuperaCadena_ que carga todos los jugadores de los diferentes microservicios, tras esto busca la cadena deseada en los apellidos y nombres de los jugadores, con lo que se filtran aquellos que cumplan el requisito. Tras lo que se llama a la función _imprimeBusca_. Importante, se diferencia entre mayúsculas y minúsculas a la hora de buscar la cadena.
  * Implementada la función _imprimeBusca_ que llama al nuevo actualizar mencionado anteriormente para que se puedan ver en la página los jugadores buscados.
  * En ms-general-spec.js hemos creado los spec correspondientes a las nuevas funciones. Actualizando los antiguos para comprobar que las funciones de sustitución operan adecuadamente con el nuevo tag.
  * En index.html se ha implementado la barra de búsqueda y botón correspondiente a esta nueva HU.

La siguiente captura muestra el estado de Trello una vez terminada la historia de usuario.

<img src=./assets\img\HU09trello.png>


En estas capturas mostramos la funcionalidad de la HU. La primera muestra la barra de búsqueda junto con su botón para mostras las lista.

<img src=./assets\img\HU09terminada.png>


Esta segunda, muestra el resultado de hacer una búsqueda por la cadena de caracteres 'no'.

<img src=./assets\img\HU09terminadaDatos.png>

<br></br>

## HU10. Modificar la visualización de la app con un modo ALTO CONTRASTE
Implementada por Enrique Fernández Fernández

- Modificaciones en front-end
  * En index.html creamos el botón correspondiente a la funcionalidad.
  * En index.html Creamos la función cambiar modo la cual nos permite interactuar con el CSS.
  * En front-end.css Implementamos las tres funciones necesarias para el funcionamiento del contraste.
  * Creamos la función _oscuro_.
  
  La siguiente captura muestra el estado de Trello una vez terminada la historia de usuario.

<img src=./assets\img\HU10trello.png>


En estas capturas muestramos la funcionalidad de mi microservicio. Como podemos observar los colores han sido cambiados al pulsar el boton Alto contraste.

<img src=./assets\img\HU10Funcionalidad.png>

# **Sprint Retrospective**
## **¿Qué ha ido bien?**
- Nos hemos repartido adecuadamente el trabajo, de forma equitativa.
- Nos hemos ajustado correctamente al calendario de trabajo de la práctica.
- Todas las HU que hemos seleccionado para el sprint han sido implementadas.
- Los spec de TDD se han implenmentado en la mayoria de casos de forma previa o paralela (mientras uno hacia spec otro hacia la función) a las propias funciones.
- La comunicación entre los miembros del equipo ha sido correcta evitando conflictos graves a la hora de trabajar.
## **¿Cómo mejorar?**
- Un miembro del equipo ha estado indispuesto y el resto del equipo ha esperado a su recuperación para comenzar el desarrollo de la práctica. Si esto se repite, el resto de compañeros comenzará antes porque el Desarrollo Ágil lo permite.
- En general, algo que debemos tener más en cuenta es no hacer introducir ramas con funcionalidades sin terminar en main.
- En el siguiente sprint todo el mundo usará GitHub Desktop para un mejor manejo de las ramas.
- Establecer un estándar a la hora de crear y nombrar ramas desde el principio.
- Fran: "Me comprometo a no estar enfermo en el siguiente sprint."
- Carmen: "Algo que debería mejorar es llevar un mejor manejo de las ramas y ser más consciente de en qué rama estoy trabajando."
- Manuel y Ana: "Deberiamos tener un ritmo más constante de trabajo."
- Enrique: "Me comprometo a crear más spec"
## **Notas:**
- Al final, los archivos ms-general.js y ms-general-spec.js no se han convertido en un microservicio propio, así que serán renombrados como general.js y general-spec.js respectivamente.
- Si se ve una cantidad anormalmente alta de acciones en Trello por parte de Carmen es debido a que decidimos conjuntamente que fuera ella quien creara todas las tarjetas correspondientes a las HU en PRODUCT BACKLOG y posteriormente desplazarlas al SPRINT BACKLOG estando todos los miembros del grupo presentes. Esto lo hemos hecho por comodidad, para evitar que varias personas introdujeran las mismas HU por error.
