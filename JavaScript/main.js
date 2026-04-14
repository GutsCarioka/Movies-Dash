// Processo basico de um consumo de api usando fetch e async/await para lidar com a resposta de forma assíncrona.

const API_KEY = "8f983316167b81840e3ffdcc9f572aa4";
const BASE_URL = "https://api.themoviedb.org/3";
async function getPopularMovies(number_movie) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
    );
    const data = await response.json();
    
    const movies = data.results[number_movie];
    const page = data.page;
    const subtile1 = window.document.getElementById("subtitle");
   subtile1.innerHTML = movies.overview;

    const title1 = window.document.getElementById("title");
    title1.innerHTML = movies.title;
    const OriginalTitle1 = window.document.getElementById("original_title");
    OriginalTitle1.innerHTML = movies.original_title;

    const releaseDate1 = window.document.getElementById("release_date");
    releaseDate1.innerHTML = movies.release_date;

    window.document.getElementById("poster_path").src =
      `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    
    window.document.getElementById("Backdrop_path").src =
      `https://image.tmdb.org/t/p/w500${movies.backdrop_path}`;

    // console.log(data.results[0]);
  } catch (error) {
    console.error("error ao buscar filmes populares:", error);
  }
}

getPopularMovies(0);

const botao = document.getElementById("meuBotao");
botao.onclick = function () {
  const pesquisa = document.getElementById("pesq");
  const valorDigitado = pesquisa.value;
  getPopularMovies(valorDigitado);
};
