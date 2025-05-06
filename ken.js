function criarPainelLateral() {
    if (document.getElementById('kenAIPainel')) return;

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
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    // Cabeçalho
    const header = document.createElement('div');
    header.style = `
        padding: 20px;
        background: var(--colors-brand40);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;

    const titulo = document.createElement('h2');
    titulo.textContent = 'Ken AI';
    titulo.style = `
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.5px;
    `;

    const btnFechar = document.createElement('button');
    btnFechar.innerHTML = '✕';
    btnFechar.style = `
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 5px;
        transition: all 300ms ease;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    `;

    // Área de mensagens
    const mensagens = document.createElement('div');
    mensagens.style = `
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: var(--colors-brand10);
    `;

    // Área de input
    const inputContainer = document.createElement('div');
    inputContainer.style = `
        padding: 20px;
        background: white;
        border-top: 1px solid rgba(0,0,0,0.1);
        display: flex;
        gap: 12px;
    `;

    const input = document.createElement('textarea');
    input.placeholder = 'Digite sua mensagem...';
    input.style = `
        flex: 1;
        border: 1px solid var(--colors-brand20);
        border-radius: 8px;
        padding: 12px;
        resize: none;
        height: 45px;
        font-size: 14px;
        line-height: 1.5;
        transition: border-color 300ms ease;
        font-family: inherit;
    `;

    const btnEnviar = document.createElement('button');
    btnEnviar.innerHTML = '↑';
    btnEnviar.style = `
        background: var(--colors-brand40);
        color: white;
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 20px;
        transition: all 300ms ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    // Event Listeners
    btnFechar.addEventListener('mouseenter', () => {
        btnFechar.style.background = 'rgba(255,255,255,0.1)';
        btnFechar.style.transform = 'scale(1.1)';
    });

    btnFechar.addEventListener('mouseleave', () => {
        btnFechar.style.background = 'transparent';
        btnFechar.style.transform = 'scale(1)';
    });

    btnFechar.addEventListener('click', () => {
        painel.style.right = '-400px';
        setTimeout(() => painel.remove(), 300);
    });

    btnEnviar.addEventListener('mouseenter', () => {
        btnEnviar.style.background = 'var(--colors-brand30)';
        btnEnviar.style.transform = 'scale(1.05)';
    });

    btnEnviar.addEventListener('mouseleave', () => {
        btnEnviar.style.background = 'var(--colors-brand40)';
        btnEnviar.style.transform = 'scale(1)';
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--colors-brand30)';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = 'var(--colors-brand20)';
    });

    // Auto-resize do textarea
    input.addEventListener('input', () => {
        input.style.height = '45px';
        input.style.height = input.scrollHeight + 'px';
    });

    // Envio de mensagem
    const enviarMensagem = () => {
        const texto = input.value.trim();
        if (!texto) return;

        const msg = document.createElement('div');
        msg.style = `
            padding: 12px 16px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            animation: slideIn 300ms ease;
        `;
        msg.textContent = texto;
        mensagens.appendChild(msg);
        
        mensagens.scrollTop = mensagens.scrollHeight;
        input.value = '';
        input.style.height = '45px';
    };

    btnEnviar.addEventListener('click', enviarMensagem);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarMensagem();
        }
    });

    // Monta a estrutura
    header.appendChild(titulo);
    header.appendChild(btnFechar);
    inputContainer.appendChild(input);
    inputContainer.appendChild(btnEnviar);
    
    painel.appendChild(header);
    painel.appendChild(mensagens);
    painel.appendChild(inputContainer);
    
    // Adiciona estilos globais
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(painel);

    requestAnimationFrame(() => {
        painel.style.right = '0';
    });
}

// Exporta a função globalmente
window.criarPainelLateral = criarPainelLateral;
