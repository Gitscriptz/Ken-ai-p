function criarPainelLateral() {
    // Verifica se o painel já existe
    if (document.getElementById('kenAIPainel')) {
        return;
    }

    // Cria o container do painel
    const painel = document.createElement('div');
    painel.id = 'kenAIPainel';
    painel.style = `
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background: white;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        transition: right 300ms ease;
        z-index: 9999;
        display: flex;
        flex-direction: column;
    `;

    // Cabeçalho do painel
    const header = document.createElement('div');
    header.style = `
        padding: 20px;
        background: var(--colors-brand40);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    // Título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Ken AI';
    titulo.style = `
        margin: 0;
        font-size: 18px;
        font-weight: bold;
    `;

    // Botão fechar
    const btnFechar = document.createElement('button');
    btnFechar.innerHTML = '✕';
    btnFechar.style = `
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 5px;
        transition: transform 300ms ease;
    `;

    btnFechar.addEventListener('mouseenter', () => {
        btnFechar.style.transform = 'scale(1.1)';
    });

    btnFechar.addEventListener('mouseleave', () => {
        btnFechar.style.transform = 'scale(1)';
    });

    btnFechar.addEventListener('click', () => {
        painel.style.right = '-400px';
        setTimeout(() => painel.remove(), 300);
    });

    // Conteúdo do painel
    const conteudo = document.createElement('div');
    conteudo.style = `
        padding: 20px;
        flex: 1;
        overflow-y: auto;
    `;

    // Monta a estrutura
    header.appendChild(titulo);
    header.appendChild(btnFechar);
    painel.appendChild(header);
    painel.appendChild(conteudo);
    document.body.appendChild(painel);

    // Anima a entrada do painel
    requestAnimationFrame(() => {
        painel.style.right = '0';
    });
}

// Exporta a função para uso global
window.criarPainelLateral = criarPainelLateral;
