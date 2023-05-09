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


    describe('API Gateway: rutas estáticas', () => {
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

        })
    });



});



