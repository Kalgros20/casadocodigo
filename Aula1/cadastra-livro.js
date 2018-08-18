var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    method: 'post',
    path: '/produtos',
    headers:{
        'Accept': 'application/json', //Forma que o servidor aceita a sua requisição
        'Content-type': 'application/json' //Forma que o servidor entende a resposta da requisição
    }
}

var client = http.request(configuracoes, function(res){ //Http request apenas monta o objeto request
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo: ' + body);
    });
});

var produto = {
    titulo: 'mais sobre node',
    descricao: 'eu escrevo oq quero',
    preco: 100
};

client.end(JSON.stringify(produto)); //end, método que envia de fato a requisicao. Stringfy para colocar o json como string;
