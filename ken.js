// Cria o painel lateral com botão de fechar
function criarPainelLateral() {
  const painel = document.createElement("div");
  painel.id = "kenPainelLateral";
  painel.style.position = "fixed";
  painel.style.top = "20px";
  painel.style.right = "-400px";
  painel.style.width = "320px";
  painel.style.height = "calc(100% - 40px)";
  painel.style.background = "#EEE3FF";
  painel.style.borderLeft = "4px solid #863BFF";
  painel.style.boxShadow = "-2px 0 15px rgba(0,0,0,0.15)";
  painel.style.transition = "right 0.4s ease";
  painel.style.zIndex = "9999";
  painel.style.padding = "24px 20px";
  painel.style.borderRadius = "20px 0 0 20px";
  painel.style.fontFamily = "Arial, sans-serif";

  painel.innerHTML = `
    <button id="fecharKen" style="
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      font-size: 18px;
      font-weight: bold;
      color: #7229E6;
      cursor: pointer;
      transition: transform 0.2s ease, color 0.2s ease;
    " title="Fechar painel">✖</button>

    <h2 style="color: #7229E6; margin-top: 30px; font-size: 20px;">💜 Bem-vindo ao Ken AI!</h2>
    <p style="color: #C099FF; font-size: 15px;">Este é seu cantinho inteligente no Plurall. Sinta-se em casa, amorzinho!</p>

    <a id="menuItemId" href="javascript:void(0)" style="color: #7229E6; font-weight: bold; font-size: 16px; cursor: pointer; text-decoration: none;">
      <p>Executar Ken AI</p>
    </a>
  `;

  document.body.appendChild(painel);

  // Aplica animação para aparecer
  setTimeout(() => {
    painel.style.right = "20px";
  }, 10);

  // Evento de fechar
  const btnFechar = painel.querySelector("#fecharKen");
  btnFechar.addEventListener("mouseenter", () => {
    btnFechar.style.color = "#863BFF";
    btnFechar.style.transform = "scale(1.2)";
  });
  btnFechar.addEventListener("mouseleave", () => {
    btnFechar.style.color = "#7229E6";
    btnFechar.style.transform = "scale(1)";
  });
  btnFechar.addEventListener("click", () => {
    painel.style.right = "-400px";
    setTimeout(() => painel.remove(), 300);
  });

  // Criação do botão "Executar Ken AI" e vinculação da execução do script
  const botaoExecutar = painel.querySelector("#menuItemId");
  botaoExecutar.addEventListener("click", carregarKenAiScript);
}

// Chama a função de criar o painel
criarPainelLateral();

// Define a função de carregar e executar o script como blob
async function carregarKenAiScript() {
    console.log("[KEN-AI] ⏳ Carregando script remoto via Blob...");
    try {
        const res = await fetch("https://raw.githubusercontent.com/Gitscriptz/Ken-ai-p/refs/heads/main/ken.js");
        if (!res.ok) throw new Error("Erro ao buscar o script remoto. Status: " + res.status);

        const codigo = await res.text();
        const blob = new Blob([codigo], { type: "application/javascript" });
        const blobUrl = URL.createObjectURL(blob);

        const script = document.createElement("script");
        script.src = blobUrl;
        script.onload = () => {
            console.log("[KEN-AI] ✅ Script carregado e executado com sucesso!");
            URL.revokeObjectURL(blobUrl); // limpa o objeto depois de carregar
        };
        script.onerror = (e) => {
            console.error("[KEN-AI] ❌ Erro ao carregar script via Blob.", e);
        };

        document.body.appendChild(script);
    } catch (err) {
        console.error("[KEN-AI] ❌ Falha geral ao executar o script:");
        console.error(err);
    }
}
