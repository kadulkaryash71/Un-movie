const $ = (id) => document.getElementById(id)
let collection = []

const displayItem = (movies, target) => {
    const movieLibrary = movies.map((movie) => {
      // $('play-video').setAttribute("src", movie.link)
      return (
        `<a href="${movie.link}" target="_blank" class="card">
          <div class="image-container">
            <img src="${movie.image}" alt="${movie.name} poster" />
          </div>
          <div class="info-container">
            <p class="movie-title">${movie.name}</p>
            <p class="movie-info">${movie.info}</p>
          </div>
        </a>`
      )
    }).join("");
    target.innerHTML = movieLibrary;
}

const library = async () => {
  const res = await fetch('./data.json')
  let movies = await res.json()
  for(let prop in movies){
    displayItem(movies[prop], $(prop))
    collection.push(...movies[prop])
  }
}

library()

$("search-query").addEventListener('keyup', (e) => {
  let str = e.target.value
  let shortlist = collection.filter( (movie) => {
    return movie.name.toLowerCase().includes(str)
  })
  const el = document.getElementsByClassName('collection')
  Array.from(el).map( element => element.style.display = "none")
  // for(let elem of el) elem.style.display = "none"
  // $('search-text').innerText = "Searching for " + str + "..."
  $('search-result').style.display = "grid"
  displayItem(shortlist, $('search-result'))
})

// $('search').addEventListener("click", () => {
//   var query = $('search-query').value
//   console.log("Hello " + query)
//   console.log(collection)
//   console.log(collection.indexOf(query))
// })

