const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const movieList = document.querySelector("#movie-results");
// const totalMovie = document.querySelector("#total-movies")
// const searchButton = document.querySelector("#search-button")
// const countResult = document.querySelector("#result-count")
// const emptyState = document.querySelector("#search-empty")
// const categoryList = document.querySelector("#watchlist-filter")
// const statsMovie = document.querySelector("#stat-total")
// const statsWatch = document.querySelector("#stat-watched")
// const statsUnwatch = document.querySelector("#stat-unwatched")
// const watchList = document.querySelector("#watchlist")
// const watchlistEmpty = document.querySelector("#watchlist-empty")
// const watchlistEmptitle = document.querySelector("#watchlist-empty-title")
// const watchDesc = document.querySelector("#watchlist-empty-description")

async function ambilData(data) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${data}`,
    );
    if (!response.ok) {
      throw new Error(`Data Error`);
    }
    const hasil = await response.json();
    renderMovies(hasil);
  } catch (error) {
    console.log(error.message);
  }
}

function renderMovies(data) {
  movieList.innerHTML = "";
  data.forEach((item) => {
    movieList.innerHTML += `
    <div class="bg-amber-700 rounded-xl shadow-md overflow-hidden">
  <img class="w-full h-72 object-cover" src="${item.show.image.original}" />

  <div class="p-4">
    <h3 class="font-bold text-lg">${item.show.name}</h3>

    <p class="text-sm text-orange-100">
  ${item.show.genres.join(" - ")}
    </p>

   <button class="mt-4 w-full bg-black text-white hover:bg-orange-700 hover:text-white hover:-translate-y-1 py-2 rounded-lg font-semibold transition">
      Add to WatchList
    </button>
  </div>
</div>
    `;
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const keyword = searchInput.value;

  ambilData(keyword);
});
