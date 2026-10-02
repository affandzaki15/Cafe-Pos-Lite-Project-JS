// search
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const searchResult = document.querySelector("#search-results");

// Watchlist
const watchList = document.querySelector("#watchlist");
// statistics
const watchingCount = document.querySelector("#watching-count");
const watchedCount = document.querySelector("#watched-count");
const totalCount = document.querySelector("#total-count");

// Theme
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

// TOGGLE JS
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  themeIcon.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  themeIcon.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

let watchlistData = [];
// SEARCHINPUT VALUE

async function makeFilm(params) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${params}`,
    );

    if (!response.ok) {
      throw new Error(`Data tidak ditemukan`);
    }
    const hasil = await response.json();
    tampilData(hasil);
  } catch (error) {
    console.log(error.message);
  }
}

function tampilData(data) {
  const datas = data.map((item) => {
    return `
    <div class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-950">

      <!-- Poster -->
      <div class="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src="${item.show.image?.original ?? "https://placehold.co/400x600?text=No+Image"}"
          alt="${item.show.name}"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          >
          </div>
          
      <!-- Content -->
      <div class="p-5">

        <h3 class="mb-2 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
          ${item.show.name}
          </h3>
          
          <!-- Rating -->
          <div class="mb-3 flex items-center gap-2">
          <span class="text-yellow-400">⭐</span>
          <span class="font-semibold text-gray-700 dark:text-gray-300">
            ${item.show.rating?.average ?? "N/A"}
          </span>
        </div>

        <!-- Genres -->
        <div class="mb-5 flex flex-wrap gap-2">
          ${
            item.show.genres.length
              ? item.show.genres
                  .map(
                    (genre) => `
                  <span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/40 dark:text-white">
                    ${genre}
                  </span>
                `,
                  )
                  .join("")
              : `<span class="text-sm text-gray-400">No genre</span>`
          }
                  </div>
                  
                  <!-- Button -->
                  <button type="button" data-id="${item.show.id}" 
                  class="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700 active:scale-95 dark:bg-orange-600 dark:hover:bg-orange-700"
                  >
          + Add to Watchlist
        </button>

      </div>
    </div>
  `;
  });

  searchResult.innerHTML = datas.join("");
  const buttons = searchResult.querySelectorAll("[data-id]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      const selectedShow = data.find((item) => item.show.id === id);
      
      const alreadyExist = watchlistData.some((item) => item.show.id === id);
      if(alreadyExist){
        return
      }
      const addStatus = {
        show: selectedShow.show,
        status: "watching",
      };
      watchlistData.push(addStatus);
      renderwatchList();
      renderStats();
    });
  });
}

// READ
function renderwatchList(data = watchlistData) {
  const readMovie = data.map((item) => {
    return `
    <div class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-900 dark:bg-zinc-950">

      <!-- Poster -->
      <div class="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src="${item.show.image?.original ?? "https://placehold.co/400x600?text=No+Image"}"
          alt="${item.show.name}"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          >
          </div>
          
      <!-- Content -->
      <div class="p-5">

        <h3 class="mb-2 line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
          ${item.show.name}
          </h3>
          
          <!-- Rating -->
          <div class="mb-3 flex items-center gap-2">
          <span class="text-yellow-400">⭐</span>
          <span class="font-semibold text-gray-700 dark:text-gray-300">
            ${item.show.rating?.average ?? "N/A"}
          </span>
        </div>

        <!-- Genres -->
        <div class="mb-5 flex flex-wrap gap-2">
          ${
            item.show.genres.length
              ? item.show.genres
                  .map(
                    (genre) => `
                  <span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/40 dark:text-white">
                    ${genre}
                  </span>
                `,
                  )
                  .join("")
              : `<span class="text-sm text-gray-400">No genre</span>`
          }
                  </div>
                  
                  <!-- Button -->
                  <button type="button" data-id="${item.show.id}" 
                  class="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700 active:scale-95 dark:bg-orange-600 dark:hover:bg-orange-700"
                  >
          ${item.status === "watched" ? "watched" : "watching"}
        </button>
                  <button type="button" data-delete-id="${item.show.id}"
                  class="w-full mt-2 rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700 active:scale-95 dark:bg-orange-600 dark:hover:bg-orange-700"
                  >
         Delete
        </button>

      </div>
    </div>
  `;
  });

  watchList.innerHTML = readMovie.join("");

  const buttons = watchList.querySelectorAll("[data-id]");
  buttons.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(item.dataset.id);

      const findMov = watchlistData.find((item) => item.show.id === id);
      if (findMov.status === "watched") {
        findMov.status = "watching";
      } else {
        findMov.status = "watched";
      }
      renderwatchList();
      renderStats();
    });
  });
  const buttonDelete = watchList.querySelectorAll("[data-delete-id]");
  buttonDelete.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const id = Number(item.dataset.deleteId);
      hapusMov(id);
    });
  });
}

function hapusMov(id) {
  const deleteMov = watchlistData.findIndex((item) => item.show.id === id);
 if(deleteMov !== -1){

   watchlistData.splice(deleteMov, 1);
 }
 
 renderwatchList();
  renderStats();
}

// STATS
function renderStats() {
  const watching = watchlistData.filter(
    (data) => data.status === "watching",
  ).length;
  const watched = watchlistData.filter(
    (data) => data.status === "watched",
  ).length;
  const total = watchlistData.length;
  watchingCount.textContent = watching;
  watchedCount.textContent = watched;
  totalCount.textContent = total;
}


// FILTER
const filtering = document.querySelector("#filter")
filtering.addEventListener("change", (event)=>{
  const selectedFilter = event.target.value
 let filteredData;

 filteredData = watchlistData.filter((item)=>{
  if(selectedFilter === "watching"){
   return item.status === "watching"
  } else if(selectedFilter === "watched"){
  return item.status === "watched"
  } else{
   return true
  }
})
renderwatchList(filteredData)
})



searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = encodeURIComponent(searchInput.value.toLowerCase());
  makeFilm(keyword);
});
