module.exports = function (app) {
    var listaProdutos = function (req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        produtosDAO.lista(function (err, results) {
            if(err){
                return next(err);
            }
            res.format({
                html: function () {
                    res.render('produtos/lista', { lista: results });
                },
                json: function () {
                    res.json(results);
                }
            });
        });
        connection.end();
    };
    app.get('/produtos', listaProdutos);

    app.get('/produtos/cadastro', function (req, res) {
        res.render('produtos/form',
            { errosValidacao: {}, produto: {} });
    });

    app.post('/produtos', function (req, res) {
        var produto = req.body;
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        req.assert('titulo', 'titulo é obrigatório').notEmpty(); //Verifica se esta vazio
        req.assert('descricao', 'descricao nao pode ser vazia').notEmpty();
        req.assert('preco', 'preco tem que ser float').isFloat();
        var erros = req.validationErrors(); //Cria um objeto do tipo validatiorChain, caso tenha erros

        if (erros) {
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto });
                },
                json: function () {
                    res.status(400).json(erros);
                }
            })
            return;
        }

        produtosDAO.salva(produto, function (errors, results) {
            res.redirect('/produtos');
        });

        connection.end();
    });
}

