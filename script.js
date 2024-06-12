window.onload = function() {
    const formProduto = document.getElementById('formProduto');
    if (formProduto) {
        formProduto.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('nomeProduto').value;
            const descricao = document.getElementById('descricaoProduto').value;
            const imagem = document.getElementById('imagemProduto').value;
            const preco = parseFloat(document.getElementById('preco').value)

            adicionarProduto(nome, descricao, imagem, preco);
            formProduto.reset();
        });
    }

    function adicionarProduto(nome, descricao, imagem, preco) {
        const produto = { nome, descricao, imagem, preco};

        let produtos = JSON.parse(localStorage.getItem('produtos'));
        if (!produtos) {
            produtos = [];
        } else {
            produtos = JSON.parse(produtos);
        }
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    const catalogo = document.getElementById('catalogo');
    if (catalogo) {
        carregarProdutos();
    }

    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');         

            const imagemP = document.createElement('img');
            imagemP.className =  'foto';
            imagemP.src = produto.imagem;
            produtoDiv.appendChild(imagemP);

            const nomeP = document.createElement('h2');
            nomeP.className = 'nome';
            nomeP.textContent = produto.nome.toUpperCase();
            produtoDiv.appendChild(nomeP);

            const precoP = document.createElement('h3')
            precoP.textContent = `R$: ${produto.preco}`  
            produtoDiv.appendChild(precoP)

            const descricaoP = document.createElement('p');
            descricaoP.textContent = produto.descricao;
            produtoDiv.appendChild(descricaoP);

            catalogo.appendChild(produtoDiv);

            produtoDiv.addEventListener('click', function() {adicionarCarrinho(produto)}) 
        });
    }

    function adicionarCarrinho(produto) {
        let carrinho = localStorage.getItem('carrinho');
        if (!carrinho) {
            carrinho = [];
        } else {
            carrinho = JSON.parse(carrinho);
        }
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto adicionado ao carrinho!');
    }
    
};