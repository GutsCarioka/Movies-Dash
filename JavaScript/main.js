// Processo basico de um consumo de api usando fetch e async/await para lidar com a resposta de forma assíncrona.

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjk4MzMxNjE2N2I4MTg0MGUzZmZkY2M5ZjU3MmFhNCIsIm5iZiI6MTc3MzI3NTkwOS4yNTYsInN1YiI6IjY5YjIwYjA1YzM4ODk4NWYxMjIxZDBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5jbRXPpxRB29QI4gVjuILGqs8cWPkr7PCAaA0u8iEZA";
const BASE_URL = "https://api.themoviedb.org/3";
const input = document.getElementById("pesq");
let timeout = null;

//Variavel Global que vai armazenar a lista de filmes populares retornada pela API, permitindo que seja acessada e manipulada em diferentes partes do código conforme necessário.
let listaFilmes = [];

// ==========================
// Filmes Populares
// ==========================

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

    if (listaFilmes.length > 0) {
      pegarDetalhefilmes(listaFilmes[0].id);
    }
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
  }
}

// ==========================
// Detalhes do Filme
// ==========================

async function pegarDetalhefilmes(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?language=pt-BR&append_to_response=credits`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    const movie = await response.json();

    mostrarFilme(movie);
  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
  }
}

// ==========================
// Mostrar Filme
// ==========================

function mostrarFilme(movie) {
  document.getElementById("title").textContent = movie.title || "Sem título";

  document.getElementById("subtitle").textContent =
    movie.overview || "Sem descrição";

  document.getElementById("original_title").textContent =
    movie.original_title || "-";

  document.getElementById("release_date").textContent =
    movie.release_date || "-";

  // Poster
  const poster = document.getElementById("poster_path");

  if (movie.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  } else {
    poster.src = "";
  }

  // Backdrop
  const backdrop = document.getElementById("Backdrop_path");

  if (movie.backdrop_path) {
    backdrop.src = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  } else {
    backdrop.src = "";
  }

  // Diretor
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director",
  );

  document.getElementById("Director").textContent =
    director?.name || "Não encontrado";
}

// ==========================
// Buscar Filmes
// ==========================

async function buscarFilmes(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(
        query,
      )}&language=pt-BR`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
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
    console.error(error);
  }
}

// ==========================
// Sugestões
// ==========================

function mostrarResultados(filmes) {
  const container = document.getElementById("resultados");

  container.innerHTML = "";

  filmes.slice(0, 5).forEach((filme) => {
    const div = document.createElement("div");

    div.textContent = filme.title;
    div.style.cursor = "pointer";

    div.onclick = () => {
      pegarDetalhefilmes(filme.id);
      container.innerHTML = "";
      input.value = filme.title;
    };

    container.appendChild(div);
  });
}

// ==========================
// Busca Automática
// ==========================

input.addEventListener("input", () => {
  clearTimeout(timeout);

  const valor = input.value.trim();

  if (valor.length < 2) {
    document.getElementById("resultados").innerHTML = "";
    return;
  }

  timeout = setTimeout(() => {
    buscarFilmes(valor);
  }, 300);
});

// ==========================
// Botão Pesquisar
// ==========================

const botao = document.getElementById("meuBotao");

botao.onclick = async () => {
  const valor = input.value.trim();

  if (valor === "") return;

  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      valor,
    )}&language=pt-BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  const data = await response.json();

  if (data.results.length > 0) {
    pegarDetalhefilmes(data.results[0].id);
    document.getElementById("resultados").innerHTML = "";
  } else {
    alert("Filme não encontrado.");
  }
};

// ==========================
// Inicialização
// ==========================

getPopularMovies();
