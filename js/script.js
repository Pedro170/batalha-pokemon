const ULR_BASE = "https://pokeapi.co/api/v2/pokemon/";
const players = document.querySelectorAll("[data-player");
const img = document.querySelectorAll(".foto-pokemon");
const btnBatalhar = document.querySelector(".batalhar");
const modalContainer = document.querySelector(".modal-container");

const gerarPokemonAleatorio = (index) => {
  const max = 1000,
    min = 1;
  const pokemon = Math.floor(Math.random() * (max - min + 1) + min);
  fecthing(index, pokemon);
};

players.forEach((player, index) => {
  player.addEventListener("click", () => {
    if (player.dataset.player === "player-1") {
      gerarPokemonAleatorio(index);
    } else {
      gerarPokemonAleatorio(index);
    }
  });
});

let pokemon1, pokemon2;
const fecthing = async (index, player) => {
  const response = await fetch(`${ULR_BASE}${player}`);
  const json = await response.json();

  if (index === 0) {
    renderPrimeiroPokemon(json);
    return (pokemon1 = json);
  } else {
    renderSegundoPokemon(json);
    return (pokemon2 = json);
  }
};

const renderPrimeiroPokemon = (dados) => {
  const imgDados =
    dados.sprites.versions["generation-v"]["black-white"].animated
      .front_default ||
    dados.sprites.versions["generation-v"]["black-white"].back_default;
  img[0].src = imgDados;
};

const renderSegundoPokemon = (dados) => {
  const imgDados =
    dados.sprites.versions["generation-v"]["black-white"].animated
      .front_default ||
    dados.sprites.versions["generation-v"]["black-white"].back_default;
  img[1].src = imgDados;
};

function batalha() {
  const poderesFiltrado1 = pokemon1.stats
    .filter((poder, index) => index > 0 && index <= 4)
    .map((item) => item);
  const somaPoder1 = poderesFiltrado1.reduce(
    (acc, cur) => acc + cur.base_stat,
    0
  );

  const poderesFiltrado2 = pokemon2.stats
    .filter((poder, index) => index > 0 && index <= 4)
    .map((item) => item);
  const somaPoder2 = poderesFiltrado2.reduce(
    (acc, cur) => acc + cur.base_stat,
    0
  );

  if (somaPoder1 > somaPoder2) {
    exibirModal(pokemon1);
  } else {
    exibirModal(pokemon2);
  }
}

const btnFechar = modalContainer.querySelector('button')
btnFechar.addEventListener('click', () => {
  modalContainer.classList.remove('open')
})

const exibirModal = (vencedor) => {
  const modal = modalContainer.querySelector(".modal");
  modalContainer.classList.add("open");
  
  const img =
    vencedor.sprites.versions["generation-v"]["black-white"].animated
      .front_default !== null
      ? vencedor.sprites.versions["generation-v"]["black-white"].animated
          .front_default
      : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif";
  modal.innerHTML += `
    <img src="${img}" alt="s${vencedor.name}" />
    <p>${vencedor.name}</p>
    <div class="progress-group">
        <span>Ataque</span>
        <div class="barra-progress">
          <div class="progress" style="width: ${vencedor.stats[1].base_stat}%"></div>
        </div>
      </div>
  `;
};

btnBatalhar.addEventListener("click", batalha);
