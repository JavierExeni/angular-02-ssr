const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 10;
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";

function generatePath(path, total) {
  const res = Array.from({ length: total }, (_, i) => i + 1);
  return res.map((id) => `${path}${id}`);
}

(async () => {
  const fs = require("fs");

  let idsMapped = generatePath(`/pokemons/`, TOTAL_POKEMONS);
  let pagesMapped = generatePath(`/pokemons/pages/`, TOTAL_PAGES);

  let fileContent = [...idsMapped, ...pagesMapped].join("\n");

  // By Pokemon names
  const pokemonNameList = await fetch(
    `${URL_POKEMON}?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  fileContent += "\n";
  fileContent += pokemonNameList.results
    .map((pokemon) => `/pokemons/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);

  console.log("Routes.txt generated");
})();
