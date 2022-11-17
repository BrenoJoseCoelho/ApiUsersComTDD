
const app =  require('../src/index.js');
const mongoose = require('mongoose');
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
    before('Deve fazer conexão com o Banco de Dados', () => Promise.all([])
    .then(() => mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true, useUnifiedTopology: true})));

    it('Deve realizar um Drop no Database', () => Promise.all([])
    .then(() => mongoose.connection.db.dropDatabase()));

    it('O servidor esta online', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(StatusCodes.OK);
        done();
        });
    });

    it('Deve ser uma lista vazia de usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.eql([]);
        done();
        });
    });

    it('Deve criar o usuario Raupp', function (done) {
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
    
    it('Deve criar o usuario Breno', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Breno", email: "breno@devoz.com.br", age: 19})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('Deve criar o usuario Beatriz', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Beatriz", email: "beatriz@devoz.com.br", age: 18})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    
    
    it('Deve criar o usuario Caio', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Caio", email: "caio@devoz.com.br", age: 22})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('Deve criar o usuario Vinicius', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Vinicius", email: "vinicius@devoz.com.br", age: 28})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('Deve criar o usuario Hilton', function (done) {
        chai.request(app)
        .post('/users')
        .send({name: "Hilton", email: "hilton@devoz.com.br", age: 57})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.CREATED);
            done();
        });
    });

    it('Deve excluir o usuario Caio', function (done) {
        chai.request(app)
        .delete('/users/Caio')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.OK);
            expect(res.text).to.be.equal("User deleted");
            done();
        });
    });

    it('A usuaria Julia não existe no sistema', function (done) {
        chai.request(app)
        .get('/users/Julia')
        .end(function (err, res) {
            expect(res.text).to.be.equal('User not found'); 
            expect(res).to.have.status(StatusCodes.NOT_FOUND);            
            done();
        });
    });

    it('O usuario Breno existe e é valido', function (done) {
        chai.request(app)
        .get('/users/Breno')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(StatusCodes.OK);
            expect(res.body).to.jsonSchema({example});
            done();
        });
    });

    it('O usuario Caio não deve mais existir', function (done) {
        chai.request(app)
        .get('/users/Caio')
        .end(function (err, res) {
            expect(res).to.have.status(StatusCodes.NOT_FOUND);
            expect(res.text).to.be.equal("User not found");
            done();
        });
    });

    it('Deve retornar uma lista com o minimo de 5 usuarios', function (done) {
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

    it('Deve editar o usario Breno', function (done) {
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