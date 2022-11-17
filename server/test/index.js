
const app =  require('../src/index.js');

const { StatusCodes } = require('http-status-codes');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);


const expect = chai.expect;

const example = 
    {
        _id: "62f2bfbf84d655dc1232b228",
        name: "Breno",
        email: "breno@devoz.com.br",
        age: 19,
        __v: 0
    
}

//Inicio dos testes

//testes da aplicação
describe('Testes da aplicaçao',  () => {
    it('o servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(StatusCodes.OK);
        done();
        });
    });

    it('deveria ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.eql([]);
        done();
        });
    });

    it('deveria criar o usuario Raupp', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Raupp", email: "jose.raupp@devoz.com.br", age: 35})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('Não deve criar o usuario Igor, pois a idade é menor que 18', (done) => {
        chai.request(app)
          .post('/users')
          .send({
            name: "Igor", email: 'igor@devoz.com.br', age: 15
          })
          .end((err, res) => {
            expect(res).to.have.status(StatusCodes.BAD_REQUEST);
            expect(res.text).to.be.equal('Age under 18!');
            done();
          });
      });
    
    it('deveria criar o usuario Breno', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Breno", email: "breno@devoz.com.br", age: 19})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('deveria criar o usuario Beatriz', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Beatriz", email: "beatriz@devoz.com.br", age: 18})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    
    
    it('deveria criar o usuario Caio', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Caio", email: "caio@devoz.com.br", age: 22})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('deveria criar o usuario Vinicius', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Vinicius", email: "vinicius@devoz.com.br", age: 28})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('deveria criar o usuario Hilton', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Hilton", email: "hilton@devoz.com.br", age: 57})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('deve excluir o usuario Vinicius', function (done) {
        chai.request(app)
        .delete('/users/Vinicius')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.OK);
            expect(res.text).to.be.equal("User deleted");
            done();
        });
    });

    it('a usuaria Julia não existe no sistema', function (done) {
        chai.request(app)
        .get('/users/Julia')
        .end(function (err, res) {
            expect(res.text).to.be.equal('User not found'); 
            expect(res).to.have.status(StatusCodes.NOT_FOUND);            
            done();
        });
    });

    it('o usuario Breno existe e é valido', function (done) {
        chai.request(app)
        .get('/users/Breno')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.OK);
            expect(res.body).to.jsonSchema({example});
            done();
        });
    });

    it('o usuario Vinicius não deve mais existir', function (done) {
        chai.request(app)
        .get('/users/Vinicius')
        .end(function (err, res) {
            expect(res).to.have.status(StatusCodes.NOT_FOUND);
            expect(res.text).to.be.equal("User not found");
            done();
        });
    });

    it('deve retornar uma lista com o minimo de 5 usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body.length).to.be.at.least(5);
        done();
        });
    });

    it('Não deve editar o usuario Pedro, pois esse usuario não existe', function (done) {
        chai.request(app)
        .put('/users/Pedro')
        .send({
          name: 'Pedro',
          age: 23,
          email: 'pedro123@devoz.com.br'
        })
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.NOT_FOUND);
          expect(res.text).to.be.equal('User not found');
          done();
        });
    });

    it('Não deve editar a usuaria Beatriz, pois a idade que foi editada é menor que 18', function (done) {
        chai.request(app)
        .put('/users/Beatriz')
        .send({
          name: 'Beatriz',
          age: 17,
          email: 'beatriz@devoz.com.br'
        })
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.BAD_REQUEST);
          expect(res.text).to.be.equal('Age under 18');
          done();
        });
    });

    it('deve editar o usario Breno', function (done) {
        chai.request(app)
        .put('/users/Breno')
        .send({
          name: 'Julia',
          age: 26,
          email: 'julia@devoz.com.br'
        })
        .end((err, res) => {
          expect(res).to.have.status(StatusCodes.OK);
          expect(res.text).to.be.equal('User changed successfully');
          done();
        });
    });
    

});