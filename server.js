// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// ---- LISTA 1: artistas (cada um tem um id) ----

const artistas = [
  { id: 1, nome: "Lil peep", país: "Estados Unidos"},
  { id: 2, nome: "The neighbourhood ", país: "Estados Unidos"},  
  { id: 3, nome: "Daniel Caesar", país: "Canadá"},
  { id: 4, nome: "Arctic Monkeys", país: "Reino Unido"},
  { id: 5, nome: "Gal costa", pais: "Brasil"},
];

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----

const musicas = [
  { id: 1, título: "Gym class", artistaId: 1, duracao: 337 },
  { id: 2, título: "Daddy Isseus", artistaId: 2, duracao: 342 },
  { id: 3, título: "Japanese denim", artistaId: 3, duracao: 431 },
  { id: 4, título: "A Certain romance", artistaId: 4, duracao: 351 },
  { id: 5, título: "Palavras no Corpo", artistaId: 5, duracao: 305 },
]

// 1) LISTAR ARTISTAS



  // TODO: responder a lista de artistas com res.status(200).json(...)

  app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});
 
// 2) LISTAR MUSICAS  (juntando cada musica com o seu artista)
app.get("/musicas", (req, res) => {
  const resultado = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);
    return{
      titulo: m.título,
      duracao: m.duracao,
      artistas: m.artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "-",
    };
  });
  res.status(200).json(resultado);
});

app.get("/artistas/:id/musicas", (req, res) => {
   const id = Number(req.params.id);
   const doArrtista = musicas.filter((m) => m.artistaId === id)
   res.status(200).json(doArrtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar: http://localhost:${PORT}`);
});
  // TODO: use map para percorrer 'musicas'.
  //       para cada musica, use find em 'artistas' para achar
  //       aquele cujo id === m.artistaId.
  //       devolva um objeto com: titulo, duracao, artista (nome) e pais.
  //       lembre: find pode devolver undefined -> trate com ? :



