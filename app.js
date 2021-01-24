const auth = "563492ad6f917000010000014e327b578dea4cc9a6317daf4d2299e5";
const gallary = document.querySelector(".gallary");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const h3 = document.querySelector(".caption");
const more = document.querySelector(".more");
let searchValue;
let page = 2;
let currentSearch;
//  event litseners

more.addEventListener("click", loadMore);

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
  h3.innerHTML = `showing results for "${searchInput.value}"`;
  searchInput.value = "";
});

//  functions

function updateInput(e) {
  searchValue = e.target.value;
}
function clear() {
  gallary.innerHTML = "";
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    console.log(photo.src.large);
    const gallaryImg = document.createElement("div");
    gallaryImg.classList.add("gallary-img");
    gallaryImg.innerHTML = `
    <div class="gallary-info" >
    <p>${photo.photographer}</p>
     <a target="_blank" href=${photo.src.original} >Download</a>
    </div>
    <img src=${photo.src.large}></img>
    `;
    gallary.appendChild(gallaryImg);
  });
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application.josn",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  clear();
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;

  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function loadMore() {
  page = page + 1;

  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
