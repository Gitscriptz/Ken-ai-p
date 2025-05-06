// Cria o botão no menu
const newItem = document.createElement("a");
newItem.id = "menuItemId";
newItem.href = "javascript:void(0)";
newItem.setAttribute("tabindex", "-1");
newItem.setAttribute("role", "menuitem");
newItem.setAttribute("target", "_self");
newItem.className = "sc-klVQfs fjTQz";

newItem.innerHTML = 
  <span display="inline-flex" class="css-1wjyrbv enqv8fw0">
    <p class="css-sylt1v enqv8fw1" style="
      color: #7229E6;
      font-weight: bold;
      font-size: 14px;
      margin: 0;
    ">Ken AI</p>
  </span>
;

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

  painel.innerHTML = 
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
  ;

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
}

// Evento ao clicar no botão
newItem.addEventListener("click", () => {
  if (!document.getElementById("kenPainelLateral")) {
    criarPainelLateral();
  }
});

// Adiciona o botão no menu
const menu = document.querySelector('div[role="menu"]');
if (menu) {
  menu.appendChild(newItem);
  console.log("✨ Painel Ken AI fofo adicionado com sucesso!");
} else {
  console.error("❌ Menu não encontrado.");
}
