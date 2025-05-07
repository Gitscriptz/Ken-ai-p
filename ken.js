function criarPainelLateral() {
    if (document.getElementById('kenAIPainel')) return;

    const painel = document.createElement('div');
    painel.id = 'kenAIPainel';
    painel.style = `
        position: fixed;
        top: 0;
        right: -420px;
        width: 420px;
        height: 100vh;
        background: #ffffff;
        box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
        transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
    `;

    const header = document.createElement('div');
    header.style = `
        padding: 24px;
        background: linear-gradient(135deg, var(--colors-brand40), var(--colors-brand30));
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const titulo = document.createElement('div');
    titulo.style = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    const logo = document.createElement('div');
    logo.innerHTML = '🤖';
    logo.style = `
        font-size: 24px;
        animation: pulse 2s infinite;
    `;

    const tituloText = document.createElement('div');
    tituloText.innerHTML = `
        <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Ken AI</h2>
        <span style="font-size: 12px; opacity: 0.8">Seu assistente inteligente</span>
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
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: #f8f9fa;
    `;

    // Mensagens simuladas
    const mensagensSimuladas = [
        { tipo: 'bot', texto: 'Olá! Eu sou o Ken AI, seu assistente pessoal. Como posso ajudar você hoje? 👋', delay: 0 },
        { tipo: 'user', texto: 'Oi! Pode me ajudar com as atividades?', delay: 1000 },
        { tipo: 'bot', texto: 'Claro! Estou aqui para auxiliar você com suas atividades. Pode me dizer qual matéria você está estudando? 📚', delay: 2000 }
    ];

    function criarMensagem(tipo, texto) {
        const msg = document.createElement('div');
        msg.style = `
            max-width: 80%;
            padding: 12px 16px;
            border-radius: ${tipo === 'bot' ? '0 15px 15px 15px' : '15px 0 15px 15px'};
            background: ${tipo === 'bot' ? 'white' : 'var(--colors-brand40)'};
            color: ${tipo === 'bot' ? '#1a1a1a' : 'white'};
            align-self: ${tipo === 'bot' ? 'flex-start' : 'flex-end'};
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-size: 14px;
            line-height: 1.5;
            opacity: 0;
            transform: translateY(20px);
            animation: slideIn 0.5s ease forwards;
        `;
        msg.textContent = texto;
        return msg;
    }

    // Adiciona mensagens simuladas com delay
    mensagensSimuladas.forEach((mensagem, index) => {
        setTimeout(() => {
            mensagens.appendChild(criarMensagem(mensagem.tipo, mensagem.texto));
        }, mensagem.delay);
    });

    // Área de input
    const inputContainer = document.createElement('div');
    inputContainer.style = `
        padding: 20px;
        background: white;
        border-top: 1px solid rgba(0,0,0,0.1);
        display: flex;
        gap: 12px;
        box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
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
    titulo.appendChild(logo);
    titulo.appendChild(tituloText);
    header.appendChild(titulo);
    header.appendChild(btnFechar);
    inputContainer.appendChild(input);
    inputContainer.appendChild(btnEnviar);
    
    painel.appendChild(header);
    painel.appendChild(mensagens);
    painel.appendChild(inputContainer);
    
    // Estilos globais atualizados
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
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
