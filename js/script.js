//request via JavaScript ajax 4 passos
//01 criar a variável

var api = "https://qua-209050.herokuapp.com/api/produto/";
var lista;

xhttp = new XMLHttpRequest();

function listar() {
    // 02 definição do request(forma e endereço)
    xhttp.open("GET", api);
    // 03 manda de fato a request
    xhttp.send();
    // 04 execução quando tivera devolutiva do request(response)
    xhttp.onload = function () {
        lista = this.responseText;
        // console.log(lista);
        lista = JSON.parse(lista);
        // console.log(lista);
        texto = "";
        i = 0;
        for (const u of lista){
            texto += `<tr onclick='editar(${i})'><td>${u.nome}</td><td>R$ ${u.valor.toFixed(2)}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    u = lista[i];
    document.getElementById("nome").value = u.nome;
    document.getElementById("descricao").value = u.descricao;
    document.getElementById("valor").value = u.valor;
    document.getElementById("img").value = u.valor;
    document.getElementById("id").value = u.id;
}

function gravar() {
    //alert("Estamos dentro da função incluir");
    var item = {};
    item.nome = document.getElementById("nome").value;
    item.descricao = document.getElementById("descricao").value;
    item.valor = document.getElementById("valor").value;
    item.img = document.getElementById("img").value;
    //console.log(item);

    item.id = document.getElementById("Id").value;
    if (item.id > 0){
        acao = "PUT"; //alteração
    } else {
        acao = "POST"; //incluir
    }
    

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(item));
    xhttp.onload = function () {
        // console.log(this.responseText);
        listar();
        limpar();
    }

}

function limpar() {
    document.querySelector("nome").value = "";
    document.querySelector("descricao").value = "";
    document.querySelector("valor").value = "";
    document.querySelector("img").value = "";
    document.querySelector("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();