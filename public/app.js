// Frontend pronto — NÃO precisa alterar.
// Ele consome o backend que VOCÊ vai construir (GET /musicas).

let todas = [];

function formatarDuracao(seg) {
  const m = Math.floor(seg / 60);
  const s = String(seg % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function render(lista) {
  const ul = document.getElementById("lista");
  const vazio = document.getElementById("vazio");
  ul.innerHTML = "";
  vazio.style.display = lista.length ? "none" : "block";

  lista.forEach((m) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <div>
        <div class="titulo">${m.titulo}</div>
        <div class="artista">${m.artista} · ${m.pais}</div>
      </div>
      <div class="dur">${formatarDuracao(m.duracao)}</div>`;
    ul.appendChild(li);
  });
}

function aplicarFiltros() {
  const termo = document.getElementById("busca").value.toLowerCase();
  const artista = document.getElementById("filtroArtista").value;
  let lista = todas;
  if (artista !== "todos") lista = lista.filter((m) => m.artista === artista);
  if (termo) {
    lista = lista.filter(
      (m) => m.titulo.toLowerCase().includes(termo) || m.artista.toLowerCase().includes(termo)
    );
  }
  render(lista);
}

async function carregar() {
  try {
    const resp = await fetch("/musicas");
    todas = await resp.json();

    const nomes = [...new Set(todas.map((m) => m.artista))];
    const sel = document.getElementById("filtroArtista");
    nomes.forEach((n) => {
      const op = document.createElement("option");
      op.value = n; op.textContent = n; sel.appendChild(op);
    });

    render(todas);
  } catch (e) {
    console.error("Backend /musicas ainda não respondeu:", e);
  }
}

document.getElementById("busca").addEventListener("input", aplicarFiltros);
document.getElementById("filtroArtista").addEventListener("change", aplicarFiltros);
carregar();
