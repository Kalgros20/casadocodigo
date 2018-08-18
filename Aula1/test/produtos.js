var express = require('../config/express')();
var request = require('supertest')(express);

beforeEach(function (done) {
    var conn = express.infra.connectionFactory();
    conn.query("delete from produtos", function (ex, result) {
        if(!ex){
            done();
        }
    });
});

    describe('#ProdutosController', function () {
        it('#listagem json', function (done) {
            request.get('/produtos')
                .set('Accept', 'application/json')
                .expect('Content-type', /json/)
                .expect(200, done);
        });

        it('#cadastro de novo produto com dados inválidos', function (done) {
            request.post('/produtos')
                .send({ titulo: 'teste', descricao: 'Novo livro' })
                .expect(400, done);
        });

        it('#cadastro de novo produto com dados válidos', function (done) {
            request.post('/produtos')
                .send({ titulo: 'teste', preco: 200, descricao: 'Novo livro' })
                .expect(302, done);
        });
    });

