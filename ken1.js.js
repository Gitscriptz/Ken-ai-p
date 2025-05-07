function criarPainelLateral() {
    if (document.getElementById('kenAIPainel')) return;

    const painel = document.createElement('div');
    painel.id = 'kenAIPainel';
    painel.style = `
        position: fixed;
        top: 0;
        right: -450px;
        width: 450px;
        height: 650px;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: -5px 0 30px rgba(114, 41, 230, 0.15);
        transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border-left: 1px solid rgba(114, 41, 230, 0.1);
    `;

    const header = document.createElement('div');
    header.style = `
        padding: 20px;
        background: linear-gradient(135deg, var(--colors-brand40), var(--colors-brand30));
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        overflow: hidden;
        height: 80px;
        background: linear-gradient(135deg, var(--colors-brand40), var(--colors-brand30));
        padding: 0 24px;
        position: relative;
    `;

    // Adiciona efeito de brilho no header
    header.innerHTML += `
        <div style="
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            pointer-events: none;
            animation: headerGlow 15s infinite linear;
        "></div>
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

    // Adiciona menu de opções
    const menuOpcoes = document.createElement('div');
    menuOpcoes.style = `
        position: absolute;
        top: 80px;
        right: 0;
        width: 100%;
        background: white;
        border-bottom: 1px solid rgba(114, 41, 230, 0.1);
        padding: 12px 24px;
        display: flex;
        gap: 16px;
        overflow-x: auto;
        scroll-behavior: smooth;
        &::-webkit-scrollbar { height: 0; }
    `;

    const opcoes = ['Chat', 'Recursos', 'Configurações', 'Ajuda'];
    opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.textContent = opcao;
        btn.style = `
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            background: ${opcao === 'Chat' ? 'var(--colors-brand40)' : 'var(--colors-brand10)'};
            color: ${opcao === 'Chat' ? 'white' : 'var(--colors-brand40)'};
            font-size: 13px;
            cursor: pointer;
            transition: all 300ms ease;
            white-space: nowrap;
        `;
        menuOpcoes.appendChild(btn);
    });

    // Área de mensagens aprimorada
    const mensagens = document.createElement('div');
    mensagens.style = `
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: linear-gradient(180deg, #ffffff 0%, var(--colors-brand10) 100%);
    `;

    // Função de mensagem aprimorada
    function criarMensagem(tipo, texto) {
        const msgContainer = document.createElement('div');
        msgContainer.style = `
            display: flex;
            gap: 12px;
            align-items: flex-end;
            ${tipo === 'bot' ? '' : 'flex-direction: row-reverse;'}
            opacity: 0;
            transform: translateY(20px);
            animation: messageIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;

        const avatar = document.createElement('div');
        avatar.innerHTML = tipo === 'bot' ? '🤖' : '👤';
        avatar.style = `
            width: 32px;
            height: 32px;
            background: ${tipo === 'bot' ? 'var(--colors-brand10)' : 'var(--colors-brand20)'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        `;

        const msg = document.createElement('div');
        msg.style = `
            max-width: calc(100% - 50px);
            padding: 12px 16px;
            border-radius: ${tipo === 'bot' ? '4px 16px 16px 16px' : '16px 4px 16px 16px'};
            background: ${tipo === 'bot' ? 'white' : 'var(--colors-brand40)'};
            color: ${tipo === 'bot' ? '#1a1a1a' : 'white'};
            font-size: 14px;
            line-height: 1.6;
            box-shadow: 0 3px 15px rgba(0,0,0,0.05);
            border: 1px solid ${tipo === 'bot' ? 'rgba(0,0,0,0.05)' : 'transparent'};
        `;
        msg.textContent = texto;

        msgContainer.appendChild(avatar);
        msgContainer.appendChild(msg);
        return msgContainer;
    }

    // Área de input aprimorada
    const inputContainer = document.createElement('div');
    inputContainer.style = `
        padding: 20px 24px;
        background: white;
        border-top: 1px solid rgba(114, 41, 230, 0.1);
        display: flex;
        flex-direction: column;
        gap: 12px;
    `;

    // Barra de ferramentas
    const toolbar = document.createElement('div');
    toolbar.style = `
        display: flex;
        gap: 8px;
        padding-bottom: 8px;
    `;

    ['📎', '😊', '🎤', '📷'].forEach(icon => {
        const btn = document.createElement('button');
        btn.innerHTML = icon;
        btn.style = `
            background: none;
            border: none;
            padding: 6px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: all 300ms ease;
            &:hover {
                background: var(--colors-brand10);
            }
        `;
        toolbar.appendChild(btn);
    });

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
    inputContainer.appendChild(toolbar);
    inputContainer.appendChild(input);
    inputContainer.appendChild(btnEnviar);
    
    painel.appendChild(header);
    painel.appendChild(menuOpcoes);
    painel.appendChild(mensagens);
    painel.appendChild(inputContainer);
    
    // Adiciona estilos globais atualizados
    const style = document.createElement('style');
    style.textContent = `
        @keyframes messageIn {
            0% { opacity: 0; transform: translateY(20px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes headerGlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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
