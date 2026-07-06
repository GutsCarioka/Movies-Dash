// Processo basico de um consumo de api usando fetch e async/await para lidar com a resposta de forma assíncrona.

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjk4MzMxNjE2N2I4MTg0MGUzZmZkY2M5ZjU3MmFhNCIsIm5iZiI6MTc3MzI3NTkwOS4yNTYsInN1YiI6IjY5YjIwYjA1YzM4ODk4NWYxMjIxZDBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5jbRXPpxRB29QI4gVjuILGqs8cWPkr7PCAaA0u8iEZA";
const BASE_URL = "https://api.themoviedb.org/3";
const input = document.getElementById("pesq");
let timeout = null;
//Variavel Global que vai armazenar a lista de filmes populares retornada pela API, permitindo que seja acessada e manipulada em diferentes partes do código conforme necessário.
let listaFilmes = [];

async function getPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?language=pt-BR`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await response.json();

    listaFilmes = data.results;

    mostrarFilme(listaFilmes[0]);
  } catch (error) {
    console.error("error ao buscar filmes populares:", error);
  }
}

function mostrarFilme(movie) {
  document.getElementById("subtitle").innerHTML = movie.overview;

  window.document.getElementById("title").innerHTML = movie.title;

  window.document.getElementById("original_title").innerHTML =
    movie.original_title;

  window.document.getElementById("release_date").innerHTML = movie.release_date;

  window.document.getElementById("poster_path").src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "./Assets/Img/no-image.png";

  window.document.getElementById("Backdrop_path").src =
    `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
}
//Function de requisicao de filmes para pesquisa
async function buscarFilmes(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`,
      {
        headers: {
          accept: "Application/json",
          Authorization: `bearer ${TOKEN}`,
        },
      },
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      document.getElementById("resultados").innerHTML =
        "<p>Nenhum filme encontrado</p>";
      return;
    }

    mostrarResultados(data.results);
  } catch (error) {
    console.error("Erro:", error);
  }
}

/*const botao = document.getElementById("meuBotao");

botao.onclick = function () {
  const valorDigitado = document.getElementById("pesq").value.toLowerCase();
  const filtrados = listaFilmes.filter((filme) =>
    filme.title.toLowerCase().includes(valorDigitado),
  );

  if (filtrados.length > 0) {
    mostrarFilme(filtrados[0]); //Mostra primeiro filme da lista filtrada
  } else {
    alert("Filme Não Encontrado, Ou ele não é popular ou ele é ruim!");
  }
};
*/

getPopularMovies();
