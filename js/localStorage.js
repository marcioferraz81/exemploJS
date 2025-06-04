$(document).ready(function () {
  function carregarProdutos() {
    //let tem escopo de funcionamento somente dentro desta função
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let linhas = "";
    produtos.forEach(function (produto, index) {
      linhas += `
            <tr>
              <td>${produto.nome}</td>
              <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
              <td>
                <button class="btn btn-sm btn-warning editar" data-index="${index}">Editar</button>
                <button class="btn btn-sm btn-danger excluir" data-index="${index}">Excluir</button>
              </td>
            </tr>`;
    });
    $("#tabelaProdutos").html(linhas);
  }

  function salvarProduto(e) {
    e.preventDefault();// Impede o envio do formulário aqui
    let nome = $("#nome").val();
    let preco = $("#preco").val();
    let indice = $("#indiceEdicao").val();
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if (nome && preco) {
      if (indice === "") {
        //salvar
        produtos.push({ nome: nome, preco: preco });
      } else {
        //abrir o atualizar
        produtos[indice] = { nome: nome, preco: preco };
        $("#indiceEdicao").val("");
        $("#salvar")
          .text("Salvar")
          .removeClass("btn-primary")
          .addClass("btn-success");
      }
      // atualiza o localStorage
      localStorage.setItem("produtos", JSON.stringify(produtos));
      $("#formProduto")[0].reset();
      carregarProdutos();
    }
  }

  function excluirProduto(index) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.splice(index, 1);
    // atualiza o localStorage
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
  }

  function editarProduto(index) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let produto = produtos[index];
    $("#nome").val(produto.nome);
    $("#preco").val(produto.preco);
    $("#indiceEdicao").val(index);
    $("#salvar")
      .text("Atualizar")
      .removeClass("btn-success")
      .addClass("btn-primary");
  }

  $("#formProduto").submit(salvarProduto);

  $(document).on("click", ".excluir", function () {
    let index = $(this).data("index");
    excluirProduto(index);
  });

  $(document).on("click", ".editar", function () {
    let index = $(this).data("index");
    editarProduto(index);
  });

  carregarProdutos();
});
