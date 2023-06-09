/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS tiro_con_arco', () => {
    it('Devuelve MS tiro_con_arco con Home Page', (done) => {
      supertest(app)
        .get('/tiro_con_arco/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS tiro_con_arco: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS tiro_con_arco Acerca De', (done) => {
      supertest(app)
        .get('/tiro_con_arco/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS tiro_con_arco: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });


  /**
   * Tests para acceso a la lista de arqueros
   */
        it('Devuelve Carmen, nombre de la primera arquera', (done) => {
          supertest(app)
            .get('/tiro_con_arco/get_arqueros')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
              assert(res.body.data[0].data.hasOwnProperty('nombre'));
              assert(res.body.data[0].data.nombre === "Carmen");
              assert(res.body.data[0].data.nombre != "Pepe");
  
    
            })
            .end((error) => { error ? done.fail(error) : done(); }
            );
        });
    
      
  })

  /**
   * Tests para acceso a la lista de arqueros con todos los datos
   */

  it('Devuelve todos los datos de todos los jugadores', (done) => {
    supertest(app)
      .get('/tiro_con_arco/get_arqueros_completos')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data[0].data.hasOwnProperty('nombre'));
        assert(res.body.data[0].data.hasOwnProperty('apellido'));
        assert(res.body.data[0].data.hasOwnProperty('id'));
        assert(res.body.data[0].data.hasOwnProperty('nacionalidad'));
        assert(res.body.data[0].data.hasOwnProperty('edad'));
        assert(res.body.data[0].data.hasOwnProperty('disparo'));
        assert(res.body.data[0].data.hasOwnProperty('puntuaciones_de_la_tanda'));
        assert(res.body.data.length === 10);
        
        
      

      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });


    
        describe('Rutas estáticas de MS Balonmano', () => {
            it('Devuelve MS Balonmano Home Page', (done) => {
                supertest(app)
                    .get('/balonmano/')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
                        assert(res.body.hasOwnProperty('mensaje'));
                        assert(res.body.mensaje === "Microservicio MS Balonmano: home");

                    })
                    .end((error) => { error ? done.fail(error) : done() })
            });
            it('Devuelve MS Balonmano Acerca De', (done) => {
                supertest(app)
                    .get('/balonmano/acercade')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
                        assert(res.body.hasOwnProperty('mensaje'));
                        assert(res.body.mensaje === "Microservicio MS tiro_con_arco: acerca de");
                        assert(res.body.autor == "Francisco Javier Galvez Marin");
                        assert(res.body.email == "fjgm0038@red.ujaen.es");
                        assert(res.body.fecha == "28-03-2023");

                    })
                    .end((error) => { error ? done.fail(error) : done() })
            });


        })

        /**
         * Tests para acceso a la lista de nombres
         */
        describe('Acceso a BBDD:', () => {
            it('Devuelve Arno al consultar mediante test_db', (done) => {
                supertest(app)
                    .get('/balonmano/test_db')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
                        assert(res.body.data[0].data.hasOwnProperty('disqualified'));
                        assert(res.body.data[0].data.name === "Arno");

                    })
                    .end((error) => { error ? done.fail(error) : done(); }
                    );
            });

        })

        /**
         * Tests para acceso a la lista de los nombres de jugadores
         */
        describe('Acceso a la lista de nombres de los jugadores:', () => {
            it('Devuelve Arno al consultar el primer miembro de la lista de jugadores', (done) => {
                supertest(app)
                    .get('/balonmano/get_lista_jugadores')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        assert(res.body.data[0].data.hasOwnProperty('name'));
                        assert(res.body.data[0].data.name === "Arno");
                        assert(res.body.data[0].data.name != "Juande");
                        assert(res.body.data.length === 10);

                    })
                    .end((error) => { error ? done.fail(error) : done(); }
                    );
            });

        })
        describe('Acceso a la lista de todos los datos de los jugadores:', () => {
            it('Devuelve Arno al consultar el primer miembro de la lista de jugadores', (done) => {
                supertest(app)
                    .get('/balonmano/get_lista_completa')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        assert(res.body.data[0].data.hasOwnProperty('playerId'));
                        assert(res.body.data[0].data.hasOwnProperty('name'));
                        assert(res.body.data[0].data.hasOwnProperty('surname'));
                        assert(res.body.data[0].data.hasOwnProperty('dateBirth'));
                        assert(res.body.data[0].data.hasOwnProperty('seasonsPlayed'));
                        assert(res.body.data[0].data.hasOwnProperty('goalSeason'));
                        assert(res.body.data[0].data.hasOwnProperty('disqualified'));
                        assert(!res.body.data[0].data.hasOwnProperty('trial'));
                        assert(res.body.data[0].data.name === "Arno");
                        assert(res.body.data[0].data.name != "Juande");
                        assert(res.body.data.length === 10);
                    })
                    .end((error) => { error ? done.fail(error) : done(); }
                    );
            });

        })



        describe('Acceso a la lista de todos los elementos ordenados:', () => {
            it('Se accede a la web', (done) => {
                supertest(app)
                    .get('/balonmano/get_lista_ordenada')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((error) => { error ? done.fail(error) : done(); }
                    );
            });

        })

        describe('Acceso a la busqueda por nombre:', () => {
            it('Se accede a la busqueda', (done) => {
                supertest(app)
                    .get('/balonmano/get_busqueda_nombre')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((error) => { error ? done.fail(error) : done(); }
                    );
            });

        })

        describe('Acceso a la busqueda por nombre:', () => {
            it('Se accede a la busqueda', (done) => {
                supertest(app)
                    .get('/balonmano/get_busqueda_criterios')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end((error) => { error ? done.fail(error) : done(); }
                    );
            });

        });
    describe('Rutas estáticas de MS Futbol', () => {
        it('Devuelve MS Futbol Home Page', (done) => {
          supertest(app)
            .get('/futbol/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
              assert(res.body.hasOwnProperty('mensaje'));
              assert(res.body.mensaje === "Microservicio MS Futbol: home");
    
            })
            .end((error) => { error ? done.fail(error) : done() })
        });
        it('Devuelve MS Futbol Acerca De', (done) => {
          supertest(app)
            .get('/futbol/acercade')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
              assert(res.body.hasOwnProperty('mensaje'));
              assert(res.body.mensaje === "Microservicio MS Futbol: acerca de");
    
            })
            .end((error) => { error ? done.fail(error) : done() })
        });
      })
      /**
       * Tests para acceso a la BBDD
       */
      describe('Acceso a BBDD:', () => {
        it('Devuelve los nombres al ir por la ruta test_db', (done) => {
          supertest(app)
            .get('/futbol/test_db')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
              assert(res.body.data[0].data.hasOwnProperty('nombre'));
              assert(res.body.data[0].data.nombre === "Leo");
    
            })
            .end((error) => { error ? done.fail(error) : done(); }
            );
        });
    
      })
    
      /**
       * Listar jugadores
       */
      describe('Lista de jugadores:', () => {
        it('Devuelve un listado con todos los jugadores', (done) => {
          supertest(app)
            .get('/futbol/get_jugadores')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
              //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
              assert(res.body.data[0].data.hasOwnProperty('nombre'));
              assert(res.body.data[0].data.hasOwnProperty('apellidos'));
              assert(res.body.data[0].data.nombre === "Leo");
              assert(res.body.data[0].data.nombre != "Messi");
              assert(res.body.data.length === 10);
            })
            .end((error) => { error ? done.fail(error) : done(); }
            );
        });
      })
      /**
       * Listar todos los datos de los jugadores
       */
    describe('Lista de jugadores completa:', () => {
      it('Devuelve un listado con todos los jugadores', (done) => {
        supertest(app)
          .get('/futbol/get_jugadores_completa')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.data[0].data.hasOwnProperty('nombre'));
            assert(res.body.data[0].data.hasOwnProperty('apellidos'));
            assert(res.body.data[0].data.hasOwnProperty('fnac'));
            assert(res.body.data[0].data.hasOwnProperty('equipos'));
            assert(res.body.data[0].data.hasOwnProperty('goles'));
            assert(res.body.data[0].data.nombre === "Leo");
            assert(res.body.data[0].data.nombre != "Messi");
            assert(res.body.data[0].data.fnac.dia === 21);
            assert(res.body.data[0].data.equipos[0] === "F.C Barcelona");
            assert(res.body.data.length === 10);
          })
          .end((error) => { error ? done.fail(error) : done(); }
          );
      });
    })

    describe('Rutas estáticas de MS motonautica', () => {
      it('Devuelve MS motonautica Home Page', (done) => {
        supertest(app)
          .get('/motonautica/')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.hasOwnProperty('mensaje'));
            assert(res.body.mensaje === "Microservicio MS motonautica: home");
  
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
      it('Devuelve MS motonautica Acerca De', (done) => {
        supertest(app)
          .get('/motonautica/acercade')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.hasOwnProperty('mensaje'));
            assert(res.body.mensaje === "Microservicio MS motonautica: acerca de");
  
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
      it('Devuelve un listado con todos los pilotos', (done) => {
        supertest(app)
          .get('/motonautica/get_pilotos')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.data[0].data.hasOwnProperty('nombre'));
            assert(res.body.data[0].data.hasOwnProperty('apellido'));
            assert(res.body.data[0].data.nombre === "Ana");
            assert(res.body.data[0].data.nombre != "Pato");
            assert(res.body.data.length === 10);
          })
          .end((error) => { error ? done.fail(error) : done(); }
          );
      });
      it('Devuelve un listado con todos los pilotos', (done) => {
        supertest(app)
          .get('/motonautica/get_pilotos_completos')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.data[0].data.hasOwnProperty('nombre'));
            assert(res.body.data[0].data.hasOwnProperty('apellido'));
            assert(res.body.data[0].data.hasOwnProperty('edad'));
            assert(res.body.data[0].data.hasOwnProperty('motos'));
            assert(res.body.data[0].data.hasOwnProperty('playasvisitadas'));
            assert(res.body.data[0].data.nombre === "Ana");
            assert(res.body.data[0].data.nombre != "Pato");
            assert(res.body.data.length === 10);
          })
          .end((error) => { error ? done.fail(error) : done(); }
          );
      });
    })



    describe('Rutas estáticas de MS gimnasia', () => {
      it('Devuelve MS gimnasia Home Page', (done) => {
        supertest(app)
          .get('/gimnasia/')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.hasOwnProperty('mensaje'));
            assert(res.body.mensaje === "Microservicio MS gimnasia: home");
  
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
      it('Devuelve MS gimnasia Acerca De', (done) => {
        supertest(app)
          .get('/gimnasia/acercade')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.hasOwnProperty('mensaje'));
            assert(res.body.mensaje === "Microservicio MS gimnasia: acerca de");
  
          })
          .end((error) => { error ? done.fail(error) : done() })
      });
    
  
  
    it('Devuelve Ana, nombre de la primera Atleta', (done) => {
      supertest(app)
        .get('/gimnasia/get_Atletas')
        .expect(200)
      })
  
  
    it('Devuelve Listado de nombres de todos los atletas', (done) => {
      supertest(app)
        .get('/gimnasia/get_Atletas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
         
  
  
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  
  
  
  
  
  /**
     * Tests para acceso a la lista de Atletas completa
     */
  it('Devuelve todos los datos de todos los Atletas', (done) => {
    supertest(app)
      .get('/get_Atletas_completos')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data[0].data.hasOwnProperty('nombre'));
        assert(res.body.data[0].data.hasOwnProperty('apellido'));
        assert(res.body.data[0].data.hasOwnProperty('edad'));
        assert(res.body.data[0].data.hasOwnProperty('dni'));
        assert(res.body.data[0].data.hasOwnProperty('medallas'));
        assert(res.body.data[0].data.hasOwnProperty('direccion'));
        assert(res.body.data[0].data.hasOwnProperty('rankingMundial'));
        assert(res.body.data.length === 10);
  
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });
  
  /**
   * Tests para acceso a la lista de nombres ordenados de Atletas
   */
  it('Devuelve Ana, nombre de la primera Atleta, y Sara nombre del último', (done) => {
    supertest(app)
      .get('/get_Atletas')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data[0].data.hasOwnProperty('nombre'));
        assert(res.body.data[0].data.nombre === "Ana");
        assert(res.body.data[9].data.nombre === "Sara");
  
        assert( res.body.data.length === 10); 
  
  
  
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  });
  
  
  /**
   * Tests para acceso a la lista de nombres ordenados de arqueros
   */
  it('Devuelve Ana, nombre de la primera Atleta, y Sara nombre del último', (done) => {
    supertest(app)
      .get('/get_Atletas')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data[0].data.hasOwnProperty('nombre'));
        assert(res.body.data[0].data.nombre === "Ana");
        assert(res.body.data[9].data.nombre === "Sara");
  
        assert( res.body.data.length === 10); 
  
  
  
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );


    });
    
});

});


