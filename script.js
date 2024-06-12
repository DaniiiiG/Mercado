window.onload = function() {
    const formProduto = document.getElementById('formProduto');
    if (formProduto) {
        formProduto.addEventListener('submit', function(event) {
            event.preventDefault();
            const nome = document.getElementById('nomeProduto').value;
            const descricao = document.getElementById('descricaoProduto').value;
            const imagem = document.getElementById('imagemProduto').value;
            const preco = parseFloat(document.getElementById('preco').value);

            if (!isNaN(preco)) {
                adicionarProduto(nome, descricao, imagem, preco);
                formProduto.reset();
            } else {
                alert('Por favor, insira um preço válido.');
            }
        });
    }

    function adicionarProduto(nome, descricao, imagem, preco) {
        const produto = { nome, descricao, imagem, preco };

        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        carregarProdutos(); 
    }

    const catalogo = document.getElementById('catalogo');
    if (catalogo) {
        carregarProdutos();
    }

    function carregarProdutos() {
        catalogo.innerHTML = '';
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.forEach((produto, index) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');

            const imagemP = document.createElement('img');
            imagemP.className = 'foto';
            imagemP.src = produto.imagem;
            produtoDiv.appendChild(imagemP);

            const nomeP = document.createElement('h2');
            nomeP.className = 'nome';
            nomeP.textContent = produto.nome.toUpperCase();
            produtoDiv.appendChild(nomeP);

            const precoP = document.createElement('h3');
            precoP.textContent = `R$: ${produto.preco}`;
            produtoDiv.appendChild(precoP);

            const descricaoP = document.createElement('p');
            descricaoP.textContent = produto.descricao;
            produtoDiv.appendChild(descricaoP);

            const adicionarCarrinhoBtn = document.createElement('button');
            adicionarCarrinhoBtn.textContent = 'Adicionar ao Carrinho';
            adicionarCarrinhoBtn.className = 'adc'
            adicionarCarrinhoBtn.addEventListener('click', function() {
                adicionarCarrinho(produto);
            });
            produtoDiv.appendChild(adicionarCarrinhoBtn);

            const removerBtn = document.createElement('button');
            removerBtn.textContent = 'Remover';
            removerBtn.className = 'rem'
            removerBtn.addEventListener('click', function() {
                removerProduto(index);
            });
            produtoDiv.appendChild(removerBtn);

            catalogo.appendChild(produtoDiv);
        });
    }

    function removerProduto(index) {
        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.splice(index, 1);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        carregarProdutos();
    }

    function adicionarCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto adicionado ao carrinho!');
    }
};
