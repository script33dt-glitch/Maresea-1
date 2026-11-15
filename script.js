// ====== CONFIGURAÇÃO ======
// Número comercial: só dígitos, com DDI + DDD (ex.: 5511999999999)
const WHATSAPP_NUMBER = "5500000000000";
const wa = t => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;

// Produtos (nomes e preços provisórios — trocar pelos oficiais).
// c: categoria | f: 1 = aparece em destaque na página inicial | i: fotos em images/
const PRODUTOS = [
 {n:"Biquíni Limão Siciliano",c:"biquinis",p:"89,90",f:1,i:"limao",a:"Biquíni triângulo com estampa de limões e acabamento xadrez azul"},
 {n:"Biquíni Azul Royal",c:"biquinis",p:"79,90",f:1,i:"azul",a:"Biquíni triângulo azul royal de lateral baixa"},
 {n:"Biquíni Rosa Pink",c:"biquinis",p:"79,90",f:1,i:"rosa",a:"Biquíni triângulo rosa pink"},
 {n:"Biquíni Brasil",c:"biquinis",p:"84,90",f:1,i:"brasil",a:"Biquíni verde com detalhes amarelos, modelo faixa"},
 {n:"Biquíni Hibisco",c:"biquinis",p:"84,90",i:"hibisco",a:"Biquíni escuro com estampa de flores de hibisco"},
 {n:"Biquíni Preto Cortininha",c:"biquinis",p:"79,90",i:"preto",a:"Biquíni cortininha preto com detalhe metálico"},
 {n:"Biquíni Preto Lacinho",c:"biquinis",p:"79,90",i:"lacinho",a:"Biquíni preto com amarração lateral"},
 {n:"Biquíni Amarelo Baunilha",c:"biquinis",p:"79,90",i:"amarelo",a:"Biquíni triângulo amarelo claro"},
 {n:"Biquíni Terracota",c:"biquinis",p:"79,90",i:"terracota",a:"Biquíni triângulo cor terracota"},
 {n:"Biquíni Vermelho",c:"biquinis",p:"79,90",i:"vermelho",a:"Biquíni triângulo vermelho"},
 {n:"Biquíni Top Preto",c:"biquinis",p:"84,90",i:"bralette",a:"Biquíni preto com top estilo bralette"},
 {n:"Saída Limão Siciliano",c:"saidas",p:"69,90",i:"saida-limao",a:"Saída de praia curta em tule com estampa de limões e amarração lateral"},
 {n:"Conjunto Limão Siciliano",c:"conjuntos",p:"149,90",i:"conjunto-limao",a:"Conjunto de top e saída de praia com estampa de limões"}
];

const card = p => `<article class="card" data-cat="${p.c}">
<div class="ph"><img src="images/${p.i}-1.jpg" alt="${p.a}" width="640" height="960" loading="lazy"><img class="alt" src="images/${p.i}-2.jpg" alt="" width="640" height="960" loading="lazy"></div>
<h3>${p.n}</h3><p class="pr">R$ ${p.p}</p>
<div class="bt"><a class="btn o" target="_blank" rel="noopener" href="${wa(`Olá! Gostaria de saber mais sobre o produto: ${p.n}.`)}">Consultar</a>
<a class="btn" target="_blank" rel="noopener" href="${wa(`Olá! Quero comprar o produto: ${p.n}.`)}">Comprar</a></div></article>`;

const destaques = document.getElementById("destaques-grid");
if (destaques) destaques.innerHTML = PRODUTOS.filter(p => p.f).map(card).join("");

const catalogo = document.getElementById("catalogo");
if (catalogo) {
  const mostrar = cat => {
    const lista = PRODUTOS.filter(p => cat === "todos" || p.c === cat);
    catalogo.innerHTML = lista.length ? lista.map(card).join("")
      : `<p class="empty">Os acessórios estão chegando. Chame a gente no WhatsApp para saber das novidades.</p>`;
  };
  document.querySelectorAll(".flt").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".flt").forEach(x => x.setAttribute("aria-pressed", x === b));
    mostrar(b.dataset.cat);
  }));
  mostrar("todos");
}

document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener";
});
