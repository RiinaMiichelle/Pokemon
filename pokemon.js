let arrayOfPokemon;

window.onload = function() {
  fetchRandomPokemon()
}

const fetchRandomPokemon = () => {
  let randomPokemon = Math.floor(Math.random() * 10)
  // fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(res => res.json())
    .then(pokemon => arrayOfPokemon = pokemon)
  }

  const consolePokemon = () => {
    console.log(arrayOfPokemon)
  }

  const displayPokemon = () => {
    const allPokemon = document.getElementById('all-pokemon')
    console.log(arrayOfPokemon);
    arrayOfPokemon.map((pokemon, index) => {
      console.log(pokemon);
      const li = document.createElement('li')
      const text = document.createTextNode(`Name: ${pokemon}`)
      // const imgElement = document.createElement('img');
      // imgElement.src = user.picture.large;
      li.appendChild(text)
      // li.appendChild(imgElement)
    //   const li = document.createElement('li')
    // const text = document.createTextNode(`Name: ${getFullName(user)}`)
    // const imgElement = document.createElement('img');
    // imgElement.src = user.picture.large;
    // li.appendChild(text)
    // li.appendChild(imgElement)
    })
  }

