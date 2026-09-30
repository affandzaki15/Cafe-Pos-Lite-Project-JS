// search
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchStatus = document.querySelector("#search-status");
const searchResult = document.querySelector("#search-results");

// Watchlist

// statistics

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
    <div class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">

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
                  <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    ${genre}
                  </span>
                `,
                  )
                  .join("")
              : `<span class="text-sm text-gray-400">No genre</span>`
          }
        </div>

        <!-- Button -->
        <button 
          class="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          + Add to Watchlist
        </button>

      </div>
    </div>
  `;
  });

  searchResults.innerHTML = datas.join("");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = encodeURIComponent(searchInput.value.toLowerCase());
  makeFilm(keyword);
});
