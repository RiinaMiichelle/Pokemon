let arrayOfPokemon;

window.onload = function() {
  fetchRandomPokemon()
}

const fetchRandomPokemon = () => {
  let randomPokemon = Math.floor(Math.random() * 10)
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    .then(res => res.json())
    .then(pokemon => arrayOfPokemon = pokemon)
  }

  const consolePokemon = () => {
    console.log(arrayOfPokemon)
  }

  const displayPokemon = () => {
    const allPokemon = document.getElementById('all-pokemon')
    arrayOfPokemon.map((pokemon, index) => {
      const li = document.createElement('li')
      const text = document.createTextNode(`#${index}, Name: ${pokemon.name}:  ${pokemon.body}, by Picture: ${user.userId}`)
      li.appendChild(text)
      allPokemon.append(li)
    })
  }

