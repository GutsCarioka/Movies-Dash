// Processo basico de um consumo de api usando fetch e async/await para lidar com a resposta de forma assíncrona.

const API_KEY = "8f983316167b81840e3ffdcc9f572aa4";
const BASE_URL = "https://api.themoviedb.org/3";
//Variavel Global que vai armazenar a lista de filmes populares retornada pela API, permitindo que seja acessada e manipulada em diferentes partes do código conforme necessário.
let listaFilmes = [];
async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
    );

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

  window.document.getElementById("poster_path").src =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  //window.document.getElementById("Backdrop_path").src =
  //`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
}
//Function de requisicao de filmes para pesquisa
async function buscarFilmes(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      document.getElementById("resultados").innerHTML =
        "<p>Nenhum filme encontrado</p>";
      return;
    }

    mostrarResultados(data.results);
  } catch (error) {
    console.error("Erro ao seguir com a pesquisa de filmes:", error);
  }
}

//função de Busca de filmes

function mostrarResultados(filmes) {
  if (!filmes || filmes.length === 0) return;

  const container = document.getElementById("resultados");
  container.innerHTML = "";

  filmes.slice(0, 5).forEach((filme) => {
    const div = document.createElement("div");
    div.textContent = filme.title;

    div.style.cursor = "pointer";

    div.onclick = () => {
      mostrarFilme(filme);
      container.innerHTML = ""; // limpa sugestões
    };

    container.appendChild(div);
  });
}

input.addEventListener("input", () => {
  clearTimeout(timeout);

  const valor = input.value;

  if (valor.length <= 2) {
    document.getElementById("resultados").innerHTML = "";
    return;
  }

  timeout = setTimeout(() => {
    buscarFilmes(valor);
  }, 300);
});

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
