const pokemon1DivId = 'pokemon1';
const pokemon2DivId = 'pokemon2';
const battleResultsDivId = 'battleResults';

let pokemon1;
let pokemon2;

let arrayOfPokemon;

window.onload = function() {
  fetchRandomPokemon()
}

const fetchRandomPokemon = () => {
  let randomPokemon = Math.floor(Math.random() * 10)
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=964`)
    .then(res => res.json())
    .then(resJson => Promise.all(resJson.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))))
    .then(allPokemon => {
      arrayOfPokemon = allPokemon;
      document.getElementById('loadingPokemon').hidden=true;
      document.getElementById('displayPokemonButton').hidden=false;
    });
  }

const getRandomPokemonNumber = (excludeNumber) => {
  while (true) {
    const randomNumber = Math.floor(Math.random() * 963);

    if (randomNumber !== excludeNumber) {
      return randomNumber;
    }
  }
}

// clear all child nodes in the dom if the domNode has any
const clearChildNodesFromElement = (domNode) => {
  if (domNode.childNodes) {
    while (domNode.firstChild) {
      domNode.firstChild.remove();
    }
  }
}

// Display the pokemon at the htmlElementId (should be 'pokemon1' or 'pokemon2')
const displayPokemonInDom = (htmlElementId, pokemon) => {
  const pokemonDiv = document.getElementById(htmlElementId);

  // if the pokemonDiv already has a pokemon then remove its info
  clearChildNodesFromElement(pokemonDiv);

  // create content for the new pokemon and hook it into the DOM
  const nameDiv = document.createElement('div');
  const baseExperienceDiv = document.createElement('div');
  const imageElement = document.createElement('img');
  nameDiv.innerHTML = pokemon.name;
  baseExperienceDiv.innerHTML = pokemon.base_experience;
  imageElement.src = pokemon.sprites.front_default;
  pokemonDiv.appendChild(nameDiv);
  pokemonDiv.appendChild(baseExperienceDiv);
  pokemonDiv.appendChild(imageElement);
}

const toggleBattleButton = (hidden) => {
  document.getElementById('battle').hidden = hidden;
}

const displayPokemon = () => {
  // clear the old battle results if any are there

  clearChildNodesFromElement(document.getElementById(battleResultsDivId));
  const pokemon1Number = Math.floor(Math.random() * 963);
  const pokemon2Number = getRandomPokemonNumber(pokemon1);

  console.log(arrayOfPokemon);

  pokemon1 = arrayOfPokemon[pokemon1Number];
  pokemon2 = arrayOfPokemon[pokemon2Number];

  console.log(pokemon1);
  console.log(arrayOfPokemon);

  displayPokemonInDom(pokemon1DivId, pokemon1);
  displayPokemonInDom(pokemon2DivId, pokemon2);
  
  toggleBattleButton(false);
}

const displayWinner = (winnerPokemon) => {
  const winnerInfoDiv = document.createElement('div');
  winnerInfoDiv.innerHTML = `${winnerPokemon.name} won because their base experience is higher at ${winnerPokemon.base_experience}`;
  document.getElementById(battleResultsDivId).appendChild(winnerInfoDiv);
}

const displayTie = () => {
    const tieDiv = document.createElement('div');
    tieDiv.innerHTML = `Tie! Both pokemon have a base experience of ${pokemon1.base_experience}`;
    document.getElementById(battleResultsDivId).appendChild(tieDiv);
}

const battlePokemon = () => {
  // clear previous battle winner if there
  clearChildNodesFromElement(document.getElementById(battleResultsDivId));

  const pokemon1BaseExperience = pokemon1.base_experience;
  const pokemon2BaseExperience = pokemon2.base_experience;

  if (pokemon1BaseExperience > pokemon2BaseExperience) {
    displayWinner(pokemon1);
  } else if (pokemon1BaseExperience < pokemon2BaseExperience) {
    displayWinner(pokemon2);
  } else {
    displayTie();
  }

  toggleBattleButton(true);
}

