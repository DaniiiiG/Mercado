function abrir() {
    const nome = document.getElementById("nome").value
    const senha = document.getElementById("senha").value
    const botao = document.getElementById("botao").value

    if (nome == 'danielgimenes1000@gmail.com'&& senha == '1234') {
        window.location.href = 'index.html'
    } else {
        alert('Preencha todos os campos')
    }
    
}
botao.addEventListener('click', abrir)